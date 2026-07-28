let cardDataAtual = null;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get('id');

    const cardsSalvos = JSON.parse(localStorage.getItem('ebc_cards')) || {};
    cardDataAtual = cardsSalvos[cardId] || {
        nome: 'Profissional EBC',
        cargo: 'Expert Business Card',
        whatsapp: '5542999157587',
        email: 'maramwawaw@gmail.com',
        bio: 'Este cartão digital foi ativado no EBC.'
    };

    // Renderizar dados no HTML
    document.getElementById('public-nome').innerText = cardDataAtual.nome;
    document.getElementById('public-cargo').innerText = cardDataAtual.cargo;
    document.getElementById('public-bio').innerText = cardDataAtual.bio;

    // Iniciais do Avatar
    const iniciais = cardDataAtual.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    document.getElementById('card-avatar-initials').innerText = iniciais || 'EB';

    // Links de Contato
    document.getElementById('btn-public-wa').href = `https://wa.me/${cardDataAtual.whatsapp.replace(/\D/g, '')}`;
    document.getElementById('btn-public-email').href = `mailto:${cardDataAtual.email}`;

    if (cardDataAtual.instagram) {
        const btnInsta = document.getElementById('btn-public-insta');
        btnInsta.href = `https://instagram.com/${cardDataAtual.instagram.replace('@', '')}`;
        btnInsta.style.display = 'flex';
    }

    if (cardDataAtual.linkedin) {
        const btnLinkedin = document.getElementById('btn-public-linkedin');
        btnLinkedin.href = cardDataAtual.linkedin.startsWith('http') ? cardDataAtual.linkedin : `https://linkedin.com/${cardDataAtual.linkedin}`;
        btnLinkedin.style.display = 'flex';
    }
});

// Download do Contato no Formato vCard (.vcf)
function baixarVCard() {
    if (!cardDataAtual) return;

    const vcardContent = `BEGIN:VCARD
VERSION:3.0
FN:${cardDataAtual.nome}
TITLE:${cardDataAtual.cargo}
TEL;TYPE=CELL:${cardDataAtual.whatsapp}
EMAIL:${cardDataAtual.email}
NOTE:${cardDataAtual.bio}
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${cardDataAtual.nome.replace(/\s+/g, '_')}_contact.vcf`;
    link.click();
}