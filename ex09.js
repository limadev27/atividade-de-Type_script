const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';
function lerComAny(json) {
    const dados = JSON.parse(json);
    console.log(dados.temperatura.toFixed(1));
}
// lerComAny(respostaQuebrada);
// Erro em execução: TypeError: dados.temperatura.toFixed is not a function.
// O tipo any permite a chamada e impede o compilador de detectar esse problema.
void lerComAny;
function falhar(mensagem) {
    throw new Error(mensagem);
}
function lerClima(json) {
    let dados;
    try {
        dados = JSON.parse(json);
    }
    catch {
        return falhar('JSON malformado');
    }
    if (typeof dados !== 'object' || dados === null) {
        return falhar('resposta inválida');
    }
    if (!('cidade' in dados) || typeof dados.cidade !== 'string') {
        return falhar('campo "cidade" inválido');
    }
    if (!('temperatura' in dados) || typeof dados.temperatura !== 'number') {
        return falhar('campo "temperatura" inválido');
    }
    return { cidade: dados.cidade, temperatura: dados.temperatura };
}
function testarResposta(json) {
    try {
        const clima = lerClima(json);
        console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
    }
    catch (erro) {
        if (erro instanceof Error) {
            console.log(`Erro: ${erro.message}`);
        }
        else {
            console.log('Erro desconhecido');
        }
    }
}
testarResposta(respostaOk);
testarResposta(respostaQuebrada);
testarResposta(respostaInvalida);
export {};
