#!/usr/bin/env node
// Id$ nonnax 2023-11-12 18:27:29 +0800

const DATE_FORMAT_PATTERN = "%Y-%m-%dT%H:%M:%S.000Z";
var file = "data/bitcoin.json";
// d3.json("data/gala.json", (d=> console.log( d)));

let coinFiles=[
 "data/gala.json",
 "data/shiba-inu.json",
 "data/dogecoin.json",
 "data/stepn.json",
 "data/ripple.json",
 "data/bitcoin.json",
 "data/ethereum.json",
].sort();

const randomSample=(a)=>{
    return a[Math.floor(Math.random()*a.length)]
};

var reTitle=()=>{
   return document.getElementById("title").innerText=String(file);
};

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
    // colors: {
    //   date: '#666666',
    //   market_cap: '#cccccc',
    //   total_volume: '#428bca',
    // },
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

// let file=randomSample(coinFiles);

monitor=(event)=>{
    // console.table(event);
    title = document.getElementById("title")

    htmlTitle = document.querySelector("title")

    selector=document.getElementById("selector");
    selector.addEventListener('input', (e)=>{
      file=coinFiles[+e.target.value];
      loadChart1(file);

      title.textContent=String(file);
      htmlTitle.textContent=String(file);
    });


}

window.onload = monitor;
