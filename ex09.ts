export {};

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

function lerComAny(json: string): void {
  const dados: any = JSON.parse(json);
  console.log(dados.temperatura.toFixed(1));
}

// lerComAny(respostaQuebrada);
// Erro em execução: TypeError: dados.temperatura.toFixed is not a function.
// O tipo any permite a chamada e impede o compilador de detectar esse problema.
void lerComAny;

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerClima(json: string): { cidade: string; temperatura: number } {
  let dados: unknown;

  try {
    dados = JSON.parse(json) as unknown;
  } catch {
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

function testarResposta(json: string): void {
  try {
    const clima = lerClima(json);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    } else {
      console.log('Erro desconhecido');
    }
  }
}

testarResposta(respostaOk);
testarResposta(respostaQuebrada);
testarResposta(respostaInvalida);
