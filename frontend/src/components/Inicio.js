import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './../registerServiceWorker';

export default class Inicio extends Component {
  constructor(props) {
    super(props);

    this.procesarArchivo = this.procesarArchivo.bind(this);
  }

  componentDidMount(){

  }

  procesarArchivo(event)
  {
    var texto = event.target.value;
    var obj = JSON.parse(texto)
      .then((texto)=>{
        console.log(texto);
        // this.divTarget.value = JSON.stringify(obj,null, 2);
      })
      .catch((err)=>{
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div>
          Escriba el json que desea cargar
        </div>
        <textarea cols='40' rows='20' onChange={this.procesarArchivo} ref={(div) => this.divTarget = div} >
          Acá va el primer intento de json
        </textarea>
        <button onClick={this.procesarArchivo}>Cargar</button>
      </div>

    );
  }
}


registerServiceWorker();