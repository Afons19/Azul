const admin = JSON.parse(sessionStorage.getItem('admin'));
if (!admin || !admin.user_metadata?.isAdmin) {
  window.location.href = 'login.html';
}
