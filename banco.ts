class Conta {
    numero: string;
    saldo: number;

    constructor(numero: string, saldo: number){
        this.numero = numero;
        this.saldo = saldo;
    }

    sacar(valor: number): boolean{
        if (this.saldo - valor >= 0) {
            this.saldo = this.saldo - valor;
            return true;
        } else {
            return false;
        }
    }

    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    transferir(contaDestino: Conta, valor: number): boolean{
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        } else {
            return false;
        }
    }
}

class Banco {
    contas: Conta[] = [];

    inserir(conta: Conta): void {
        let c = this.consultar(conta.numero);
        if(c == null){
            this.contas.push(conta);

        }
    }

    consultar(numero: string): Conta {
        let contaProcurada!: Conta;
        for (let c of this.contas) {
            if (c.numero == numero) {
            contaProcurada = c;
            break;
            }
        }
        return contaProcurada;
    }

    consultarIndice(numero: string): number {
        let indice: number = -1;
        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
            indice = i;
            break;
            }
        }
        return indice;
    }


    alterar(c: Conta): void {
        let indice = this.consultarIndice(c.numero);

        if (indice != -1) {
            this.contas[indice] = c;
        }
    }

    excluir(numero: string): void {
        let indice: number = this.consultarIndice(numero);
        if (indice != -1) {
            for (let i: number = indice; i < this.contas.length; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }

    sacar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        if (conta != null) {
            conta.sacar(valor)
        }
    }
    depositar(numero: string, valor: number) {
        let conta: Conta = this.consultar(numero);
        if (conta != null) {
            conta.depositar(valor);
        }
    }
    transfeir(numeroOrigem: string, numeroDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultar(numeroOrigem);
        let contaDestino: Conta = this.consultar(numeroDestino);

        if (contaOrigem != null && contaDestino != null) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }

    contarContas(): number {
        return this.contas.length;
    }

    somaSaldos(): number {
        let soma: number = 0;
        for (let i = 0; i < this.contas.length; i++) {
            soma += this.contas[i].saldo; 
        }
        return soma;
    }

    calcularMedia(): number {
        return this.somaSaldos()/this.contarContas();
    }
}

export {Banco, Conta};