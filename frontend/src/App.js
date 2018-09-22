import React, {Component} from 'react';
import './style/App.css';
import CrearTabla from './components/CrearTabla';
import Navbar from './components/Navbar';
import ListaTablas from './components/ListaTablas';
import Tablas from './components/Tabla';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: 'inicio',
      table:'',
      archivoJson: {}
    };
    this.callbackTable = this.callbackTable.bind(this);
    this.callbackNavbar = this.callbackNavbar.bind(this);
  }

  callbackNavbar(value) {
    this.setState({location: value});
  }

  callbackTable(value) {
    this.setState({table: value});
  }

  render() {

    let navbar = <Navbar onChange={this.callbackNavbar}/>

    return (
      <div className="App">
        <Router>
          <div>
            <div>
              {navbar}
            </div>
            <div>
              <Route exact path="/crear" component={ ()=>(
                <CrearTabla onChange={this.callbackNavbar} />
              )}/>
              <Route exact path="/" component={ ()=>(
                <ListaTablas onChange={this.callbackNavbar} onTableClick={this.callbackTable} />
              )}/>
              <Route exact path="/tabla/:id" component={ ()=>(
                <Tablas idTable = {this.state.table} props={this.props}/>
              )}/>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
