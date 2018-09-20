import React, {Component} from "react";
import vegaEmbed from 'vega-embed';

class Vega extends Component {

  componentDidMount()
  {
    var config = {
      // default view background color
      // covers the entire view component
      background: "#ffffff",
      axis: {
        labelFont: "serif",
        labelFontSize: 16,
        tickWidth: 3,
        tickColor: "red"
      }
    };
    var spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "description": "A simple bar chart with embedded data.",
      "data": {
        "name": "myData"
      },
      "mark": "bar",
      "encoding": {
        "y": {"field": "a", "type": "ordinal"},
        "x": {"field": "b", "type": "quantitative"}
      }
    }

    var myData = [
      {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
      {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
      {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    ];
    vegaEmbed('#vis', spec, { config: config, tooltip: { theme: 'dark' }, defaultStyle: true }).then(function (result) {
      console.log(result);
    }).catch(console.error);
  }

  render() {
    return(
      <div>

      </div>
    );
  }

}
export default BarChart;