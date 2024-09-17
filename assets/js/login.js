// Função para verificar se o usuário está cadastrado
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Buscar os dados do usuário armazenados no localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Verificar se o email e senha correspondem aos dados do usuário cadastrado
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert(`Bem-vindo de volta, ${storedUser.name}!`);
        window.location.href = 'feed.html';  // Redirecionar para a página do feed
    } else {
        alert('Email ou senha incorretos. Tente novamente.');
    }
});
