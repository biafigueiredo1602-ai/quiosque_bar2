function mostrarCategoria(categoria) { 

    let div = document.getElementById("produtos"); 

 

    if (categoria === "padaria") { 

        div.innerHTML = ` 

            <button onclick="addProduto('🥪Tosta Mista', 0.80)"> 

                🥪 Tosta Mista - 0.80€ 

            </button> 

 

            <button onclick="addProduto('🍞 Torrada', 1.00)"> 

                🍞 Torrada - 1.00€ 

            </button> 

            

             <button onclick="addProduto('🥪Pão com Fiambre', 0.50)"> 

                🥪 Pão com Fiambre - 0.50€ 

            </button> 

 

             <button onclick="addProduto('🥪Pão com Queijo', 0.50)"> 

                🥪 Pão com Queijo - 0.50€ 

            </button> 

 

             <button onclick="addProduto('🧈 Pão com Manteiga', 0.50)"> 

                🧈 Pão com Manteiga - 0.50€ 

            </button> 

 

             <button onclick="addProduto('🥖Pão', 0.10)"> 

                🥖 Pão - 0.10€ 

            </button> 

 

            <button onclick="addProduto('🍞Meia Torrada', 0.50)"> 

                🍞 Meia Torrada - 0.50€ 

            </button> 

        `; 

    } 

   if (categoria === "bebidas") { 

        div.innerHTML = ` 

            <button onclick="addProduto('💧Água 0.30', 0.20)"> 

                💧 Água 0,3L - 0.20€ 

 

            </button><button onclick="addProduto('💧Água 0,5l', 0.50)"> 

                💧 Água 0,5L - 0,50 € 

            </button> 

 

            <button onclick="addProduto('💧 Água 1,5l', 1.00)"> 

                💧Água 1,5l - 1.00€ 

            </button> 

 

            <button onclick="addProduto('🍹Néctar Laranja', 0.40)"> 

                🍹 Néctar Laranja - 0.40€ 

            </button> 

 

            <button onclick="addProduto('🍹Néctar Tutti Fruti', 0.40)"> 

                🍹 Néctar Tutti Fruti - 0.40€ 

            </button> 

 

            <button onclick="addProduto('🍹 Néctar Frutos Vermelhos', 0.40)"> 

                🍹 Néctar Frutos Fruti - 0.40€ 

            </button> 

        `; 

    } 

    if (categoria === "aperitivos") { 

        div.innerHTML = ` 

            <button onclick="addProduto('🍪 Bolacha Maria', 0.80)"> 

                🍪 Bolacha Maria - 0.80€ 

            </button> 

 

            <button onclick="addProduto('🥨 Bolacha água&sal', 0.20)"> 

                🥨 Bolacha água&sal - 0.20€ 

            </button> 

 

            <button onclick="addProduto('🧁 Queques', 0.80)"> 

                🧁 Queques - 0.80€ 

            </button> 

 

            <button onclick="addProduto('🍫 Barrinha de chocolate', 1.00)"> 

                🍫 Barrinha de chocolate - 1.00€ 

            </button> 

 

            <button onclick="addProduto('🥧Tarte Maçã', 0.90)"> 

                🥧 Tarte Maçã - 0.90€ 

            </button> 

        `; 

    } 

} 

 

let baseDados = { 

    "12801": { nome: "Bea", saldo: 5.00 }, 

    "12802": { nome: "Jéssica", saldo: 2.50 }, 

    "12803": { nome: "Matilde", saldo: 10.00 } 

}; 

let carrinho = []; //lista de carrinho 

let total = 0; 

 

function addProduto(nome, preco, botao) {

    carrinho.push({ nome, preco });
    total += preco;
    atualizarCarrinho();

    // remover seleção dos outros
    let botoes = document.querySelectorAll("#produtos button");
    botoes.forEach(b => b.classList.remove("ativo"));

    // adicionar seleção ao clicado
    botao.classList.add("ativo");
}

 

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

function finalizarPedido() { 

    let numeroPedido = Math.floor(Math.random() * 1000); 

 

    let pedido = { 

        numero: numeroPedido, 

        itens: carrinho, 

        total: total 

    }; 

 

    // buscar pedidos antigos 

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []; 

 

    // adicionar novo pedido 

    pedidos.push(pedido); 

 

    // guardar 

    localStorage.setItem("pedidos", JSON.stringify(pedidos)); 

 

    alert("Pedido feito! Número: " + numeroPedido); 

 

    carrinho = []; 

    total = 0; 

    atualizarCarrinho(); 

} 

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

 

    if (total > aluno.saldo) { 

        alert("Saldo insuficiente!"); 

        return; 

    } 

 

    aluno.saldo -= total; 

 

    alert("Pagamento feito! Saldo restante: " + aluno.saldo.toFixed(2) + "€"); 

 

    finalizarPedido(); 

} 

 

 