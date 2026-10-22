export {};

declare global {
  interface String {
    padStart(tamanho: number, preenchimento?: string): string;
  }
}

const nomeDigitado: string = ' maria da silva ';

function formatarNome(nome: string): string {
  const preposicoes = ['da', 'de', 'do'];
  const palavras = nome.trim().split(' ').filter((palavra) => palavra !== '');

  return palavras
    .map((palavra) => {
      const palavraMinuscula = palavra.toLowerCase();
      if (preposicoes.indexOf(palavraMinuscula) >= 0) {
        return palavraMinuscula;
      }
      return palavraMinuscula.charAt(0).toUpperCase() + palavraMinuscula.slice(1);
    })
    .join(' ');
}

const precoLido = '12.40';
const quantidadeLida = '3un';
const preco = Number(precoLido);
const quantidade = parseInt(quantidadeLida, 10);
const clienteFidelidade: boolean = true;

const subtotal = preco * quantidade;
const desconto = clienteFidelidade ? subtotal * 0.05 : 0;
const total = subtotal - desconto;
const numeroCupom = String(42).padStart(6, '0');

const cupom = `CUPOM Nº ${numeroCupom}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${total.toFixed(2)}`;

console.log(cupom);
