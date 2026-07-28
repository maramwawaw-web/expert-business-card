// Controle de Seleção de Plano
function selecionarPlano(nomePlano, valor) {
    const planoData = { plano: nomePlano, valor: valor };
    localStorage.setItem('ebc_selected_plan', JSON.stringify(planoData));

    const modal = document.getElementById('checkout-modal');
    if (modal) {
        document.getElementById('modal-plano-titulo').innerText = `Ativação Plano ${nomePlano} - R$ ${valor.replace('.', ',')}`;
        modal.style.display = 'flex';
    } else {
        window.location.href = `checkout.html?plano=${encodeURIComponent(nomePlano)}&valor=${valor}`;
    }
}

function fecharModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}