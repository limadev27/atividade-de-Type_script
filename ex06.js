var StatusPedido;
(function (StatusPedido) {
    StatusPedido[StatusPedido["Recebido"] = 1] = "Recebido";
    StatusPedido[StatusPedido["EmPreparo"] = 2] = "EmPreparo";
    StatusPedido[StatusPedido["SaiuParaEntrega"] = 3] = "SaiuParaEntrega";
    StatusPedido[StatusPedido["Entregue"] = 4] = "Entregue";
    StatusPedido[StatusPedido["Cancelado"] = 5] = "Cancelado";
})(StatusPedido || (StatusPedido = {}));
var FormaPagamento;
(function (FormaPagamento) {
    FormaPagamento["Pix"] = "PIX";
    FormaPagamento["Cartao"] = "CARTAO";
    FormaPagamento["Dinheiro"] = "DINHEIRO";
})(FormaPagamento || (FormaPagamento = {}));
function mensagem(status) {
    switch (status) {
        case StatusPedido.Recebido:
            return 'Recebemos seu pedido!';
        case StatusPedido.EmPreparo:
            return 'Seu pedido está sendo preparado 🍳';
        case StatusPedido.SaiuParaEntrega:
            return 'O entregador está a caminho 🛵';
        case StatusPedido.Entregue:
            return 'Pedido entregue. Bom apetite!';
        case StatusPedido.Cancelado:
            return 'Pedido cancelado.';
    }
}
function avancar(status) {
    if (status === StatusPedido.Entregue || status === StatusPedido.Cancelado) {
        return status;
    }
    return status + 1;
}
let statusAtual = StatusPedido.Recebido;
while (true) {
    console.log(`[${statusAtual} - ${StatusPedido[statusAtual]}] ${mensagem(statusAtual)}`);
    if (statusAtual === StatusPedido.Entregue) {
        break;
    }
    statusAtual = avancar(statusAtual);
}
const pagamento = FormaPagamento.Pix;
// const pagamentoInvalido: FormaPagamento = 'PIX'; // TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
// Mesmo tendo o mesmo texto, o enum exige que o valor seja acessado por um de seus membros.
console.log(`Pagamento: ${pagamento}`);
export {};
