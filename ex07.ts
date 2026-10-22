export {};

type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return;
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(
  destinatarios: string[],
  mensagem: string,
  enviar: Notificador,
): void {
  destinatarios.forEach((destinatario) => enviar(destinatario, mensagem));
}

// function teste(): void { return 10; } // TS2322: Type 'number' is not assignable to type 'void'.

const contar: Notificador = (_destinatario, mensagem) => mensagem.length;
// Uma função que devolve um valor pode ser usada onde o retorno esperado é void. Nesse caso,
// quem chama a função por meio do tipo Notificador simplesmente ignora o número devolvido.
void contar;

const aviso = 'Reunião de pais sexta às 19h';
notificarTodos(['ana@escola.com'], aviso, porEmail);
notificarTodos(['joao.resp'], aviso, porApp);
notificarTodos(['(69) 99999-0000'], new Array(162).join('A'), porSms);
