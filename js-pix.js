// Copiar Chave Pix para a Área de Transferência
function copiarChavePix() {
    const pixInput = document.getElementById('pix-key-input');
    pixInput.select();
    pixInput.setSelectionRange(0, 99999); // Para telas mobile

    navigator.clipboard.writeText(pixInput.value).then(() => {
        alert('Chave Pix maramwawaw@gmail.com copiada com sucesso!');
    }).catch(err => {
        console.error('Erro ao copiar chave: ', err);
    });
}

// Redirecionamento para confirmação no WhatsApp
function enviarComprovanteWhatsApp() {
    const planData = JSON.parse(localStorage.getItem('ebc_selected_plan')) || { plano: 'Pro Business', valor: '49.90' };
    const telefone = '5542999157587';
    
    const mensagem = `Olá! Fiz o Pix do EBC via InfinitePay referente ao Plano ${planData.plano} (R$ ${planData.valor.replace('.', ',')}). Segue o comprovante para liberação do meu acesso:`;
    
    const urlWhatsApp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');
}