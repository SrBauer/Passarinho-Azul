// Função para salvar os dados do usuário no localStorage 
function saveUser(newUser) {
    // Recuperar a lista de usuários já cadastrados, ou criar uma nova lista vazia
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar se o email já está cadastrado
    const userExists = users.some(user => user.email === newUser.email);

    if (userExists) {
        alert('Este email já está cadastrado. Por favor, faça login.');
        return;
    }

    // Adicionar o novo usuário à lista
    users.push(newUser);

    // Salvar a lista de usuários atualizada no localStorage
    localStorage.setItem('users', JSON.stringify(users));
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
    const newUser = {
        name: name,
        email: email,
        password: password
    };

    // Salvar os dados do usuário no localStorage
    saveUser(newUser);

    // Redirecionar para a página de login após cadastro
    window.location.href = 'login.html';
});
