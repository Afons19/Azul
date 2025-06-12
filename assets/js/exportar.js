// Excel (XLSX)
function exportarTabelaParaExcel(idTabela, nomeArquivo) {
  const tabela = document.getElementById(idTabela);
  const wb = XLSX.utils.table_to_book(tabela, { sheet: 'Relatório' });
  XLSX.writeFile(wb, `${nomeArquivo}.xlsx`);
}

// PDF (jsPDF + autoTable)
function exportarTabelaParaPDF(idTabela, titulo = 'Relatório') {
  const doc = new window.jspdf.jsPDF();
  doc.text(titulo, 14, 16);

  doc.autoTable({
    html: `#${idTabela}`,
    startY: 20,
    theme: 'striped'
  });

  doc.save(`${titulo}.pdf`);
}

// Expor funções no escopo global para onclick funcionar
window.exportarTabelaParaExcel = exportarTabelaParaExcel;
window.exportarTabelaParaPDF = exportarTabelaParaPDF;
