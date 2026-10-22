// type Van = { readonly placa: Placa; tipo: 'van'; passageiros: number };
// type VeiculoComVan = Veiculo | Van;
// Se calcularTarifa recebesse VeiculoComVan sem um case para 'van', a linha
// `const _naoTratado: never = v` daria TS2322: Type 'Van' is not assignable to type 'never'.
// Assim, never garante que todos os integrantes da união sejam tratados pelo switch.
var SituacaoTicket;
(function (SituacaoTicket) {
    SituacaoTicket["Aberto"] = "ABERTO";
    SituacaoTicket["Pago"] = "PAGO";
})(SituacaoTicket || (SituacaoTicket = {}));
function calcularTarifa(v, horas) {
    const horasCobradas = Math.max(1, horas);
    switch (v.tipo) {
        case 'carro':
            return 8 + (horasCobradas - 1) * 5;
        case 'moto':
            return 4 + (horasCobradas - 1) * 2;
        case 'caminhao':
            return 15 + (horasCobradas - 1) * 10;
        default: {
            const _naoTratado = v;
            return _naoTratado;
        }
    }
}
function fecharTicket(t) {
    const [entrada, saida] = t.periodo;
    const horas = Math.max(1, saida - entrada);
    const tarifa = calcularTarifa(t.veiculo, horas);
    const valor = t.selo ? tarifa * 0.5 : tarifa;
    return {
        ...t,
        situacao: SituacaoTicket.Pago,
        valor,
    };
}
function registrar(msg) {
    console.log(msg);
}
function falhar(mensagem) {
    throw new Error(mensagem);
}
function lerVeiculo(json) {
    let dado;
    try {
        dado = JSON.parse(json);
    }
    catch {
        return falhar('JSON malformado');
    }
    if (typeof dado !== 'object'
        || dado === null
        || !('placa' in dado)
        || typeof dado.placa !== 'string'
        || !('tipo' in dado)
        || typeof dado.tipo !== 'string') {
        return falhar('dados do veículo inválidos');
    }
    if (dado.tipo === 'carro') {
        if (!('portas' in dado) || (dado.portas !== 2 && dado.portas !== 4)) {
            return falhar('quantidade de portas inválida');
        }
        return { placa: dado.placa, tipo: 'carro', portas: dado.portas };
    }
    if (dado.tipo === 'moto') {
        if (!('cilindradas' in dado) || typeof dado.cilindradas !== 'number') {
            return falhar('cilindradas inválidas');
        }
        return { placa: dado.placa, tipo: 'moto', cilindradas: dado.cilindradas };
    }
    if (dado.tipo === 'caminhao') {
        if (!('eixos' in dado) || typeof dado.eixos !== 'number') {
            return falhar('quantidade de eixos inválida');
        }
        return { placa: dado.placa, tipo: 'caminhao', eixos: dado.eixos };
    }
    return falhar(`tipo "${dado.tipo}" desconhecido`);
}
const veiculosJson = [
    '{"placa":"ABC1D23","tipo":"carro","portas":4}',
    '{"placa":"MOT0A12","tipo":"moto","cilindradas":160}',
    '{"placa":"CAM9Z99","tipo":"caminhao","eixos":3}',
    '{"placa":"XYZ4E56","tipo":"carro","portas":2}',
];
const periodos = [[8, 11], [9, 10], [7, 12], [14, 16]];
const selos = [false, false, false, true];
const tickets = veiculosJson.map((json, indice) => ({
    veiculo: lerVeiculo(json),
    periodo: periodos[indice],
    selo: selos[indice],
    situacao: SituacaoTicket.Aberto,
}));
const ticketsFechados = tickets.map(fecharTicket);
const ticketsPagos = ticketsFechados.filter((ticket) => ticket.situacao === SituacaoTicket.Pago);
ticketsPagos.forEach((ticket) => {
    const horas = Math.max(1, ticket.periodo[1] - ticket.periodo[0]);
    const informacaoSelo = ticket.selo ? ' (selo -50%)' : '';
    registrar(`[${ticket.situacao}] ${ticket.veiculo.placa} (${ticket.veiculo.tipo}) - ${horas}h - R$ ${ticket.valor.toFixed(2)}${informacaoSelo}`);
});
const faturamento = ticketsPagos.reduce((soma, ticket) => soma + (ticket.valor ?? 0), 0);
const entradas = tickets.reduce((contagem, ticket) => {
    contagem[ticket.veiculo.tipo] += 1;
    return contagem;
}, { carro: 0, moto: 0, caminhao: 0 });
registrar(`Faturamento: R$ ${faturamento.toFixed(2)}`);
registrar(`Entradas: carro=${entradas.carro}, moto=${entradas.moto}, caminhao=${entradas.caminhao}`);
try {
    lerVeiculo('{"placa":"BIC1A23","tipo":"bicicleta"}');
}
catch (erro) {
    if (erro instanceof Error) {
        registrar(`Erro ao ler veículo: ${erro.message}`);
    }
}
export {};
