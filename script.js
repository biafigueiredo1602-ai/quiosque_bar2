<script>
function carregarPedidos() {
    let lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if (pedidos.length === 0) {
        lista.innerHTML = "<p>Sem pedidos.</p>";
        return;
    }

    pedidos.forEach((pedido, index) => {

        let div = document.createElement("div");

        let html = `
            <h3>Pedido #${pedido.numero}</h3>
            <p>Total: ${pedido.total.toFixed(2)}€</p>
        `;

        pedido.itens.forEach(item => {
            html += `<p>• ${item.nome} (${item.preco.toFixed(2)}€)</p>`;
        });

        html += `<button onclick="removerPedido(${index})">🗑️ Concluir</button><hr>`;

        div.innerHTML = html;
        lista.appendChild(div);
    });
}

function removerPedido(index) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.splice(index, 1);

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    carregarPedidos();
}

carregarPedidos();
</script>
