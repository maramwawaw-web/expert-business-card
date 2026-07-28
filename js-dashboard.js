document.addEventListener('DOMContentLoaded', () => {
    // Validar Sessão do Usuário
    const sessao = JSON.parse(localStorage.getItem('ebc_sessao_ativa'));
    if (!sessao) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('user-display-name').innerText = `👋 Olá, ${sessao.nome.split(' ')[0]}`;

    // Carregar ou Inicializar Dados do Card
    const cardsSalvos = JSON.parse(localStorage.getItem('ebc_cards')) || {};
    const meuCard = cardsSalvos[sessao.ebc_id] || {
        nome: sessao.nome,
        cargo: 'Profissional EBC',
        whatsapp: sessao.whatsapp,
        email: sessao.email,
        instagram: '',
        linkedin: '',
        bio: 'Bem-vindo ao meu Expert Business Card!'
    };

    // Preencher Formulário
    document.getElementById('card-nome').value = meuCard.nome || '';
    document.getElementById('card-cargo').value = meuCard.cargo || '';
    document.getElementById('card-whatsapp').value = meuCard.whatsapp || '';
    document.getElementById('card-email').value = meuCard.email || '';
    document.getElementById('card-instagram').value = meuCard.instagram || '';
    document.getElementById('card-linkedin').value = meuCard.linkedin || '';
    document.getElementById('card-bio').value = meuCard.bio || '';

    // Gerar Link e QR Code Público
    const urlPublica = `${window.location.origin}/meu-card.html?id=${sessao.ebc_id}`;
    document.getElementById('link-card-input').value = urlPublica;
    document.getElementById('btn-ver-card-publico').href = urlPublica;
    document.getElementById('nav-ver-card').href = urlPublica;

    const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(urlPublica)}`;
    document.getElementById('qr-code-img').src = qrApi;
});

function salvarDadosCard(e) {
    e.preventDefault();
    const sessao = JSON.parse(localStorage.getItem('ebc_sessao_ativa'));

    const dadosAtualizados = {
        nome: document.getElementById('card-nome').value,
        cargo: document.getElementById('card-cargo').value,
        whatsapp: document.getElementById('card-whatsapp').value,
        email: document.getElementById('card-email').value,
        instagram: document.getElementById('card-instagram').value,
        linkedin: document.getElementById('card-linkedin').value,
        bio: document.getElementById('card-bio').value,
        atualizado_em: new Date().toISOString()
    };

    const cardsSalvos = JSON.parse(localStorage.getItem('ebc_cards')) || {};
    cardsSalvos[sessao.ebc_id] = dadosAtualizados;
    localStorage.setItem('ebc_cards', JSON.stringify(cardsSalvos));

    const alertBox = document.getElementById('dash-alert');
    alertBox.innerText = '✅ Cartão atualizado com sucesso!';
    alertBox.className = 'form-alert alert-success';
    alertBox.style.display = 'block';

    setTimeout(() => { alertBox.style.display = 'none'; }, 3000);
}

function copiarLinkCard() {
    const input = document.getElementById('link-card-input');
    input.select();
    navigator.clipboard.writeText(input.value);
    alert('Link do seu Card copiado com sucesso!');
}