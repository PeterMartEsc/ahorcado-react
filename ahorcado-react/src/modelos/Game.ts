export default class Game {

    public palabra : string = "";
    public countErrores : number = 0;
    public resultado : string[] = [];
    public letrasUsadas : string[] = [];
    
    public readonly palabras : string[] = [
        "perro",
        "gato",
        "caballo",
        "conejo",
        "pez",
        "oso",
        "elefante",
        "pajaro",
        "oveja",
        "canario",
        "zorro",
        "cabra",
        "oveja",
        "ciervo",
        "murcielago"
    ]


    /**
     * ARRAY PARA GUARDRALAS LETRAS ENVIADAS
     * ERORRES CONTADOR
     * 
     * comprobarLetra
     *  
     * 
     */
    constructor(){
        this.generarPalabraAleatoria();
        this.setResultado();
    }

    public generarPalabraAleatoria(){
        const indice = Math.floor(Math.random() * this.palabras.length);
        this.palabra = this.palabras[indice];
    }

    public setResultado(){
        this.resultado = Array(this.palabra.length).fill('_');
    }

    public comprobarLetra(letra : string){
        
        if(this.letrasUsadas.includes(letra)){
            return;
        }

        if(this.palabra.includes(letra)){
            for(let i = 0 ; i<this.palabra.length ; i++){
                if(this.palabra[i] === letra){
                    this.resultado[i] = letra;
                }   
            }
        } else {
            this.countErrores++;
        }

        this.letrasUsadas.push(letra);
    }

    public comprobarFinal() : boolean {

        if(this.resultado.includes('_')){
            return false;
        }

        return true;
    }


}