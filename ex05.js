const leituras = [
    ['Porto Velho', 34],
    ['Curitiba', 12],
    ['Manaus', 31],
    ['Porto Alegre', 9],
    ['Natal', 29],
];
function extremos(temps) {
    return [Math.min(...temps), Math.max(...temps)];
}
const temperaturas = leituras.map(([, temperatura]) => temperatura);
const [minima, maxima] = extremos(temperaturas);
for (const [cidade, temp] of leituras) {
    console.log(`${cidade}: ${temp}°C`);
}
const contatoComEmail = ['Marina', '(69) 3333-1111', 'marina@noticias.com'];
const contatoSemEmail = ['Roberto', '(69) 3333-2222'];
const historicoSemanal = [
    'Porto Velho',
    ...temperaturas,
];
const [, ...temperaturasDaSemana] = historicoSemanal;
const media = temperaturasDaSemana.reduce((soma, temp) => soma + temp, 0)
    / temperaturasDaSemana.length;
const capitalOficial = ['RO', 'Porto Velho'];
// capitalOficial[1] = 'Manaus'; // TS2540: Cannot assign to '1' because it is a read-only property.
void contatoComEmail;
void contatoSemEmail;
void capitalOficial;
console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);
export {};
