var str_src=''

class ApexLineColumn extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Cameo Motion apex-line-column</h1>
    <div id="chart"></div>`;
    str_src=this.getAttribute('src');
  }
}
    
customElements.define('apex-line-column', ApexLineColumn);

async function load_csv(){
  var DataFrame = dfjs.DataFrame;
  df=await DataFrame.fromCSV(str_src);
  df=df.transpose();
  ary=df.toArray();
  return ary;
}

async function chart_render(){
  var ary=await load_csv();
  var options = {
    series: [{
    name: '網站部落格',
    type: 'column',
    data: ary[1]
  }, {
    name: '社群媒體',
    type: 'line',
    data: ary[2]
  }],
    chart: {
    height: 350,
    type: 'line',
  },
  stroke: {
    width: [0, 4]
  },
  title: {
    text: 'Traffic Sources'
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1]
  },
  labels: ary[0],
  xaxis: {
    type: 'string'
  },
  yaxis: [{
    title: {
      text: 'Website Blog',
    },

  }, {
    opposite: true,
    title: {
      text: 'Social Media'
    }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

chart_render();
