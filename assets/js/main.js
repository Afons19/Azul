import { AuthService } from './auth.module.js'
import { CrudService } from './crud.module.js'
import { StorageService } from './storage.module.js'
import { UIService } from './ui.module.js'

// Exporta serviços para uso global
window.App = {
  AuthService,
  CrudService,
  StorageService,
  UIService
}

// Protege páginas que requerem autenticação
document.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.pathname.includes('login.html')) {
    const session = await AuthService.getSession()
    if (!session) window.location.href = '../paginas/login.html'
  }
})