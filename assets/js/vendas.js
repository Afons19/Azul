import { supabase } from './supabase.js';

const formVenda = document.getElementById('formVenda');
const tabelaVendas = document.getElementById('tabela-vendas');

if (formVenda) {
  formVenda.addEventListener('submit', async (e) => {
    e.preventDefault();
    const produtoNome = document.getElementById('produto').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;
    const formaPagamento = document.getElementById('formaPagamento').value;
    const admin = JSON.parse(sessionStorage.getItem('admin'));

    // Buscar produto
    const { data: produtos, error: erroBusca } = await supabase
      .from('produtos')
      .select('id')
      .ilike('nome', `%${produtoNome}%`);

    if (erroBusca || produtos.length === 0) return alert('Produto não encontrado.');

    const venda = {
      produto_id: produtos[0].id,
      quantidade,
      valor_unitario: valor,
      data,
      forma_pagamento: formaPagamento,
      autor: admin?.user_metadata?.nome || 'Desconhecido'
    };

    const { error } = await supabase.from('vendas').insert([venda]);
    if (error) return alert(error.message);

    carregarVendas();
    formVenda.reset();
  });
}

async function carregarVendas() {
  const { data, error } = await supabase
    .from('vendas_com_categorias')
    .select('*')
    .order('data', { ascending: false });

  if (error) return alert(error.message);

  tabelaVendas.innerHTML = data.map(v => `
    <tr>
      <td>${v.nome_produto}</td>
      <td>${v.nome_categoria || '-'}</td>
      <td>${v.quantidade}</td>
      <td>${v.data}</td>
      <td>${v.valor_unitario.toFixed(2)}</td>
      <td>${v.total.toFixed(2)}</td>
      <td>${v.forma_pagamento}</td>
    </tr>
  `).join('');
}

carregarVendas();