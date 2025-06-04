import { supabase } from "./supabase";

export const backend = {
  // Funcionários
  async getFuncionarios() {
    const { data, error } = await supabase.from("funcionarios").select("*");
    if (error) throw error;
    return data;
  },

  async addFuncionario(funcionario) {
    const { data, error } = await supabase
      .from("funcionarios")
      .insert([funcionario])
      .select();

    if (error) throw error;

    // Registrar atividade
    await this._adicionarAtividade(
      `Novo funcionário cadastrado: ${funcionario.nome}`
    );

    return data[0];
  },

  // Fornecedores
  async getFornecedores() {
    const { data, error } = await supabase.from("fornecedores").select("*");
    if (error) throw error;
    return data;
  },

  async addFornecedor(fornecedor) {
    const { data, error } = await supabase
      .from("fornecedores")
      .insert([fornecedor])
      .select();

    if (error) throw error;

    await this._adicionarAtividade(
      `Novo fornecedor cadastrado: ${fornecedor.nome}`
    );

    return data[0];
  },

  async getProdutos() {
    const { data, error } = await supabase.from("produtos").select("*");
    if (error) throw error;
    return data;
  },

  // Produtos
  async addProdutos(produtos) {
    const { data, error } = await supabase
      .from("produtos")
      .insert([produtos])
      .select();

    if (error) throw error;

    await this._adicionarAtividade(`Novo produto cadastrado: ${produtos.nome}`);

    return data[0];
  },

  async getProdutosComRelacionamentos() {
    const { data, error } = await supabase
      .from('produtos')
      .select(`
        *,
        categorias(nome),
        fornecedores(nome)
      `)
    if (error) throw error
    return data
  },

  // categorias
  async getCategorias() {
    const { data, error } = await supabase.from("categorias").select("*");
    if (error) throw error;
    return data;
  },

  async addCategorias(categorias) {
    const { data, error } = await supabase
      .from("categorias")
      .insert([categorias])
      .select();

    if (error) throw error;

    await this._adicionarAtividade(
      `Nova categoria cadastrada: ${categorias.nome}`
    );

    return data[0];
  },

  async getCategoriasCount() {
    const { data, error } = await supabase
      .from('categorias')
      .select('*, produtos(count)')
    if (error) throw error
    return data
  },

  // Registrar Vendas
  async getRegistrarVendas() {
    const { data, error } = await supabase.from("registrar-vendas").select("*");
    if (error) throw error;
    return data;
  },

  async addRegistrarVendas(registrarVendas) {
    const { data, error } = await supabase
      .from("registrar-vendas")
      .insert([registrarVendas])
      .select();

    if (error) throw error;

    await this._adicionarAtividade(
      `Nova venda registrada: ${registrarVendas.nome}`
    );

    return data[0];
  },

  // Exemplo de método específico
    async registrarVendaComTransacao(dadosVenda) {
    const { data, error } = await supabase.rpc('registrar_venda', {
      produto_id: dadosVenda.produto_id,
      quantidade: dadosVenda.quantidade,
      valor_unitario: dadosVenda.valor_unitario,
      forma_pagamento: dadosVenda.forma_pagamento,
      funcionario_id: dadosVenda.funcionario_id
    });

    if (error) {
      console.error('Erro na transação:', error);
      throw new Error(`Falha ao registrar venda: ${error.message}`);
    }

    await this._adicionarAtividade(
      `Nova venda registrada: Produto ID ${dadosVenda.produto_id}`
    );

    return data;
  },

  // Método auxiliar para atividades
  async _adicionarAtividade(descricao) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("atividades").insert([
      {
        descricao,
        tipo: "Sistema",
        usuario_id: user?.id || null,
      },
    ]);
  },
};

export function configurarAtualizacaoEmTempoReal(callback) {
  const subscription = supabase
    .channel('vendas-changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'vendas' },
      payload => callback(payload.new)
    )
    .subscribe();

  return () => supabase.removeChannel(subscription);
}