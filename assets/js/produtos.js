import { supabase } from './supabase.js';

// produtos.js
const formProduto = document.getElementById('cadastro-produto');
const tabelaProdutos = document.getElementById('tabela-produtos');
const selectCategoria = document.getElementById('produto-categoria');
const selectFornecedor = document.getElementById('produto-fornecedor');

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

    const { error } = await supabase.from('produtos').insert([produto]);
    if (error) return alert(error.message);

    carregarProdutos();
    formProduto.reset();
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

carregarCategorias();
carregarFornecedoresSelect();
carregarProdutos();