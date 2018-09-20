import React, {Component} from 'react';
import './App.css';
import Inicio from './components/Inicio';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: 'inicio',
      archivoJson: {}
    };
  }

  render() {

    let inicio;
    
    if (this.state.location==='inicio'){
      inicio = <Inicio/>;
    }

    return (
      <div className="App">
        {inicio}
      </div>
    );
  }
}

export default App;
