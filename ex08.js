let codigo = 42;
function formatarCodigo(c) {
    if (typeof c === 'number') {
        return `CLI-${String(c).padStart(4, '0')}`;
    }
    const numero = c.replace(/\D/g, '');
    return `CLI-${numero.padStart(4, '0')}`;
}
let tamanho = 'M';
function calcularFrete(regiao) {
    const valores = {
        norte: 25,
        nordeste: 20,
        'centro-oeste': 18,
        sudeste: 12,
        sul: 15,
    };
    return valores[regiao];
}
const complemento = null;
const complementoExibido = complemento === null ? '(sem complemento)' : complemento;
function limparTelefone(tel) {
    return String(tel).replace(/\D/g, '');
}
const r = 'sul';
calcularFrete(r);
// const mantém o tipo literal 'sul', por isso r é aceito. Em `let r2 = 'sul'`, o tipo inferido
// seria string, que também permitiria valores fora de Regiao e não poderia ser passado à função.
let r2 = 'sul';
calcularFrete(r2);
console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${tamanho}`);
console.log(`Entrega: Rua das Flores, 100 - ${complementoExibido}`);
console.log(`Frete para o sul: R$ ${calcularFrete(r).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
export {};
