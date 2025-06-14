const admin = JSON.parse(sessionStorage.getItem('admin'));
const nome = admin?.user_metadata?.nome || 'Admin';
document.getElementById('dashUtilizador').innerText ='Adm | '+ nome;
