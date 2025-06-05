let carrinho = [];

function adicionar(nome, preco) {
  const item = carrinho.find(i => i.nome === nome);
  if (item) {
    item.quantidade += 1;
    item.total = item.quantidade * item.preco;
  } else {
    carrinho.push({ nome, preco, quantidade: 1, total: preco });
  }
  atualizarCarrinho();
}

function diminuir(nome) {
  const item = carrinho.find(i => i.nome === nome);
  if (item) {
    item.quantidade -= 1;
    if (item.quantidade <= 0) {
      remover(nome);
    } else {
      item.total = item.quantidade * item.preco;
    }
  }
  atualizarCarrinho();
}

function remover(nome) {
  carrinho = carrinho.filter(i => i.nome !== nome);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('carrinho');
  lista.innerHTML = '';
  let totalGeral = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.nome} - ${item.quantidade}x - R$${item.total.toFixed(2)}</span>
      <span>
        <button onclick="adicionar('${item.nome.replace(/'/g, "\\'")}', ${item.preco})">+</button>
        <button onclick="diminuir('${item.nome.replace(/'/g, "\\'")}')">-</button>
        <button onclick="remover('${item.nome.replace(/'/g, "\\'")}')">🗑️</button>
      </span>
    `;
    lista.appendChild(li);
    totalGeral += item.total;
  });

  document.getElementById('total').textContent = totalGeral.toFixed(2);
}

function enviarWhatsApp() {
  if (carrinho.length === 0) {
    alert("Seu kit está vazio!");
    return;
  }

  const numero = "5585981251110"; // número do WhatsApp (sem traços ou espaços)
  const pedido = carrinho
    .map(i => `• ${i.nome} - ${i.quantidade}x - R$${i.total.toFixed(2)}`)
    .join('\n');

  const total = carrinho.reduce((acc, item) => acc + item.total, 0);
  const mensagem = encodeURIComponent(
    `Olá! Gostaria de montar o seguinte kit:\n\n${pedido}\n\nTotal: R$${total.toFixed(2)}`
  );

  const url = `https://wa.me/${numero}?text=${mensagem}`;
  window.open(url, '_blank');
}

function mostrarCategoria(categoriaId) {
  // Esconde todas as categorias
  document.querySelectorAll('.categoria').forEach(cat => {
    cat.style.display = 'none';
  });

  // Mostra só a categoria clicada
  const ativa = document.getElementById(categoriaId);
  if (ativa) {
    ativa.style.display = 'block';
  }

  // Atualiza os botões de aba
  document.querySelectorAll('.abas button').forEach(botao => {
    botao.classList.remove('ativa');
  });

  const botaoAtivo = document.querySelector(`.abas button[onclick="mostrarCategoria('${categoriaId}')"]`);
  if (botaoAtivo) {
    botaoAtivo.classList.add('ativa');
  }
}
