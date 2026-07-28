// Utilitário para Exibir Mensagens de Alerta
function exibirAlerta(elementId, mensagem, tipo = 'error') {
    const alertBox = document.getElementById(elementId);
    if (!alertBox) return;

    alertBox.innerText = mensagem;
    alertBox.className = `form-alert ${tipo === 'error' ? 'alert-error' : 'alert-success'}`;
    alertBox.style.display = 'block';
}

// Geração de ID Único
function gerarEbcId() {
    return 'ebc_' + Math.random().toString(36).substring(2, 9);
}

// Função de Cadastro
function realizarCadastro(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const senha = document.getElementById('senha').value;
    const plano = document.getElementById('plano').value;

    if (!nome || !email || !whatsapp || !senha) {
        exibirAlerta('auth-alert', 'Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Verificar se já existe usuário cadastrado com esse e-mail
    const usuariosSalvos = JSON.parse(localStorage.getItem('ebc_usuarios')) || [];
    const usuarioExistente = usuariosSalvos.find(user => user.email === email);

    if (usuarioExistente) {
        exibirAlerta('auth-alert', 'Este e-mail já está cadastrado. Faça login para acessar.');
        return;
    }

    // Criar Objeto do Usuário
    const novoUsuario = {
        ebc_id: gerarEbcId(),
        nome,
        email,
        whatsapp,
        senha, // Na Entrega 5 será criptografado via Supabase Auth
        plano,
        status_pagamento: 'Pendente',
        criado_em: new Date().toISOString()
    };

    // Salvar Usuário e Iniciar Sessão
    usuariosSalvos.push(novoUsuario);
    localStorage.setItem('ebc_usuarios', JSON.stringify(usuariosSalvos));
    localStorage.setItem('ebc_sessao_ativa', JSON.stringify(novoUsuario));

    exibirAlerta('auth-alert', 'Cadastro realizado com sucesso! Redirecionando...', 'success');

    // Redireciona para o checkout do plano ou direto para o dashboard
    setTimeout(() => {
        const valorPlano = plano === 'Start' ? '19.90' : '49.90';
        window.location.href = `checkout.html?plano=${encodeURIComponent(plano)}&valor=${valorPlano}`;
    }, 1200);
}

// Função de Login
function realizarLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const senha = document.getElementById('login-senha').value;

    const usuariosSalvos = JSON.parse(localStorage.getItem('ebc_usuarios')) || [];
    const usuarioValido = usuariosSalvos.find(user => user.email === email && user.senha === senha);

    if (!usuarioValido) {
        exibirAlerta('login-alert', 'E-mail ou senha incorretos. Verifique e tente novamente.');
        return;
    }

    // Salva Sessão Ativa
    localStorage.setItem('ebc_sessao_ativa', JSON.stringify(usuarioValido));
    exibirAlerta('login-alert', 'Login efetuado! Acessando painel...', 'success');

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

// Função de Logout
function realizarLogout() {
    localStorage.removeItem('ebc_sessao_ativa');
    window.location.href = 'login.html';
}