// relatorios.js
import { supabase } from './supabase.js';

async function carregarCategoriasNoFiltro() {
  const { data, error } = await supabase.from('categorias').select('*');
  if (error) return alert('Erro ao carregar categorias.');

  const select = document.getElementById('filtro-categoria');
  if (!select) return;

  data.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.nome;
    opt.textContent = cat.nome;
    select.appendChild(opt);
  });
}

async function filtrarRelatorioVendas() {
  const inicio = document.getElementById('filtro-data-inicial').value;
  const fim = document.getElementById('filtro-data-final').value;
  const categoria = document.getElementById('filtro-categoria').value;

  let query = supabase
    .from('vendas_com_categorias')
    .select('*')
    .order('data', { ascending: false });

  if (inicio) query = query.gte('data', inicio);
  if (fim) query = query.lte('data', fim);
  if (categoria) query = query.eq('nome_categoria', categoria);

  const { data, error } = await query;
  if (error) return alert('Erro ao filtrar relatório');

  const tabela = document.getElementById('tabela-relatorio-vendas');
  tabela.innerHTML = data.map(v => `
    <tr>
      <td>${v.nome_produto}</td>
      <td>${v.nome_categoria || '-'}</td>
      <td>${v.quantidade}</td>
      <td>${new Date(v.data).toLocaleDateString()}</td>
      <td>${v.valor_unitario.toFixed(2)}</td>
      <td>${v.total.toFixed(2)}</td>
      <td>${v.forma_pagamento}</td>
    </tr>
  `).join('');
}
window.filtrarRelatorioVendas = filtrarRelatorioVendas;
carregarCategoriasNoFiltro();
