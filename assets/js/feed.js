document.getElementById('post-input').addEventListener('input', function() {
    const charCount = this.value.length;
    const charLimit = 280;
    document.getElementById('char-count').textContent = `${charCount}/${charLimit}`;
});

document.getElementById('post-btn').addEventListener('click', function() {
    const postText = document.getElementById('post-input').value;
    if (postText) {
        addPost(postText);
        document.getElementById('post-input').value = '';
        document.getElementById('char-count').textContent = `0/280`;
    }
});

function addPost(text) {
    const postFeed = document.getElementById('post-feed');
    const newPost = document.createElement('div');
    newPost.className = 'post-item';
    newPost.textContent = text;
    postFeed.insertBefore(newPost, postFeed.firstChild);

    // Save to localStorage
    savePost(text);
}

function savePost(text) {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.unshift(text);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.forEach(post => addPost(post));
}

window.onload = loadPosts;

// Verificar se o usuário está logado
window.onload = function() {
    const user = localStorage.getItem('user');
    
    if (!user) {
        alert('Você precisa estar logado para acessar o feed.');
        window.location.href = 'login.html';
    } else {
        // Exibir o nome do usuário na tela do feed (opcional)
        const loggedUser = JSON.parse(user);
        alert(`Bem-vindo ao feed, ${loggedUser.name}!`);
    }
};

// Função de logout
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Função para mostrar/esconder o menu ao clicar no ícone hambúrguer
document.getElementById('hamburger-menu').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});


