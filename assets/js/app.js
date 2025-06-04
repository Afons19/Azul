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

  // Registrar Vendas
  async getRegistrarVendas() {
    const { data, error } = await supabase.from("registrar-vendas").select("*");
    if (error) throw error;
    return data;
  },

  async addFornecedor(registrarVendas) {
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
