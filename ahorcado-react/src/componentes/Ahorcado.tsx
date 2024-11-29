import React, { useEffect, useRef, useState } from 'react'
import Game from '../modelos/Game'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/index.css'

type Props = {}

const Ahorcado = (props: Props) => {
    //UseStates de Game
    const [game, setgame] = useState<Game>(new Game());
    const [palabra, setPalabra] = useState("secreto");
    const [resultado, setResultado] = useState<string []>([]);

    const [errores, seterrores] = useState(0);
    const [letrasUsadas, setletrasUsadas] = useState<string []>([]);

    //UseStates del Ahorcado
    const [apuesta, setApuesta] = useState("");
    const [perdido, setperdido] = useState(false);
    const [terminado, setterminado] = useState(false);
    const [reiniciar, setreiniciar] = useState(false);

    //const refPartida = useRef(new Game())

    useEffect(() => {
        //Creamos nuevo game
        const newGame = new Game();
        //newGame.generarPalabraAleatoria();
        //Guardamos el game
        setgame(newGame);
        //console.log(game.palabra);
        //Actualizamos el resto de cosas
        setResultado([...newGame.resultado]);
        setletrasUsadas([...newGame.letrasUsadas]);
        seterrores(newGame.countErrores);
        setPalabra("secreto");
    
        //actualizar();
        reiniciarJuego();
        setreiniciar(false);
    }, [reiniciar])
    

    function actualizar(){
        setResultado([...game.resultado]);
        setletrasUsadas([...game.letrasUsadas]);
        seterrores(game.countErrores);
    }

    function reiniciarJuego(){
        setperdido(false);
        setterminado(false);
    }

    function comprobarApuesta(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(apuesta.length === 1){
            game.comprobarLetra(apuesta);
            actualizar();
        }

        setApuesta("");
        
        if(game.comprobarFinal() == true){
            setPalabra(game.palabra);
            setterminado(true);
        } 

        if(game.countErrores === 6){
            setperdido(true);
            setPalabra(game.palabra);
            setterminado(true);
        }  

    }

    return (
        <>
            <div className="titulo d-block justify-content-center align-items-center">
                <div className="row p-10">
                    <h4>Ahorcado: PeterMartEsc</h4>
                </div>                
            </div>
            <div className="ahorcado d-block justify-content-center align-items-center">
                <div className="row">
                    <p>Palabra acertar: {resultado.join(" ")}</p>
                </div>
                <br />
                <div className="row">
                    <div className="col-4">
                        <form onSubmit={comprobarApuesta} className='input-group'>
                            <input type="text" className='form-control' name="letra" onChange={(e)=> setApuesta(e.target.value)} value={apuesta}/>
                            <button type='submit' className='btn btn-primary'>Enviar</button>
                        </form>
                    </div>
                </div>
                <br />
                <div className="row">
                    <p>Resultado: {palabra}</p>
                    <p>
                        {
                            perdido ? "ha perdido" : "" 
                        }
                    </p>
                        {
                            terminado && <button className='btn btn-success' onClick={() => setreiniciar(true)}>Reiniciar</button>
                        }
                </div>
            </div>
        </>
    )
}

export default Ahorcado