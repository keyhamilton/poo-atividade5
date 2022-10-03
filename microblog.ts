class Postagem {
    id: number;
    texto: string;
    quantidadeCurtidas: number = 0;

    constructor(id: number, texto: string){
        this.id = id;
        this.texto = texto;
    }

    curtir(): void {
        this.quantidadeCurtidas += 1;
    }

    toString(): string {
        return `
        Postagem ${this.id}:
        ${this.texto}
        ${this.quantidadeCurtidas} curtidas`
    }
}

class Microblog {
    postagens: Postagem[] = [];

    consultarIndice(id: number): number {
        let indice = -1;
        this.postagens.forEach((postagem, index) =>{
            if (postagem.id == id) {
                indice = index;
            }
        })
        return indice;
    }

    incluir(postagem: Postagem): void {
        this.postagens.push(postagem);
    }

    excluir(id: number): void {
        let indice = this.consultarIndice(id);
        if (indice != -1) {
            for(let i: number = indice; i < this.postagens.length; i++){
                this.postagens[i] = this.postagens[i+1];
            }
            this.postagens.pop();
        }
    }

    maisCurtida(): Postagem[] {
        let maior: number = 0;
        let arr: Postagem[] = [];
        this.postagens.filter((elemento)=>{
            if(elemento.quantidadeCurtidas > maior){
                maior = elemento.quantidadeCurtidas;
                arr[0] = elemento;
            }
        })
        return arr;
    }

    curtir(id: number): void {
        let indice = this.consultarIndice(id);
        if (indice != -1) {
            this.postagens[indice].curtir();
        }
    }

    toString(): string {
        let str: string = '';
        for(let i = 0; i < this.postagens.length; i++){
            str += this.postagens[i].toString() + '\n';
        }
        return str;
    }
}

export {Postagem, Microblog};