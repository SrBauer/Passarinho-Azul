// Contagem de caracteres e postagem
document.getElementById('post-input').addEventListener('input', function () {
    const charCount = this.value.length;
    const charLimit = 280;
    document.getElementById('char-count').textContent = `${charCount}/${charLimit}`;
});

document.getElementById('post-btn').addEventListener('click', function () {
    const postText = document.getElementById('post-input').value;
    if (postText) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const userName = loggedInUser.username; // Pegar nome do usuário logado
        createPost(postText, userName);
        document.getElementById('post-input').value = '';
        document.getElementById('char-count').textContent = '0/280';
    }
});

// Criação da postagem
function createPost(postText, userName) {
    const postFeed = document.getElementById('post-feed');

    const postItem = document.createElement('div');
    postItem.className = 'post-item';

    const postHeader = document.createElement('div');
    postHeader.className = 'post-header';

    const postInfo = document.createElement('div');
    postInfo.className = 'post-info';
    const postDate = new Date().toLocaleString();
    postInfo.textContent = `${userName} - ${postDate}`;

    const postTextEl = document.createElement('p');
    postTextEl.textContent = postText;

    const postActions = document.createElement('div');
    postActions.className = 'post-actions';

    // Contador de likes, dislikes e comentários
    let likeCount = 0;
    let dislikeCount = 0;
    let commentCount = 0;

    // Botões de like, dislike e comentar
    const likeButton = document.createElement('img');
    likeButton.src = 'assets/img/gostar.png';
    likeButton.className = 'icon like-icon';
    const likeCounter = document.createElement('span');
    likeCounter.textContent = likeCount;

    const dislikeButton = document.createElement('img');
    dislikeButton.src = 'assets/img/nao-gosto.png';
    dislikeButton.className = 'icon dislike-icon';
    const dislikeCounter = document.createElement('span');
    dislikeCounter.textContent = dislikeCount;

    const commentButton = document.createElement('img');
    commentButton.src = 'assets/img/comente.png';
    commentButton.className = 'icon comment-icon';
    const commentCounter = document.createElement('span');
    //commentCounter.textContent = commentCount;

    // Ações ao clicar nos botões
    likeButton.addEventListener('click', function () {
        if (likeButton.classList.contains('active')) {
            likeCount--;
            likeButton.classList.remove('active');
        } else {
            likeCount++;
            likeButton.classList.add('active');
            if (dislikeButton.classList.contains('active')) {
                dislikeCount--;
                dislikeButton.classList.remove('active');
            }
        }
        likeCounter.textContent = likeCount;
    });

    dislikeButton.addEventListener('click', function () {
        if (dislikeButton.classList.contains('active')) {
            dislikeCount--;
            dislikeButton.classList.remove('active');
        } else {
            dislikeCount++;
            dislikeButton.classList.add('active');
            if (likeButton.classList.contains('active')) {
                likeCount--;
                likeButton.classList.remove('active');
            }
        }
        dislikeCounter.textContent = dislikeCount;
    });

    commentButton.addEventListener('click', function () {
        const commentBox = createCommentBox(postItem);
        postItem.appendChild(commentBox);
    });

    postActions.appendChild(likeButton);
    postActions.appendChild(likeCounter);
    postActions.appendChild(dislikeButton);
    postActions.appendChild(dislikeCounter);
    postActions.appendChild(commentButton);
    postActions.appendChild(commentCounter);

    postHeader.appendChild(postInfo);
    postItem.appendChild(postHeader);
    postItem.appendChild(postTextEl);
    postItem.appendChild(postActions);

    postFeed.insertBefore(postItem, postFeed.firstChild);

    const post = {
        text: postText,
        user: userName,
        date: new Date().toLocaleString(),
        likes: 0,
        dislikes: 0,
        comments: []
    };

    userPosts.push(post);
}

// Função para criar o campo de comentário com botão de fechar
function createCommentBox(postItem) {
    const commentBox = document.createElement('div');
    commentBox.className = 'comment-box';

    // Botão de fechar "X"
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.className = 'close-btn';

    // Ação do botão de fechar
    closeButton.addEventListener('click', function () {
        commentBox.remove(); // Remove a caixa de comentário
    });

    const commentInput = document.createElement('textarea');
    commentInput.placeholder = 'Escreva um comentário...';
    commentInput.className = 'comment-input';

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comentar';
    commentButton.className = 'comment-btn';

    commentButton.addEventListener('click', function () {
        const commentText = commentInput.value;
        if (commentText) {
            addCommentToPost(postItem, commentText);
            commentInput.value = ''; // Limpa o campo de comentário após enviar
            commentBox.remove(); // Fecha a caixa de comentário após enviar
        }
    });

    // Adicionando o botão de fechar "X" à caixa de comentário
    commentBox.appendChild(closeButton);
    commentBox.appendChild(commentInput);
    commentBox.appendChild(commentButton);

    return commentBox;
}

// Função para adicionar o comentário à postagem
function addCommentToPost(postItem, commentText) {
    let commentSection = postItem.querySelector('.comment-section');
    if (!commentSection) {
        commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        postItem.appendChild(commentSection);
    }

    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    commentItem.textContent = commentText;

    commentSection.appendChild(commentItem);
}

// Verificar se há usuário logado ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        window.location.href = 'login.html'; // Redireciona para login se não estiver logado
    } else {
        console.log('Usuário logado:', loggedInUser.username);
    }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', function () {
    localStorage.removeItem('loggedInUser'); // Remove apenas o usuário logado
    window.location.href = 'login.html'; // Redireciona para a tela de login
});

// Menu hambúrguer
const hamburgerMenu = document.getElementById('hamburger-menu');
const menu = document.getElementById('menu');

hamburgerMenu.addEventListener('click', function(event) {
    event.stopPropagation();
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Fechar o menu ao clicar fora dele
document.addEventListener('click', function(event) {
    if (!hamburgerMenu.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});

// Prevenir que o menu feche ao clicar dentro dele
menu.addEventListener('click', function(event) {
    event.stopPropagation();
});

// Notificações e Minhas Publicações
document.getElementById('notifications').addEventListener('click', function () {
    alert('Nenhuma notificação no momento.');
});

document.getElementById('my-posts').addEventListener('click', function () {
    showUserPosts();
});

// Importar as funções do DarkMode.js
import { toggleDarkMode, applyDarkMode } from './DarkMode.js';

// Substituir a função toggleDarkMode existente pela importada
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

// Aplicar o modo escuro ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    applyDarkMode();
});

function showUserPosts() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userPostsFeed = document.getElementById('post-feed');
    userPostsFeed.innerHTML = ''; // Limpa o feed atual

    const userPostsFiltered = userPosts.filter(post => post.user === loggedInUser.username);

    if (userPostsFiltered.length === 0) {
        const noPostsMessage = document.createElement('p');
        noPostsMessage.textContent = 'Você ainda não fez nenhuma publicação.';
        userPostsFeed.appendChild(noPostsMessage);
    } else {
        userPostsFiltered.forEach(post => {
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            postItem.innerHTML = `
                <div class="post-header">
                    <div class="post-info">${post.user} - ${post.date}</div>
                </div>
                <p>${post.text}</p>
                <div class="post-actions">
                    <span>Likes: ${post.likes}</span>
                    <span>Dislikes: ${post.dislikes}</span>
                    <span>Comentários: ${post.comments.length}</span>
                </div>
            `;
            userPostsFeed.appendChild(postItem);
        });
    }
}
