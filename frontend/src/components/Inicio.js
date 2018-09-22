import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import vega from 'vega';
import vegaLite from 'vega-lite';
import csvParse from 'papaparse';
import vegaEmbed from 'vega-embed';
import registerServiceWorker from './../registerServiceWorker';

export default class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      texto: '',
      embed: {},
      spec: {},
      archivo: null
    };
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.procesarArchivo = this.procesarArchivo.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.procesarTextoJson = this.procesarTextoJson.bind(this);
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
          'y': {'field': 'a', 'type': 'quantitative'},
          'x': {'field': 'b', 'type': 'quantitative'}
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
    try {
      console.log('Json Archivo', this.state.archivo);
      vegaEmbed(this.divTarget, this.state.spec, this.state.embed)
        .then((res) => res.view.insert('myData', this.state.archivo).run());
    }
    catch (e) {
      console.log('Problema archivo', e);
    }
  }

  procesarTextoJson() {
    try {
      var json = JSON.parse(this.state.texto);
      vegaEmbed(this.divTarget, this.state.spec, this.state.embed)
        .then((res) => res.view.insert('myData', json).run());
    }
    catch (e) {
      console.log('Problema escrito', e);
    }
  }

  handleTextChange(event) {
    this.setState({texto: event.target.value});
  }

  render() {
    return (
      <div>
        <div>
          Escriba el json que desea cargar
        </div>
        <textarea cols='40' rows='20' onChange={this.handleTextChange}/>
        <br/>
        <button onClick={this.procesarTextoJson}>Generar Tabla</button>
        <span/><input type="file" onChange={this.handleUploadFile}/>
        <div ref={(div) => this.divTarget = div}></div>
      </div>
    );
  }
}


registerServiceWorker();