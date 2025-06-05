// logout.js
import { supabase } from './supabase.js';

const logoutBtn = document.getElementById('term-sess');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    sessionStorage.clear();
    window.location.href = 'login.html';
  });
}