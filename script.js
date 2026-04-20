function mostrarCategoria(categoria) { 
    let div = document.getElementById("produtos"); 

    if (categoria === "padaria") { 
        div.innerHTML = ` 
            <button onclick="addProduto('🥪 Tosta Mista', 0.80, this)">🥪 Tosta Mista - 0.80€</button>
            <button onclick="addProduto('🍞 Torrada', 1.00, this)">🍞 Torrada - 1.00€</button>
            <button onclick="addProduto('🥪 Pão com Fiambre', 0.50, this)">🥪 Pão com Fiambre - 0.50€</button>
            <button onclick="addProduto('🥪 Pão com Queijo', 0.50, this)">🥪 Pão com Queijo - 0.50€</button>
            <button onclick="addProduto('🧈 Pão com Manteiga', 0.50, this)">🧈 Pão com Manteiga - 0.50€</button>
            <button onclick="addProduto('🥖 Pão', 0.10, this)">🥖 Pão - 0.10€</button>
            <button onclick="addProduto('🍞 Meia Torrada', 0.50, this)">🍞 Meia Torrada - 0.50€</button>
        `; 
    } 

    if (categoria === "bebidas") { 
        div.innerHTML = ` 
            <button onclick="addProduto('💧 Água 0.3L', 0.20, this)">💧 Água 0.3L - 0.20€</button>
            <button onclick="addProduto('💧 Água 0.5L', 0.50, this)">💧 Água 0.5L - 0.50€</button>
            <button onclick="addProduto('💧 Água 1.5L', 1.00, this)">💧 Água 1.5L - 1.00€</button>
            <button onclick="addProduto('🍹 Néctar Laranja', 0.40, this)">🍹 Néctar Laranja - 0.40€</button>
            <button onclick="addProduto('🍹 Néctar Tutti Fruti', 0.40, this)">🍹 Néctar Tutti Fruti - 0.40€</button>
            <button onclick="addProduto('🍹 Néctar Frutos Vermelhos', 0.40, this)">🍹 Néctar Frutos Vermelhos - 0.40€</button>
        `; 
    } 

    if (categoria === "aperitivos") { 
        div.innerHTML = ` 
            <button onclick="addProduto('🍪 Bolacha Maria', 0.80, this)">🍪 Bolacha Maria - 0.80€</button>
            <button onclick="addProduto('🥨 Bolacha água&sal', 0.20, this)">🥨 Bolacha água&sal - 0.20€</button>
            <button onclick="addProduto('🧁 Queques', 0.80, this)">🧁 Queques - 0.80€</button>
            <button onclick="addProduto('🍫 Barrinha de chocolate', 1.00, this)">🍫 Barrinha - 1.00€</button>
            <button onclick="addProduto('🥧 Tarte Maçã', 0.90, this)">🥧 Tarte Maçã - 0.90€</button>
        `; 
    } 
} 

// BASE DE DADOS
let baseDados = { 
    "12801": { nome: "Bea", saldo: 5.00 }, 
    "12802": { nome: "Jéssica", saldo: 2.50 }, 
    "12803": { nome: "Matilde", saldo: 10.00 } 
}; 

let carrinho = []; 
let total = 0; 

// ADICIONAR PRODUTO
function addProduto(nome, preco, botao) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarCarrinho();

    let botoes = document.querySelectorAll("#produtos button");
    botoes.forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() { 
    let lista = document.getElementById("carrinho"); 
    lista.innerHTML = ""; 

    carrinho.forEach(item => { 
        let li = document.createElement("li"); 
        li.textContent = item.nome + " - " + item.preco.toFixed(2) + "€"; 
        lista.appendChild(li); 
    }); 

    document.getElementById("total").textContent = total.toFixed(2); 
} 

// GUARDAR PEDIDO
function finalizarPedido() { 

    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    let numeroPedido = Math.floor(Math.random() * 1000); 

    let pedido = { 
        numero: numeroPedido, 
        itens: [...carrinho], // ✅ cópia REAL
        total: total 
    }; 

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []; 

    pedidos.push(pedido); 

    localStorage.setItem("pedidos", JSON.stringify(pedidos)); 

    alert("Pedido feito! Número: " + numeroPedido); 
}
// MOSTRAR SALDO
function mostrarSaldo() {
    let numeroCartao = document.getElementById("cartao").value;
    let aluno = baseDados[numeroCartao];
    let info = document.getElementById("infoAluno");

    if (aluno) {
        info.textContent = "Aluno: " + aluno.nome + 
        " | Saldo: " + aluno.saldo.toFixed(2) + "€";
    } else {
        info.textContent = "Cartão não reconhecido";
    }
}

// PAGAR
function pagar() { 

    let numeroCartao = document.getElementById("cartao").value; 

    if (numeroCartao === "") { 
        alert("Passe o cartão!"); 
        return; 
    } 

    let aluno = baseDados[numeroCartao]; 

    if (!aluno) { 
        alert("Cartão não reconhecido!"); 
        return; 
    } 

    if (aluno.saldo < total) { 
        alert("Saldo insuficiente!"); 
        return; 
    } 

    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    aluno.saldo -= total; 

    finalizarPedido();

    // ✅ limpar SÓ aqui
    carrinho = [];
    total = 0;
    atualizarCarrinho();

    alert("Pagamento feito!");
}
