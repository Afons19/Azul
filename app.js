/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Ficheiro consolidado: app.js

// ==============================================================================
// Estado Inicial e Dados (Eventualmente virá da Base de Dados)
// ==============================================================================

// Nota: Estes dados são apenas para exemplo inicial.
// A função fetchDashboardData() deverá buscar dados reais.
let dadosFinanceiros = {
  totalVendas: 0,
  totalDespesas: 0,
  produtosVendidos: 0,
  vendasDiarias: [], // Valores
  diasDaSemana: [], // Labels (ex: "Seg", "Ter", ...)
  categorias: [], // Labels (ex: "Eletrônicos", "Roupas", ...)
  vendasPorCategoria: [], // Valores
  fornecedores: [], // Array de objetos de fornecedores
  vendasRecentes: [], // Array de objetos de vendas
  atividadesRecentes: [], // Array de strings ou objetos de atividades
};

// ==============================================================================
// Funções Auxiliares
// ==============================================================================

function formatarMoeda(valor) {
  // Assegura que o valor é numérico
  const numero = Number(valor) || 0;
  return new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" })
    .format(numero)
    // .replace("AOA", "kz"); // O Intl já costuma adicionar o símbolo correto, mas podemos ajustar se necessário
}

function formatarData(dataString) {
  if (!dataString) return "-";
  try {
    const data = new Date(dataString);
    // Verifica se a data é válida
    if (isNaN(data.getTime())) {
        return "Data inválida";
    }
    const options = { year: "numeric", month: "short", day: "numeric" };
    return data.toLocaleDateString("pt-AO", options);
  } catch (error) {
    console.error("Erro ao formatar data:", dataString, error);
    return "Erro data";
  }
}

// ==============================================================================
// Funções de Atualização da Interface (UI)
// ==============================================================================

function atualizarMetricas(dados) {
  const totalVendasEl = document.getElementById("total_vendas");
  const totalDespesasEl = document.getElementById("total_despesas");
  const lucroLiquidoEl = document.getElementById("lucro_liquido");
  const totalProdutosEl = document.getElementById("total_produtos");

  if (totalVendasEl) totalVendasEl.textContent = formatarMoeda(dados.totalVendas);
  if (totalDespesasEl) totalDespesasEl.textContent = formatarMoeda(dados.totalDespesas);
  
  const lucro = (Number(dados.totalVendas) || 0) - (Number(dados.totalDespesas) || 0);
  if (lucroLiquidoEl) {
      lucroLiquidoEl.textContent = formatarMoeda(lucro);
      // Remove classes antigas antes de adicionar a nova
      lucroLiquidoEl.classList.remove("positive", "negative", "neutral");
      if (lucro > 0) {
          lucroLiquidoEl.classList.add("positive");
          // Aplica cor verde diretamente se necessário (embora CSS seja preferível)
          // lucroLiquidoEl.style.color = "rgb(50, 224, 50)"; 
      } else if (lucro < 0) {
          lucroLiquidoEl.classList.add("negative");
          // Aplica cor vermelha diretamente se necessário
          // lucroLiquidoEl.style.color = "red"; 
      } else {
          lucroLiquidoEl.classList.add("neutral");
          // lucroLiquidoEl.style.color = ""; // Cor padrão
      }
  }

  if (totalProdutosEl) totalProdutosEl.textContent = dados.produtosVendidos || 0;
}

function atualizarTabelaVendas(vendas) {
  const tabelaVendasBody = document.querySelector("#tabela_vendas");
  if (!tabelaVendasBody) return;

  tabelaVendasBody.innerHTML = ""; // Limpa a tabela antes de preencher

  if (!Array.isArray(vendas)) {
    console.error("Dados de vendas recentes inválidos:", vendas);
    return;
  }

  vendas.forEach((venda) => {
    const row = document.createElement("tr");
    // Ajustado para corresponder às colunas do HTML
    // Nota: 'Autor', 'Categoria', 'Valor Unit.' e 'Valor Total' podem precisar de dados adicionais da BD
    row.innerHTML = `
          <td>${venda.cliente || venda.autor || 'N/D'}</td> 
          <td>${venda.produto || venda.nomeProduto || 'N/D'}</td>
          <td>${venda.categoria || 'N/D'}</td> 
          <td>${venda.quantidade || 0}</td>
          <td>${formatarData(venda.data)}</td>
          <td>${formatarMoeda(venda.valorUnitario || 0)}</td> 
          <td>${formatarMoeda(venda.valor || venda.valorTotal || 0)}</td> 
        `;
    tabelaVendasBody.appendChild(row);
  });
}

function atualizarTabelaFornecedores(fornecedores) {
  const tabelaFornecedoresBody = document.querySelector("#tabelaFornecedores tbody"); // Corrigido o seletor
  if (!tabelaFornecedoresBody) return;

  tabelaFornecedoresBody.innerHTML = ""; // Limpa a tabela

  if (!Array.isArray(fornecedores)) {
    console.error("Dados de fornecedores inválidos:", fornecedores);
    return;
  }

  fornecedores.forEach((fornecedor) => {
    const row = document.createElement("tr");
    // Ajustado para corresponder às colunas do HTML
    // Nota: 'NIF', 'Telefone', 'Endereço', 'Estabelecimento', 'E-mail', 'ID' precisam de dados da BD
    row.innerHTML = `
          <td>${fornecedor.nome || fornecedor.nomeCompleto || 'N/D'}</td>
          <td>${fornecedor.nif || 'N/D'}</td>
          <td>${fornecedor.telefone || 'N/D'}</td>
          <td>${fornecedor.endereco || 'N/D'}</td>
          <td>${fornecedor.estabelecimento || 'N/D'}</td>
          <td>${fornecedor.email || 'N/D'}</td>
          <td>${fornecedor.id || 'N/D'}</td>
        `;
    // Poderia adicionar dados que existem, como 'Última Entrega' ou 'Valor Total', se houvesse colunas
    tabelaFornecedoresBody.appendChild(row);
  });
}

function atualizarAtividadesRecentes(atividades) {
    const listaAtividades = document.getElementById("atividade_recentes");
    if (!listaAtividades) return;

    listaAtividades.innerHTML = ""; // Limpa a lista

    if (!Array.isArray(atividades)) {
        console.error("Dados de atividades recentes inválidos:", atividades);
        return;
    }

    if (atividades.length === 0) {
        listaAtividades.innerHTML = "<li>Nenhuma atividade recente.</li>";
        return;
    }

    atividades.forEach(atividade => {
        const item = document.createElement("li");
        // Assumindo que 'atividade' é uma string ou tem uma propriedade 'descricao'
        item.textContent = typeof atividade === 'string' ? atividade : atividade.descricao || "Atividade não descrita";
        listaAtividades.appendChild(item);
    });
}

// ==============================================================================
// Funções de Atualização dos Gráficos (Chart.js)
// ==============================================================================

// Armazenar instâncias dos gráficos para poder destruí-las antes de recriar
let graficoVendasDiariasInstance = null;
let graficoVendasCategoriaInstance = null;

function atualizarGraficoVendasDiarias(labels, valores) {
    const ctx = document.getElementById('vendas_diarias_grafico')?.getContext('2d');
    if (!ctx) return;

    if (graficoVendasDiariasInstance) {
        graficoVendasDiariasInstance.destroy();
    }

    graficoVendasDiariasInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels || [],
            datasets: [{
                label: 'Vendas em kz',
                data: valores || [],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 800,
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    titleFont: {
                        size: 13
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            return ` Vendas: ${formatarMoeda(context.parsed.y)}`;
                        }
                    }
                }
            }
        }
    });
}

function atualizarGraficoVendasCategoria(labels, valores) {
    const ctx = document.getElementById('vendas_categoria_grafico')?.getContext('2d');
    if (!ctx) return;

    if (graficoVendasCategoriaInstance) {
        graficoVendasCategoriaInstance.destroy();
    }

    const cores = [
        { bg: 'rgba(255, 99, 132, 0.6)', borda: 'rgba(255, 99, 132, 1)' },
        { bg: 'rgba(54, 162, 235, 0.6)', borda: 'rgba(54, 162, 235, 1)' },
        { bg: 'rgba(255, 206, 86, 0.6)', borda: 'rgba(255, 206, 86, 1)' },
        { bg: 'rgba(75, 192, 192, 0.6)', borda: 'rgba(75, 192, 192, 1)' },
        { bg: 'rgba(153, 102, 255, 0.6)', borda: 'rgba(153, 102, 255, 1)' },
        { bg: 'rgba(255, 159, 64, 0.6)', borda: 'rgba(255, 159, 64, 1)' }
    ];

    // Garante que temos cores suficientes, repetindo se necessário
    const backgroundColors = valores.map((_, i) => cores[i % cores.length].bg);
    const borderColors = valores.map((_, i) => cores[i % cores.length].borda);

    graficoVendasCategoriaInstance = new Chart(ctx, {
        type: 'doughnut', // Ou 'pie'
        data: {
            labels: labels || [],
            datasets: [{
                data: valores || [],
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 800,
                animateRotate: true,
                animateScale: false
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        boxWidth: 10
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const valor = context.parsed;
                            const percentual = total ? ((valor / total) * 100).toFixed(1) : 0;
                            return ` ${context.label}: ${formatarMoeda(valor)} (${percentual}%)`;
                        }
                    }
                }
            }
        }
    });
}

// ==============================================================================
// Função Principal de Atualização (Chamada após buscar dados)
// ==============================================================================

function atualizarDashboardCompleto(novosDados) {
    // Atualiza o estado global (opcional, mas pode ser útil)
    dadosFinanceiros = { ...dadosFinanceiros, ...novosDados };

    // Atualiza os diferentes componentes da UI
    atualizarMetricas(dadosFinanceiros);
    atualizarGraficoVendasDiarias(dadosFinanceiros.diasDaSemana, dadosFinanceiros.vendasDiarias);
    atualizarGraficoVendasCategoria(dadosFinanceiros.categorias, dadosFinanceiros.vendasPorCategoria);
    atualizarTabelaVendas(dadosFinanceiros.vendasRecentes);
    atualizarTabelaFornecedores(dadosFinanceiros.fornecedores);
    atualizarAtividadesRecentes(dadosFinanceiros.atividadesRecentes);
}

// ==============================================================================
// Lógica de Busca de Dados (Placeholder)
// ==============================================================================

async function fetchDashboardData() {
    console.log("A buscar dados do dashboard...");
    // --- PONTO DE INTEGRAÇÃO COM O BACKEND --- 
    // Aqui você fará a chamada fetch() para a sua API ou endpoint
    // Exemplo:
    // try {
    //   const response = await fetch('/api/dashboard-data');
    //   if (!response.ok) {
    //     throw new Error(`Erro HTTP: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   console.log("Dados recebidos:", data);
    //   return data;
    // } catch (error) {
    //   console.error("Falha ao buscar dados do dashboard:", error);
    //   // Retornar dados vazios ou padrão em caso de erro
    //   return {
    //       totalVendas: 0, totalDespesas: 0, produtosVendidos: 0,
    //       vendasDiarias: [], diasDaSemana: [], categorias: [], vendasPorCategoria: [],
    //       fornecedores: [], vendasRecentes: [], atividadesRecentes: []
    //   };
    // }

    // Por enquanto, retorna os dados de exemplo após um pequeno delay
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Usando dados de exemplo.");
            const dadosExemplo = {
                totalVendas: 1850000,
                totalDespesas: 950000,
                produtosVendidos: 415,
                vendasDiarias: [18000, 25000, 38000, 42000, 29000, 21000, 24000],
                diasDaSemana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
                categorias: ["Eletrônicos", "Roupas", "Alimentos", "Casa", "Outros"],
                vendasPorCategoria: [750000, 380000, 300000, 180000, 240000],
                fornecedores: [
                    { nome: "Fornecedor A", nif: "123456789", telefone: "912345678", endereco: "Rua X, 1", estabelecimento: "Loja A", email: "a@mail.com", id: "F001" },
                    { nome: "Fornecedor B", nif: "987654321", telefone: "923456789", endereco: "Rua Y, 2", estabelecimento: "Loja B", email: "b@mail.com", id: "F002" },
                ],
                vendasRecentes: [
                    { data: "2023-05-25", produto: "Laptop Pro", quantidade: 1, valor: 150000, cliente: "Cliente VIP", categoria: "Eletrônicos", valorUnitario: 150000 },
                    { data: "2023-05-24", produto: "T-Shirt", quantidade: 3, valor: 7500, cliente: "Cliente Regular", categoria: "Roupas", valorUnitario: 2500 },
                    { data: "2023-05-24", produto: "Café Gourmet", quantidade: 2, valor: 3000, cliente: "Cliente Novo", categoria: "Alimentos", valorUnitario: 1500 },
                ],
                atividadesRecentes: [
                    "Nova venda registrada: Laptop Pro",
                    "Stock do produto 'T-Shirt' atualizado",
                    "Fornecedor 'Fornecedor B' adicionado"
                ]
            };
            resolve(dadosExemplo);
        }, 1000); // Simula espera da rede
    });
}

// ==============================================================================
// Inicialização
// ==============================================================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM carregado. Inicializando dashboard...");
    const dadosIniciais = await fetchDashboardData();
    if (dadosIniciais) {
        atualizarDashboardCompleto(dadosIniciais);
    } else {
        console.error("Não foi possível carregar os dados iniciais do dashboard.");
        // Opcional: Mostrar mensagem de erro ao utilizador na UI
    }

    // A simulação de atualização foi removida. A atualização real
    // dependerá de como o backend/base de dados notifica o frontend
    // (ex: WebSockets, polling periódico com fetchDashboardData, etc.)
    // simularAtualizacaoDados(); 
});

// Exemplo de como poderia ser uma função de atualização periódica (Polling)
/*
setInterval(async () => {
    console.log("Verificando atualizações de dados...");
    const novosDados = await fetchDashboardData();
    if (novosDados) {
        // Idealmente, comparar novosDados com dadosFinanceiros atuais
        // e só atualizar se houver mudanças significativas.
        atualizarDashboardCompleto(novosDados);
    }
}, 60000); // Verificar a cada 60 segundos
*/

