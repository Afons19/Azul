import { supabase } from './supabase.js';

async function carregarIndicadores() {
  const { data: vendas, error } = await supabase
    .from('vendas_com_categorias')
    .select('*');

  if (error) return alert('Erro ao buscar vendas.');

  let totalVendas = 0;
  let lucroLiquido = 0;
  let totalDespesas = 0;

  for (const venda of vendas) {
    totalVendas += venda.total;
    const { data: produto } = await supabase
      .from('produtos')
      .select('preco_adquirido')
      .eq('id', venda.produto_id)
      .single();

    const custo = produto?.preco_adquirido || 0;
    totalDespesas += custo * venda.quantidade;
    lucroLiquido += (venda.valor_unitario - custo) * venda.quantidade;
  }

  document.getElementById('total-vendas').innerText = totalVendas.toFixed(2);
  document.getElementById('total-lucro').innerText = lucroLiquido.toFixed(2);
  document.getElementById('total-despesas').innerText = totalDespesas.toFixed(2);
}

async function carregarTotalProdutos() {
  const { count } = await supabase
    .from('produtos')
    .select('*', { count: 'exact', head: true });
  document.getElementById('total-produtos').innerText = count;
}

async function carregarGraficoVendas() {
  const { data } = await supabase
    .from('vendas_com_categorias')
    .select('data, total')
    .order('data', { ascending: true });

  const resumo = {};
  data.forEach(v => {
    const dia = new Date(v.data).toLocaleDateString();
    resumo[dia] = (resumo[dia] || 0) + v.total;
  });

  const labels = Object.keys(resumo);
  const valores = Object.values(resumo);

  const ctx = document.getElementById('grafico-vendas').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Vendas por Dia',
        data: valores,
        backgroundColor: '#36a2eb'
      }]
    }
  });
}

async function carregarGraficoVendasPorCategoria() {
  const { data, error } = await supabase
    .from('vendas_com_categorias')
    .select('nome_categoria, total');

  if (error) return alert('Erro ao carregar gráfico de vendas por categoria.');

  const resumo = {};

  data.forEach(v => {
    const categoria = v.nome_categoria || 'Sem categoria';
    resumo[categoria] = (resumo[categoria] || 0) + v.total;
  });

  const labels = Object.keys(resumo);
  const valores = Object.values(resumo);

  const ctx = document.getElementById('grafico-categoria').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut', // ou 'bar', 'pie'
    data: {
      labels,
      datasets: [{
        label: 'Total Vendido por Categoria',
        data: valores,
        backgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }]
    }
  });
}



async function carregarAtividadesRecentes() {
  const { data, error } = await supabase
    .from('vendas_com_categorias')
    .select('nome_produto, quantidade, data')
    .order('data', { ascending: false })
    .limit(5);

  if (error) {
    alert('Erro ao carregar atividades recentes');
    return;
  }

  const lista = document.getElementById('atividades-recentes');
  if (!lista) return;

  lista.innerHTML = data.map(v => `
    <li>
      ${v.nome_produto} - ${v.quantidade} un. - ${new Date(v.data).toLocaleDateString()}
    </li>
  `).join('');
}

async function carregarHistoricoVendas() {
  const { data, error } = await supabase
    .from('vendas_com_categorias')
    .select('*')
    .limit(5)
    .order('data', { ascending: false });

  if (error) return alert('Erro ao carregar histórico de vendas');

  const tabela = document.getElementById('tabela-historico-vendas');
  if (!tabela) return;

  tabela.innerHTML = data.map(v => `
    <tr>
      <td>${v.nome_produto}</td>
      <td>${new Date(v.data).toLocaleDateString()}</td>
      <td>${v.quantidade}</td>
      <td>${v.nome_categoria || '-'}</td>
      <td>${v.valor_unitario.toFixed(2)}</td>
      <td>${v.total.toFixed(2)}</td>
      <td>${v.forma_pagamento}</td>
    </tr>
  `).join('');
}

async function carregarFornecedoresNoIndex() {
  const { data, error } = await supabase
    .from('fornecedores')
    .select('*');

  if (error) return alert('Erro ao carregar fornecedores');

  const tabela = document.getElementById('tabela-fornecedores-index');
  if (!tabela) return;

  tabela.innerHTML = data.map(f => `
    <tr>
      <td>${f.nome}</td>
      <td>${f.nif}</td>
      <td>${f.telefone}</td>
      <td>${f.endereco}</td>
      <td>${f.estabelecimento || '-'}</td>
      <td>${f.email}</td>
    </tr>
  `).join('');
}

async function carregarFuncionariosNoIndex() {
  const { data, error } = await supabase
    .from('funcionarios')
    .select('*')
    .limit(5)

  if (error) return alert('Erro ao carregar funcionários');

  const tabela = document.getElementById('tabela-funcionarios-index');
  if (!tabela) return;

  tabela.innerHTML = data.map(f => `
    <tr>
      <td>${f.nome}</td>
      <td>${f.bi}</td>
      <td>${f.data_nascimento || '-'}</td>
      <td>${f.telefone}</td>
      <td>${f.endereco}</td>
      <td>${f.email}</td>
    </tr>
  `).join('');
}


carregarIndicadores();
carregarTotalProdutos();
carregarGraficoVendas();
carregarGraficoVendasPorCategoria();
carregarAtividadesRecentes();
carregarHistoricoVendas();
carregarFornecedoresNoIndex();
carregarFuncionariosNoIndex();
