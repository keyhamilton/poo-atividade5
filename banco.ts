class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero: string, saldo: number){
        this._numero = numero;
        this._saldo = saldo;
    }

    sacar(valor: number): boolean{
        if (this._saldo - valor >= 0) {
            this._saldo = this._saldo - valor;
            return true;
        } else {
            return false;
        }
    }

    depositar(valor: number): void {
        this._saldo = this._saldo + valor;
    }

    get consultarSaldo(): number {
        return this._saldo;
    }

    get consultarNumero(): string {
        return this._numero;
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
    private _contas: Conta[] = [];

    public inserir(conta: Conta): void {
        let c = this.consultar(conta.consultarNumero);
        if(c == null){
            this._contas.push(conta);

        }
    }

    public consultar(numero: string): Conta {
        let contaProcurada!: Conta;
        for (let c of this._contas) {
            if (c.consultarNumero == numero) {
            contaProcurada = c;
            break;
            }
        }
        return contaProcurada;
    }

    private consultarIndice(numero: string): number {
        let indice: number = -1;
        for (let i: number = 0; i < this._contas.length; i++) {
            if (this._contas[i].consultarNumero == numero) {
            indice = i;
            break;
            }
        }
        return indice;
    }


    public alterar(c: Conta): void {
        let indice = this.consultarIndice(c.consultarNumero);

        if (indice != -1) {
            this._contas[indice] = c;
        }
    }

    public excluir(numero: string): void {
        let indice: number = this.consultarIndice(numero);
        if (indice != -1) {
            for (let i: number = indice; i < this._contas.length; i++) {
                this._contas[i] = this._contas[i + 1];
            }
            this._contas.pop();
        }
    }

    public sacar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        if (conta != null) {
            conta.sacar(valor)
        }
    }
    public depositar(numero: string, valor: number) {
        let conta: Conta = this.consultar(numero);
        if (conta != null) {
            conta.depositar(valor);
        }
    }

    public transfeir(numeroOrigem: string, numeroDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultar(numeroOrigem);
        let contaDestino: Conta = this.consultar(numeroDestino);

        if (contaOrigem != null && contaDestino != null) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }

    public contarContas(): number {
        return this._contas.length;
    }

    public somaSaldos(): number {
        let soma: number = 0;
        for (let i = 0; i < this._contas.length; i++) {
            soma += this._contas[i].consultarSaldo; 
        }
        return soma;
    }

    public calcularMedia(): number {
        return this.somaSaldos()/this.contarContas();
    }
}

export {Banco, Conta};