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

// Função para criar um post com nome do usuário, data e hora
function createPost(postText, userName) {
    const postFeed = document.getElementById('post-feed');

    // Criando os elementos do post
    const postItem = document.createElement('div');
    postItem.classList.add('post-item');

    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');
    
    const postInfo = document.createElement('div');
    postInfo.classList.add('post-info');
    
    const postDate = new Date().toLocaleString(); // Data e hora da postagem
    postInfo.textContent = `${userName} - ${postDate}`;
    
    const postTextEl = document.createElement('p');
    postTextEl.textContent = postText;
    
    postHeader.appendChild(postInfo);
    
    // Criando a seção de botões de ação (Curtir, Comentar)
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions');
    
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Curtir';
    let liked = false;

    likeButton.addEventListener('click', () => {
        liked = !liked;
        likeButton.textContent = liked ? 'Descurtir' : 'Curtir';
    });

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comentar';

    commentButton.addEventListener('click', () => {
        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');
        
        const commentInput = document.createElement('textarea');
        commentInput.classList.add('comment-input');
        commentInput.placeholder = 'Escreva um comentário...';

        const submitCommentButton = document.createElement('button');
        submitCommentButton.textContent = 'Enviar';
        submitCommentButton.addEventListener('click', () => {
            const commentText = document.createElement('p');
            commentText.textContent = commentInput.value;
            commentSection.appendChild(commentText);
            commentInput.remove(); // Remove o input de comentário após o envio
            submitCommentButton.remove(); // Remove o botão de envio após o comentário
        });

        commentSection.appendChild(commentInput);
        commentSection.appendChild(submitCommentButton);
        postItem.appendChild(commentSection);
    });

    postActions.appendChild(likeButton);
    postActions.appendChild(commentButton);

    // Montando o post e adicionando ao feed
    postItem.appendChild(postHeader);
    postItem.appendChild(postTextEl);
    postItem.appendChild(postActions);

    postFeed.appendChild(postItem);
}

// Função para criar o post quando o botão de postar for clicado
document.getElementById('post-btn').addEventListener('click', function() {
    const postInput = document.getElementById('post-input');
    const userName = 'Jonathan Bauer'; // Você pode substituir por uma lógica para pegar o nome do usuário logado
    const postText = postInput.value;

    if (postText.trim() !== '') {
        createPost(postText, userName);
        postInput.value = ''; // Limpa o campo de texto após postar
    } else {
        alert('Escreva algo para postar.');
    }
});

// Adiciona evento ao clicar no ícone de busca
document.querySelector('.search-icon i').addEventListener('click', function() {
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Buscar usuários...');
    searchInput.classList.add('search-input');

    document.querySelector('.header').appendChild(searchInput);

    // Ação ao pressionar Enter no campo de busca
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchValue = searchInput.value;
            // Lógica de busca de usuários
            searchUsers(searchValue);
            searchInput.remove(); // Remove o campo de busca após a pesquisa
        }
    });
});

// Função para buscar usuários (exemplo, pode ser ajustada conforme seu backend)
function searchUsers(query) {
    console.log('Buscando usuário:', query);
    // Adicione aqui sua lógica de busca de usuários
}
