// Gerador de UUID Simulado
function generateUUID() {
    return 'ebc-' + Math.random().toString(36).substr(2, 9);
}

// Cadastro
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = {
            id: generateUUID(),
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            whatsapp: document.getElementById('whatsapp').value
        };
        localStorage.setItem('ebc_user', JSON.stringify(user));
        alert('Conta criada com sucesso!');
        window.location.href = 'dashboard.html';
    });
}

// Carregar Dashboard
function carregarDashboard() {
    const userData = localStorage.getItem('ebc_user');
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }
    const user = JSON.parse(userData);

    document.getElementById('dash-uuid').value = user.id;
    document.getElementById('dash-nome').value = user.nome;
    document.getElementById('dash-email').value = user.email;
    document.getElementById('dash-whatsapp').value = user.whatsapp;

    const publicUrl = `${window.location.origin}/card.html?id=${user.id}`;
    document.getElementById('dash-card-url').innerText = publicUrl;

    // Gerar QR Code
    document.getElementById('qrcode-container').innerHTML = "";
    new QRCode(document.getElementById('qrcode-container'), {
        text: publicUrl,
        width: 160,
        height: 160
    });
}

// Carregar Card Público
function carregarCardPublico() {
    const userData = localStorage.getItem('ebc_user');
    let user = userData ? JSON.parse(userData) : {
        nome: "Mara M.",
        email: "maramwawaw@gmail.com",
        whatsapp: "+5542999157587"
    };

    document.getElementById('card-nome').innerText = user.nome;
    document.getElementById('link-wa').href = `https://wa.me/${user.whatsapp.replace(/\D/g,'')}`;
    document.getElementById('link-email').href = `mailto:${user.email}`;

    new QRCode(document.getElementById('public-qr'), {
        text: window.location.href,
        width: 120,
        height: 120
    });
}

// Logout
function logout() {
    localStorage.removeItem('ebc_user');
    window.location.href = 'index.html';
}// Função para abrir modal do Pix
function abrirPix(nomePlano) {
    document.getElementById('plano-selecionado').innerText = "Plano: " + nomePlano;
    document.getElementById('pix-modal').style.display = 'flex';
}

// Função para fechar modal do Pix
function fecharPix() {
    document.getElementById('pix-modal').style.display = 'none';
}