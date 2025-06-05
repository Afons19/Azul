import { supabase } from './supabase.js';

// fornecedores.js
const formFornecedor = document.getElementById('form-fornecedor');
const tabelaFornecedores = document.getElementById('tabela-fornecedores');

if (formFornecedor) {
  formFornecedor.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fornecedor = {
      nome: document.getElementById('fornecedor-nome').value,
      nif: document.getElementById('fornecedor-nif').value,
      telefone: document.getElementById('fornecedor-telefone').value,
      endereco: document.getElementById('fornecedor-endereco').value,
      estabelecimento: document.getElementById('fornecedor-estabelecimento').value,
      email: document.getElementById('fornecedor-email').value
    };

    const { error } = await supabase.from('fornecedores').insert([fornecedor]);
    if (error) return alert(error.message);
    carregarFornecedores();
    formFornecedor.reset();
  });
}

async function carregarFornecedores() {
  const { data, error } = await supabase.from('fornecedores').select('*');
  if (error) return alert(error.message);

  if (tabelaFornecedores) {
    tabelaFornecedores.innerHTML = data.map(f => `
      <tr>
        <td>${f.nome}</td>
        <td>${f.nif}</td>
        <td>${f.telefone}</td>
        <td>${f.endereco}</td>
        <td>${f.estabelecimento || '-'}</td>
        <td>${f.email}</td>
        <td>
          <button onclick="excluirFornecedor('${f.id}')">Excluir</button>
        </td>
      </tr>
    `).join('');
  }
}

window.excluirFornecedor = async (id) => {
  if (!confirm('Deseja realmente excluir este fornecedor?')) return;
  const { error } = await supabase.from('fornecedores').delete().eq('id', id);
  if (error) return alert(error.message);
  carregarFornecedores();
};

carregarFornecedores();