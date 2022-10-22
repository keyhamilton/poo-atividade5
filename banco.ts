class Conta {
    consultarNumero(consultarNumero: any) {
        throw new Error("Method not implemented.");
    }
    private _numero: string;
    private _saldo: number;
    

    constructor(numero: string, saldo: number){
        this._numero = numero;
        this._saldo = saldo;
    }

    public sacar(valor: number): boolean{
        if (this._saldo - valor >= 0) {
            this._saldo = this._saldo - valor;
            return true;
        } else {
            return false;
        }
    }

    public depositar(valor: number): void {
        this._saldo = this._saldo + valor;
    }

    get saldo(): number {
        return this._saldo;
    }

    get numero(): string {
        return this._numero;
    }

    public transferir(contaDestino: Conta, valor: number): boolean{
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        } else {
            return false;
        }
    }
}

class Poupanca extends Conta {
    private _taxaJuros: number;

    constructor(numero: string, saldo: number, taxaJuros: number) {
        super(numero, saldo);
        this._taxaJuros = taxaJuros;
    };

    get taxaJuros(): number {
        return this._taxaJuros;
    };

    public renderJuros(): void {
        this.depositar(this.saldo * (this._taxaJuros/100))
    }
}

class ContaImposto extends Conta {
    private _taxaDesconto: number;

    constructor(numero: string, saldo: number, taxaDesconto: number) {
        super(numero, saldo);
        this._taxaDesconto = taxaDesconto;
    }

    get taxaDesconto(): number {
        return this._taxaDesconto;
    }

    public debitar(valor: number): void {
        let total = valor + valor * (this._taxaDesconto/100);
        super.sacar(total);
    }
}

class Banco {
    private _contas: Conta[] = [];

    public consultar(numero: string): Conta {
        let contaProcurada!: Conta;
        for (let c of this._contas) {
            if (c.numero == numero) {
            contaProcurada = c;
            break;
            }
        }
        return contaProcurada;
    };

    public inserir(conta: Conta): void {
        let c = this.consultar(conta.numero);
        if(c == null){
            this._contas.push(conta);

        }
    };


    private consultarIndice(numero: string): number {
        let indice: number = -1;
        for (let i: number = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
            indice = i;
            break;
            }
        }
        return indice;
    };


    public alterar(c: Conta): void {
        let indice = this.consultarIndice(c.numero);

        if (indice != -1) {
            this._contas[indice] = c;
        }
    };

    public excluir(numero: string): void {
        let indice: number = this.consultarIndice(numero);
        if (indice != -1) {
            for (let i: number = indice; i < this._contas.length; i++) {
                this._contas[i] = this._contas[i + 1];
            }
            this._contas.pop();
        }
    };

    public sacar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        if (conta instanceof ContaImposto) {
            (<ContaImposto>conta).debitar(valor)
        }
        else{
            conta.sacar(valor);
        }
    };

    public depositar(numero: string, valor: number) {
        let conta: Conta = this.consultar(numero);
        if (conta != null) {
            conta.depositar(valor);
        }
    };

    public transfeir(numeroOrigem: string, numeroDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultar(numeroOrigem);
        let contaDestino: Conta = this.consultar(numeroDestino);

        if (contaOrigem != null && contaDestino != null) {
            contaOrigem.transferir(contaDestino, valor);
        }
    };

    get contas(): number {
        return this._contas.length;
    };

    public somaSaldos(): number {
        let soma: number = 0;
        for (let i = 0; i < this._contas.length; i++) {
            soma += this._contas[i].saldo; 
        }
        return soma;
    };

    public calcularMedia(): number {
        if(this.contas) {
            return this.somaSaldos()/this.contas;
        };
        return 0;
    };

    public renderJuros(numero: string): number {
        let conta: Conta = this.consultar(numero);
        if(conta instanceof Poupanca) {
            (<Poupanca>conta).renderJuros();
            return conta.saldo;
        }
        else {
            return 0;
        }
    }

    public debitar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        if(conta instanceof ContaImposto) {
            (<ContaImposto>conta).debitar(valor)
        }
    }
}

export { Banco, Conta, Poupanca, ContaImposto };