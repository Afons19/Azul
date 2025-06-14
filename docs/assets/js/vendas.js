// categorias.js
import { supabase } from './supabase.js';

const formCategoria = document.getElementById('formCategoria');
const tabelaCategorias = document.getElementById('tabela-categotias');
let categoriaEmEdicao = null;

if (formCategoria) {
  formCategoria.addEventListener('submit', async (e) => {
    e.preventDefault();
    const categoria = {
      nome: document.getElementById('nome').value,
      codigo: document.getElementById('codigo').value,
      descricao: document.getElementById('descricao').value
    };

    let error;
    if (categoriaEmEdicao) {
      ({ error } = await supabase.from('categorias').update(categoria).eq('id', categoriaEmEdicao));
    } else {
      ({ error } = await supabase.from('categorias').insert([categoria]));
    }

    if (error) return alert(error.message);
    carregarCategorias();
    formCategoria.reset();
    categoriaEmEdicao = null;
    formCategoria.querySelector('button[type="submit"]').innerText = "Salvar";
  });
}

async function carregarCategorias() {
  const { data, error } = await supabase.from('categorias_com_quantidade').select('*');
  if (error) return alert(error.message);

  tabelaCategorias.innerHTML = data.map(c => `
    <tr>
      <td>${c.codigo}</td>
      <td>${c.nome}</td>
      <td>${c.descricao || '-'}</td>
      <td>${c.quantidade_produtos}</td>
      <td>
        <button onclick="editarCategoria('${c.id}')">Editar</button>
        <button onclick="excluirCategoria('${c.id}')">Excluir</button>
      </td>
    </tr>
  `).join('');
}

window.excluirCategoria = async (id) => {
  if (!confirm('Deseja excluir esta categoria?')) return;
  const { error } = await supabase.from('categorias').delete().eq('id', id);
  if (error) return alert(error.message);
  carregarCategorias();
};

window.editarCategoria = async (id) => {
  const { data, error } = await supabase.from('categorias').select('*').eq('id', id).single();
  if (error) return alert('Erro ao carregar categoria para edição.');

  categoriaEmEdicao = id;

  document.getElementById('nome').value = data.nome;
  document.getElementById('codigo').value = data.codigo;
  document.getElementById('descricao').value = data.descricao;

  formCategoria.querySelector('button[type="submit"]').innerText = "Atualizar";
};

carregarCategorias();

// vendas.js
const formVenda = document.getElementById('formVenda');
const tabelaVendas = document.getElementById('tabela-vendas');
let vendaEmEdicao = null;

if (formVenda) {
  formVenda.addEventListener('submit', async (e) => {
    e.preventDefault();
    const produtoNome = document.getElementById('produto').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;
    const formaPagamento = document.getElementById('formaPagamento').value;
    const admin = JSON.parse(sessionStorage.getItem('admin'));

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

    let error;
    if (vendaEmEdicao) {
      ({ error } = await supabase.from('vendas').update(venda).eq('id', vendaEmEdicao));
    } else {
      ({ error } = await supabase.from('vendas').insert([venda]));
    }

    if (error) return alert(error.message);
    carregarVendas();
    formVenda.reset();
    vendaEmEdicao = null;
    formVenda.querySelector('button[type="submit"]').innerText = "Salvar";
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
      <td>
        <button onclick="editarVenda('${v.id}')">Editar</button>
      </td>
    </tr>
  `).join('');
}

window.editarVenda = async (id) => {
  const { data, error } = await supabase.from('vendas').select('*').eq('id', id).single();
  if (error) return alert('Erro ao carregar venda para edição.');

  vendaEmEdicao = id;

  document.getElementById('produto').value = data.produto_id;
  document.getElementById('quantidade').value = data.quantidade;
  document.getElementById('valor').value = data.valor_unitario;
  document.getElementById('data').value = data.data;
  document.getElementById('formaPagamento').value = data.forma_pagamento;

  formVenda.querySelector('button[type="submit"]').innerText = "Atualizar";
};

carregarVendas();
