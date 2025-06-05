import { supabase } from './supabase';

// funcionarios.js
const formFuncionario = document.getElementById('form-funcionario');
const tabelaFuncionarios = document.getElementById('tabela-funcionarios');

if (formFuncionario) {
  formFuncionario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const funcionario = {
      nome: document.getElementById('nome').value,
      bi: document.getElementById('bi').value,
      data_nascimento: document.getElementById('data_nascimento').value,
      telefone: document.getElementById('telefone').value,
      endereco: document.getElementById('endereco').value,
      email: document.getElementById('email').value,
    };
    const { error } = await supabase.from('funcionarios').insert([funcionario]);
    if (error) return alert(error.message);
    carregarFuncionarios();
    formFuncionario.reset();
  });
}

async function carregarFuncionarios() {
  const { data, error } = await supabase.from('funcionarios').select('*');
  if (error) return alert(error.message);

  if (tabelaFuncionarios) {
    tabelaFuncionarios.innerHTML = data.map(f => `
      <tr>
        <td>${f.id}</td>
        <td>${f.nome}</td>
        <td>${f.bi}</td>
        <td>${f.data_nascimento || '-'}</td>
        <td>${f.telefone}</td>
        <td>${f.endereco}</td>
        <td>${f.email}</td>
        <td>
          <button onclick="excluirFuncionario('${f.id}')">Excluir</button>
        </td>
      </tr>
    `).join('');
  }
}

window.excluirFuncionario = async (id) => {
  if (!confirm('Deseja realmente excluir este funcionário?')) return;
  const { error } = await supabase.from('funcionarios').delete().eq('id', id);
  if (error) return alert(error.message);
  carregarFuncionarios();
};

carregarFuncionarios();
