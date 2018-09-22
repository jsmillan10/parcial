import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/App.css';
import '../style/Tabla.css';
import vegaEmbed from 'vega-embed';
import {Container, Row, Col} from 'reactstrap';
import registerServiceWorker from './../registerServiceWorker';

export default class Tabla extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem('idGrafica'),
      grafica: {},
      calificaciones: [],
      calificador: '',
      puntaje: ''
    };

    this.handleCalificadorChange = this.handleCalificadorChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  guardarTexto(e) {
    e.preventDefault();
    try {
      JSON.parse(this.state.texto);
      let bodyTexto =
        {
          puntaje: this.state.puntaje,
          calificador: this.state.calificador,
        };
      fetch('graficas/' + this.state.id, {
        method: 'POST',
        body: JSON.stringify(bodyTexto),
        headers: {'Content-Type': 'application/json'}
      }).then(response => {
        console.log(response);
        if (response.status === 201) {
          alert('Grafica guardada exitosamente!');

        }
        else {
          alert('Hubo un problema al guardar, intente de nuevo');
        }
      });
    }
    catch (e) {

    }
  }

  componentDidMount() {

    fetch('/graficas/' + this.state.id, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    })
      .then((json) => {
        console.log('json', json[0]);
        this.setState({grafica: json[0]});
        try {
          let textoFino = this.state.grafica.grafica.replace(/'/g, '"');
          let yname = this.state.grafica.spec.y_name;
          let xname = this.state.grafica.spec.x_name;
          let ytype = this.state.grafica.spec.y_type;
          let xtype = this.state.grafica.spec.x_type;
          let json = JSON.parse(textoFino);
          let embed = {'mode': 'vega-lite'};
          let spec = {
            '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
            'description': 'A simple bar chart with embedded data.',
            'data': {
              'name': 'myData'
            },
            'mark': 'bar',
            'encoding': {
              'y': {'field': yname, 'type': ytype},
              'x': {'field': xname, 'type': xtype}
            }
          };
          vegaEmbed(this.targetDiv, spec, embed)
            .then((res) => res.view.insert('myData', json).run());
        }
        catch (e) {
          console.log('Problema escrito', e);
        }
      })
      .catch((error) => console.log(error));
  }

  cargarCalificaciones() {
    return this.state.grafica.calificaciones.map((calif, i) => (
      <ul key={'calif_' + i} className="list-group list-group-flush">
        <li className="list-group-item">Puntaje: {calif.puntaje}</li>
        <li className="list-group-item">Calificador: {calif.calificador}</li>
      </ul>
    ));
  }

  handleCalificadorChange(event) {
    this.setState({calificador: event.target.value});
  }

  handleQuantityChange(event) {
    this.setState({puntaje: event.target.value});
  }


  render() {
    return (
      <div>
        <div className='container-fluid'>
          <Container id={''}>
            <div className='card mb-3'>
              <div className='card-header text-center title'>
                <h4>Grafica realizada por {this.state.grafica.autor}</h4>
              </div>
              <div className='card-body'>
                <h5 className='card-title'>Visualiza aquí la gráfica generada</h5>
                <div ref={(div) => this.targetDiv = div}></div>
              </div>
              {this.state.grafica.calificaciones === undefined ? '' : this.cargarCalificaciones()}
              <p className="labelInput">Escribe tu nombre Para calificar</p>
              <input type="text" className="form-control" id="inputName" placeholder="Nombre"
                onChange={this.handleCalificadorChange}/>
              <p className='labelInput'>Elige el puntaje que le quieres dar: </p>
              <input type='number' className='form-control inputNumber' name={prod._id}
                placeholder='0' onChange={this.handleQuantityChange}/>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}


registerServiceWorker();