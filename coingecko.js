// import axios from 'https://cdn.skypack.dev/axios';
const DATE_FORMAT_PATTERN = "%Y-%m-%dT%H:%M:%S.000Z";
var file = "data/bitcoin.json";
d3.json("data/gala.json", (d=> console.log( d)));

let coinFiles=[
 "data/gala.json",
 "data/shiba-inu.json",
 "data/dogecoin.json",
 "data/stepn.json",
 "data/ripple.json",
 "data/bitcoin.json",
 "data/solana.json",
 "data/looksrare.json",
].sort();

var chart = c3.generate({
    bindto: '#chart',
    padding: {
        top: 40,
        right: 20,
        bottom: 40,
        left: 50,
    },
    zoom: {
        enabled: true
    },
    color: {
        pattern: ['crimson', 'darkgrey', 'green', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
    },
    // colors: {
    //   date: '#666666',
    //   market_cap: '#cccccc',
    //   total_volume: '#428bca',
    // },
    data: {
      x: 'date',
      url: file,
      mimeType: "json",
      // type: 'bar',
      types:{
        price: 'area',
        market_cap: 'bar',
        total_volume: 'area',

      },
    },
    axis: {
        x: {
            type:'timeseries',
            tick:{
               format: '%y/%m/%d'
            }
        },
    },
});



const loadChart1=(file)=>{
    chart.load({
        x: 'date',
        url: file,
        mimeType: 'json',
        type: 'area-spline',
        types:{
            market_cap: 'bar',
            total_volume: 'area',
        },
    });
};

const monitor=(event)=>{
    titles = [
        document.getElementById("title"),
        document.querySelector("title")
    ]

    selector=document.getElementById("selector");
    selector.max=coinFiles.length-1;

    selector.addEventListener('input', (e)=>{
      file = coinFiles[+e.target.value]; // update array Index
      loadChart1(file);
      // update title elements
      titles.map(x =>x.textContent=String(file))
    });
}

window.onload = monitor;
// export function monitor(){};
// module.exports = monitor;
