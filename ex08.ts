export {};

declare global {
  interface String {
    padStart(tamanho: number, preenchimento?: string): string;
  }
}

let codigo: number | string = 42;

function formatarCodigo(c: number | string): string {
  if (typeof c === 'number') {
    return `CLI-${String(c).padStart(4, '0')}`;
  }

  const numero = c.replace(/\D/g, '');
  return `CLI-${numero.padStart(4, '0')}`;
}

type TamanhoCamiseta = 'P' | 'M' | 'G' | 'GG';
let tamanho: TamanhoCamiseta = 'M';
// tamanho = 'XG'; // TS2322: Type '"XG"' is not assignable to type 'TamanhoCamiseta'.

type Regiao = 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul';

function calcularFrete(regiao: Regiao): number {
  const valores: { [chave in Regiao]: number } = {
    norte: 25,
    nordeste: 20,
    'centro-oeste': 18,
    sudeste: 12,
    sul: 15,
  };
  return valores[regiao];
}

const complemento: string | null = null;
const complementoExibido = complemento === null ? '(sem complemento)' : complemento;

function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, '');
}

const r = 'sul';
calcularFrete(r);
// const mantém o tipo literal 'sul', por isso r é aceito. Em `let r2 = 'sul'`, o tipo inferido
// seria string, que também permitiria valores fora de Regiao e não poderia ser passado à função.
let r2 = 'sul' as const;
calcularFrete(r2);

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${tamanho}`);
console.log(`Entrega: Rua das Flores, 100 - ${complementoExibido}`);
console.log(`Frete para o sul: R$ ${calcularFrete(r).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
