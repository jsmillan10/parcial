import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/Navbar.css';
import registerServiceWorker from './../registerServiceWorker';

/**
 * This class contains all needed to display the nav bar on top.
 */
export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onChange: props.onChange
    };
  }

  render() {
    return (
      <div className='fixed-top'>
        <nav id='navbar_home' className='nav navbar-light'>
          <a id='nombre_nav' className='col-md-5 navbar-brand hvr-underline-from-center' onClick={this.state.onChange.bind(this, 'Inicio')} href={'/'}>
            <img src={require('./../img/barschart.svg')} width='30' height='30' className='d-inline-block align-top' alt='logo' style={{marginRight: '10px'}}/> Visualizador de Graficas
          </a>
          <a className='nav-item nav-link col-md-3' onClick={this.state.onChange.bind(this, 'Home')} href={'/'}>Lista Graficas</a>
          <a className='nav-item nav-link col-md-3' onClick={this.state.onChange.bind(this, 'Login')} href={'/crear'}>Crea tu grafica</a>
        </nav>

      </div>
    );
  }
}


registerServiceWorker();