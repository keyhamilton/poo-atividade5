import prompt from "prompt-sync";
import {Conta, Banco} from './banco';


let input = prompt();
let banco = new Banco();
let opcao: string = '';

do {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - Cadastrar 2 - Consultar 3 - Sacar\n' +
                '4 - Depositar 5 - Excluir 6 - Transferir\n' +
                '7 – Totalizações\n' +
                '0 - Sair\n');
    opcao = input("Opção:");   
    switch (opcao) {
        case "1":
            inserir();
            break;
        case "2":
            consultar();
            break;
        case "3":
            sacar();
            break;
        case "4":
            depositar();
            break;
        case "5":
            excluir();
            break;
        case "6":
            transferir();
            break;
        case "7":
            totalizacao();
            break;
    }

        input("Operação finalizada. Digite <enter>");         
} while (opcao != '0');
console.log("Aplicação encerrada");

function inserir(): void {
    console.log("\nCadastrar conta\n");
    let numero: string = input('Digite o número da conta:');
    let conta: Conta;
    conta = new Conta(numero, 0);
    banco.inserir(conta);
}

function consultar(): void {
    console.log("\nConsultar conta\n");
    let numero: string = input('Digite o número da conta para consulta:');
    let conta: Conta = banco.consultar(numero);
    if (conta != null) {
        console.log(`Saldo atual: ${conta.consultarSaldo()}`);
        
    } else {
        console.log('Conta não existe');
        
    }

}

function sacar(): void {
    console.log("\nSacar\n");
    let numero: string = input('Digite o número da conta:');
    let valor: number = parseInt(input('Digite o valor a sacar:'));
    banco.sacar(numero, valor);
    
}

function depositar(): void {
    console.log("\nDepositar\n");
    let numero: string = input('Digite o número da conta:');
    let valor: number = parseInt(input('Digite o valor a depositar:'));
    banco.depositar(numero, valor);
}

function excluir(): void {
    console.log("\nExcluir\n");
    let numero: string = input('Digite o número da conta:');
    banco.excluir(numero);
}

function transferir(): void {
    console.log("\nTransferir\n");
    let numeroOrigem: string = input('Digite o número da conta origem:');
    let numeroDestino: string = input('Digite o número da conta destino:');
    let valor: number = parseInt(input('Digite o valor a depositar:'));
    banco.transfeir(numeroOrigem, numeroDestino, valor);

}

function totalizacao(): void {
    console.log(`${banco.contarContas()} contas no banco`);
    console.log(`${banco.somaSaldos()} R$ de balanço total`);
    console.log(`${banco.calcularMedia()} R$ saldo médio das contas`);
    
    
}