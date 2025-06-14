import { supabase } from './supabase.js';

const formProduto = document.getElementById('cadastro-produto');
const tabelaProdutos = document.getElementById('tabela-produtos');
const selectCategoria = document.getElementById('produto-categoria');
const selectFornecedor = document.getElementById('produto-fornecedor');
let produtoEmEdicao = null;

async function carregarCategorias() {
  const { data, error } = await supabase.from('categorias').select('*');
  if (error) return alert(error.message);

  selectCategoria.innerHTML = '<option disabled selected>Selecione a categoria do produto</option>';
  data.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.nome;
    selectCategoria.appendChild(option);
  });
}

async function carregarFornecedoresSelect() {
  const { data, error } = await supabase.from('fornecedores').select('*');
  if (error) return alert(error.message);

  selectFornecedor.innerHTML = '<option disabled selected>Selecione o fornecedor</option>';
  data.forEach(f => {
    const option = document.createElement('option');
    option.value = f.id;
    option.textContent = f.nome;
    selectFornecedor.appendChild(option);
  });
}

if (formProduto) {
  formProduto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const produto = {
      nome: document.getElementById('produto-nome').value,
      categoria_id: selectCategoria.value,
      fornecedor_id: selectFornecedor.value,
      preco: parseFloat(document.getElementById('produto-preco').value),
      preco_adquirido: parseFloat(document.getElementById('produto-valor-Adiquirido').value) || null,
      data_entrega: document.getElementById('produto-data-entrega').value,
      quantidade: parseInt(document.getElementById('produto-quantidade').value, 10)
    };

    let error;
    if (produtoEmEdicao) {
      ({ error } = await supabase.from('produtos').update(produto).eq('id', produtoEmEdicao));
    } else {
      ({ error } = await supabase.from('produtos').insert([produto]));
    }

    if (error) return alert(error.message);

    await carregarProdutos();
    formProduto.reset();
    produtoEmEdicao = null;
    formProduto.querySelector('button[type="submit"]').innerText = "Salvar";
  });
}

async function carregarProdutos() {
  const { data, error } = await supabase
    .from('produtos')
    .select('*, categorias(nome), fornecedores(nome)');

  if (error) return alert(error.message);

  tabelaProdutos.innerHTML = data.map(p => `
    <tr>
      <td>${p.nome}</td>
      <td>${p.categorias?.nome || '-'}</td>
      <td>${p.fornecedores?.nome || '-'}</td>
      <td>${p.preco}</td>
      <td>${p.data_entrega}</td>
      <td>${p.quantidade}</td>
      <td>
        <button onclick="editarProduto('${p.id}')">Editar</button>
        <button onclick="excluirProduto('${p.id}')">Excluir</button>
      </td>
    </tr>
  `).join('');
}

window.excluirProduto = async (id) => {
  if (!confirm('Deseja realmente excluir este produto?')) return;
  const { error } = await supabase.from('produtos').delete().eq('id', id);
  if (error) return alert(error.message);
  carregarProdutos();
};

window.editarProduto = async (id) => {
  const { data, error } = await supabase.from('produtos').select('*').eq('id', id).single();
  if (error) return alert('Erro ao carregar produto para edição.');

  produtoEmEdicao = id;

  document.getElementById('produto-nome').value = data.nome;
  document.getElementById('produto-categoria').value = data.categoria_id;
  document.getElementById('produto-fornecedor').value = data.fornecedor_id;
  document.getElementById('produto-preco').value = data.preco;
  document.getElementById('produto-valor-Adiquirido').value = data.preco_adquirido;
  document.getElementById('produto-data-entrega').value = data.data_entrega;
  document.getElementById('produto-quantidade').value = data.quantidade;

  formProduto.querySelector('button[type="submit"]').innerText = "Cadastrar";
};

carregarCategorias();
carregarFornecedoresSelect();
carregarProdutos();
