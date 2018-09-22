import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/App.css';
import {Container, Row, Col} from 'reactstrap';
import csvParse from 'papaparse';
import vegaEmbed from 'vega-embed';
import registerServiceWorker from './../registerServiceWorker';

export default class CrearTabla extends Component {
  constructor(props) {
    super(props);

    this.state = {
      texto: '',
      embed: {},
      spec: {},
      xname: 'b',
      yname: 'a',
      xtype: 'ordinal',
      ytype: 'quantitative',
      autor: '',
      titulo: '',
      fecha: '',
      archivo: null
    };
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.procesarArchivo = this.procesarArchivo.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.procesarTextoJson = this.procesarTextoJson.bind(this);
    this.guardarTexto = this.guardarTexto.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleLateralChange = this.handleLateralChange.bind(this);
    this.handleFechaChange = this.handleFechaChange.bind(this);
    this.handleHorizontalSelectChange = this.handleHorizontalSelectChange.bind(this);
    this.handleVerticalSelectChange = this.handleVerticalSelectChange.bind(this);
    this.handleHorizontalChange = this.handleHorizontalChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    this.setState({embed: {'mode': 'vega-lite'}});

    this.setState({
      spec: {
        '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
        'description': 'A simple bar chart with embedded data.',
        'data': {
          'name': 'myData'
        },
        'mark': 'bar',
        'encoding': {
          'y': {'field': this.state.yname, 'type': this.state.ytype},
          'x': {'field': this.state.xname, 'type': this.state.xtype}
        }
      }
    });
    // Arreglo de data prueba = [
    //   {'a': 'A', 'b': 100}, {'a': 'B', 'b': 55}, {'a': 'C', 'b': 43},
    //   {'a': 'D', 'b': 91}, {'a': 'E', 'b': 81}, {'a': 'F', 'b': 53},
    //   {'a': 'G', 'b': 19}, {'a': 'H', 'b': 87}, {'a': 'I', 'b': 52}
    // ];
  }

  handleUploadFile(e) {
    this.setState({
      spec: {
        '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
        'description': 'A simple bar chart with embedded data.',
        'data': {
          'name': 'myData'
        },
        'mark': 'bar',
        'encoding': {
          'y': {'field': this.state.yname, 'type': this.state.ytype},
          'x': {'field': this.state.xname, 'type': this.state.xtype}
        }
      }
    });
    var file = e.target.files[0];
    console.log('archivo', file);
    csvParse.parse(file, {
      header: true,
      complete: (results) => {
        console.log('csv', results.data);
        this.setState({archivo: results.data});
        this.procesarArchivo();
      }
    });
  }

  procesarArchivo() {
    this.setState({
      spec: {
        '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
        'description': 'A simple bar chart with embedded data.',
        'data': {
          'name': 'myData'
        },
        'mark': 'bar',
        'encoding': {
          'y': {'field': this.state.yname, 'type': this.state.ytype},
          'x': {'field': this.state.xname, 'type': this.state.xtype}
        }
      }
    });
    try {
      console.log('Json Archivo', this.state.archivo);
      vegaEmbed(this.divTarget, this.state.spec, this.state.embed)
        .then((res) => res.view.insert('myData', this.state.archivo).run());
    }
    catch (e) {
      alert('Hubo un problema al guardar, intente de nuevo');
    }
  }

  procesarTextoJson() {
    try {
      var json = JSON.parse(this.state.texto);
      vegaEmbed(this.divTarget, this.state.spec, this.state.embed)
        .then((res) => res.view.insert('myData', json).run());
    }
    catch (e) {
      alert('Hubo un problema al guardar, intente de nuevo');
    }
  }

  guardarTexto(e) {
    e.preventDefault();
    try {
      JSON.parse(this.state.texto);
      var bodyFinal = JSON.stringify((this.state.texto));
      let bodyTexto =
        {
          autor: this.state.autor,
          titulo: this.state.titulo,
          grafica: bodyFinal,
          timestamp: this.state.fecha,
          x_name: this.state.xname,
          x_type: this.state.xtype,
          y_name: this.state.yname,
          y_type: this.ytype
        };
      fetch('graficas/', {
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

  handleTextChange(event) {
    this.setState({texto: event.target.value});
  }

  handleNameChange(event) {
    this.setState({autor: event.target.value});
  }

  handleTitleChange(event) {
    this.setState({titulo: event.target.value});
  }

  handleFechaChange(event) {
    this.setState({fecha: event.target.value});
  }

  handleLateralChange(event){
    this.setState({yname: event.target.value});
  }

  handleHorizontalChange(event){
    this.setState({xname: event.target.value});
  }

  handleVerticalSelectChange(event){
    this.setState({ytype: event.target.value});
  }

  handleHorizontalSelectChange(event){
    this.setState({xtype: event.target.value});
  }

  render() {
    return (
      <div>
        <Container className={'contenedor_principal'}>
          <div><h1>Creador de gráficos</h1></div>
          <p className="labelInput">Como quiere nombrar su eje vertical?</p>
          <input type="text" className="form-control" id="inputY" placeholder="Eje Lateral"
            onChange={this.handleLateralChange}/>
          <p className="labelInput">Seleccione si quiere hacer su tabla quantitativa o ordinal en el eje vertical</p>
          <select onChange={this.handleVerticalSelectChange} className="form-control" id="exampleFormControlSelect1">
            <option>quantitative</option>
            <option>ordinal</option>
          </select>
          <p className="labelInput">Como quiere nombrar su eje horizontal?</p>
          <input type="text" className="form-control" id="inputY" placeholder="Eje Horizontal"
            onChange={this.handleHorizontalChange}/>
          <div>
            <p className="labelInput">Seleccione si quiere hacer su tabla quantitativa o ordinal en el eje horizontal</p>
            <select onChange={this.handleHorizontalSelectChange} className="form-control" id="exampleFormControlSelect1">
              <option>quantitative</option>
              <option>ordinal</option>
            </select>
            Escriba el json que desea cargar
          </div>
          <textarea cols='40' rows='20' onChange={this.handleTextChange}
            defaultValue={'[{"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}]'}/>
          <br/>
          <button onClick={this.procesarTextoJson}>Generar Tabla</button>
          <span/><input type="file" onChange={this.handleUploadFile}/>
          <div ref={(div) => this.divTarget = div}>
          </div>
          <br/>
          <p className="labelInput">Dale un titulo a tu gráfica</p>
          <input type="text" className="form-control" id="inputTitle" placeholder="Titulo"
            onChange={this.handleTitleChange}/>
          <p className="labelInput">Escribe tu nombre</p>
          <input type="text" className="form-control" id="inputName" placeholder="Nombre"
            onChange={this.handleNameChange}/>
          <p className="labelInput">Escriba la fecha</p>
          <input type="text" className="form-control" id="inputFecha" placeholder="Fecha"
            onChange={this.handleFechaChange}/>
          <button onClick={this.guardarTexto}>Guardar tabla</button>
        </Container>
      </div>
    );
  }
}


registerServiceWorker();