// // exportar.js

// // Excel (XLSX)
// function exportarTabelaParaExcel(idTabela, nomeArquivo) {
//   const tabela = document.getElementById(idTabela);
//   const wb = XLSX.utils.table_to_book(tabela, { sheet: 'Relatório' });
//   XLSX.writeFile(wb, `${nomeArquivo}.xlsx`);
// }

// // PDF (jsPDF + autoTable)
// function exportarTabelaParaPDF(idTabela, titulo = 'Relatório') {
//   const doc = new jsPDF();
//   doc.text(titulo, 14, 16);

//   doc.autoTable({
//     html: `#${idTabela}`,
//     startY: 20,
//     theme: 'striped'
//   });

//   doc.save(`${titulo}.pdf`);
// }

// Exemplo de uso esperado no HTML:
// <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/jspdf"></script>
// <script src="https://cdn.jsdelivr.net/npm/jspdf-autotable"></script>
// <script src="../assets/js/exportar.js"></script>
// <button onclick="exportarTabelaParaExcel('tabela-funcionarios-index', 'Funcionarios')">Exportar Excel</button>
// <button onclick="exportarTabelaParaPDF('tabela-funcionarios-index', 'Funcionarios')">Exportar PDF</button>
