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

// Função para validar a senha
function validatePassword(password) {
    const minLength = 8;
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/; // Regex para caracteres especiais
    const weakPasswords = ['12345678', 'password', 'qwerty', 'abc123']; // Exemplo de senhas fracas

    if (password.length < minLength) {
        alert('A senha deve ter pelo menos 8 caracteres.');
        return false;
    }
    if (!specialChars.test(password)) {
        alert('A senha deve conter pelo menos um caractere especial.');
        return false;
    }
    if (weakPasswords.includes(password)) {
        alert('A senha é muito fraca. Por favor, escolha outra.');
        return false;
    }
    return true;
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

    // Validar a senha
    if (!validatePassword(password)) {
        return; // Se a senha não for válida, não prosseguir
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
