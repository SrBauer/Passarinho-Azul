// Função para salvar os dados do usuário no localStorage
function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// Função para capturar os dados do formulário de cadastro
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verificar se todos os campos foram preenchidos
    if (!name || !email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Criar objeto do usuário
    const user = {
        name: name,
        email: email,
        password: password
    };

    // Salvar os dados do usuário no localStorage
    saveUser(user);

    // Redirecionar para a página do feed
    window.location.href = 'feed.html';
});
