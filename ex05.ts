export {};

type Leitura = [cidade: string, temperatura: number];

const leituras: Leitura[] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29],
];

function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

const temperaturas = leituras.map(([, temperatura]) => temperatura);
const [minima, maxima] = extremos(temperaturas);

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

type ContatoImprensa = [nome: string, telefone: string, email?: string];
const contatoComEmail: ContatoImprensa = ['Marina', '(69) 3333-1111', 'marina@noticias.com'];
const contatoSemEmail: ContatoImprensa = ['Roberto', '(69) 3333-2222'];

const historicoSemanal: [string, ...number[]] = [
  'Porto Velho',
  ...temperaturas,
];
const [, ...temperaturasDaSemana] = historicoSemanal;
const media = temperaturasDaSemana.reduce((soma, temp) => soma + temp, 0)
  / temperaturasDaSemana.length;

const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[1] = 'Manaus'; // TS2540: Cannot assign to '1' because it is a read-only property.
void contatoComEmail;
void contatoSemEmail;
void capitalOficial;

console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);
