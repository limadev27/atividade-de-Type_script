const paciente = {
    cpf: '123.456.789-00',
    nome: 'Ana Souza',
    idade: 34,
    plano: true,
    alergias: ['dipirona', 'lactose'],
    contatoEmergencia: { nome: 'Paulo Souza', telefone: '(69) 99999-1111' },
};
const pacienteSemOpcionais = {
    cpf: '987.654.321-00',
    nome: 'Carlos Lima',
    idade: 61,
    plano: false,
};
function resumo(p) {
    const informacaoAlergias = p.alergias
        ? `Alergias: ${p.alergias.join(', ')}`
        : 'Sem alergias registradas';
    return `${p.nome}, ${p.idade} anos. ${informacaoAlergias}`;
}
// paciente.cpf = '111.222.333-44'; // TS2540: Cannot assign to 'cpf' because it is a read-only property.
// paciente.peso = 65; // TS2339: Property 'peso' does not exist on type of paciente.
let dados = paciente;
// console.log(dados.nome); // TS2339: Property 'nome' does not exist on type 'object'.
// O tipo object informa apenas que o valor não é primitivo; ele não declara uma propriedade nome.
let x = 10;
// let y: object = 10; // TS2322: Type 'number' is not assignable to type 'object'.
// O tipo {} aceita qualquer valor diferente de null e undefined, inclusive números. Já object
// aceita somente valores não primitivos. O uso de void evita avisos sem alterar a saída pedida.
void dados;
void x;
console.log(resumo(paciente));
console.log(resumo(pacienteSemOpcionais));
export {};
