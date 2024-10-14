// Função para alternar o modo escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Salvar a preferência do usuário no localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Função para aplicar o modo escuro
function applyDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Aplicar o modo escuro ao carregar a página
document.addEventListener('DOMContentLoaded', applyDarkMode);

// Exportar as funções para uso em outros arquivos
export { toggleDarkMode, applyDarkMode };

