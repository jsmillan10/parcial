import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/App.css';
import '../style/ListaTablas.css';
import {Container, Row, Col} from 'reactstrap';
import registerServiceWorker from './../registerServiceWorker';

export default class ListaTablas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graficas: []
    };
  }

  componentDidMount() {

    fetch('/graficas/', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    })
      .then((json) => {
        console.log(json);
        this.setState({graficas: json});
      })
      .catch((error) => console.log(error));
  }

  handleClick(grafica){
    localStorage.setItem('idGrafica', grafica);
  }

  cargarTablas() {
    return this.state.graficas.map((grafica) => (
      <Col key={'grafica_' + grafica._id} className="md=6">
        <a onClick={this.handleClick.bind(this, grafica._id)} href={'/tabla/' + grafica._id}>
          <div className='card'>
            <div className="card-header text-center">{grafica.autor}</div>
            <div className='card-body'>
              <p className='card-text'>TimeStamp {new Date().toDateString()}</p>
            </div>
          </div>
        </a>
      </Col>
    ));
  }

  render() {
    return (
      <div>
        <div className='container-fluid'>
          <Container id={'contenedor_principal'}>
            <div className='card mb-3'>
              <div className='card-header text-center title'>
                <h4>Lista de gráficas</h4>
              </div>
              <img className='card-img-top' src={require('./../img/fondo.png')} alt='Card image cap'/>
              <div className='card-body'>
                <h5 className='card-title'>Visualiza aquí la lista completa de gráficas</h5>
                <p className='card-text'>Tienes un total de {this.state.graficas.length} Graficas.</p>
              </div>
            </div>
          </Container>
          <Row>
            {this.state.graficas.length > 0 ? this.cargarTablas() : ''}
          </Row>
        </div>
      </div>
    );
  }
}


registerServiceWorker();