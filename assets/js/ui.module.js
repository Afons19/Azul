export const UIService = {
  showLoading(element) {
    element.innerHTML = '<div class="loading">Carregando...</div>'
  },

  showError(element, message) {
    element.innerHTML = `<div class="error">${message}</div>`
  },

  renderTable(data, columns, actions = []) {
    return `
      <table>
        <thead>
          <tr>
            ${columns.map(col => `<th>${col.label}</th>`).join('')}
            ${actions.length ? '<th>Ações</th>' : ''}
          </tr>
        </thead>
        <tbody>
          ${data.map(item => `
            <tr>
              ${columns.map(col => `<td>${item[col.field]}</td>`).join('')}
              ${actions.length ? `
                <td class="actions">
                  ${actions.map(action => `
                    <button class="${action.class}" 
                            data-id="${item.id}" 
                            title="${action.title}">
                      ${action.icon || action.text}
                    </button>
                  `).join('')}
                </td>
              ` : ''}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `
  }
}