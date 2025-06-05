import { supabase } from './supabase.js';

document.getElementById('form-login')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validação simples
  if (!email || !password) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Tentativa de login
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert('Login inválido. Verifique o e-mail e a senha.');
    return;
  }

  const user = data.user;
  const metadata = user.user_metadata;

  // Validação de administrador
  if (!metadata || !metadata.isAdmin) {
    alert('Você não é administrador. Será redirecionado para registro.');
    window.location.href = 'registro.html';
    return;
  }

  // Armazena o admin na sessão
  sessionStorage.setItem('admin', JSON.stringify(user));

  // Redireciona para o painel
  alert(`Bem-vindo, ${metadata.nome || 'Administrador'}!`);
  window.location.href = 'index.html';
});
