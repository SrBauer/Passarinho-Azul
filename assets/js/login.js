// Importar a função applyDarkMode do DarkMode.js
import { applyDarkMode } from './DarkMode.js';

// Aplicar o modo escuro ao carregar a página
document.addEventListener('DOMContentLoaded', applyDarkMode);

// Função para verificar se o usuário está cadastrado
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Buscar a lista de usuários armazenados no localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar se há algum usuário com o email e senha correspondentes
    const foundUser = storedUsers.find(user => user.email === email && user.password === password);

    if (foundUser) {
        // Armazenar o usuário logado no localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
        alert(`Bem-vindo de volta, ${foundUser.name}!`);
        window.location.href = 'feed.html';  // Redirecionar para a página do feed
    } else {
        alert('Email ou senha incorretos. Tente novamente.');
    }
});
