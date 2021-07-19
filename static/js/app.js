var testSubjects = d3.select("#selDataset");
var dataSet;
d3.json("samples.json").then((data)=>{
    dataSet = data;
    data.names.forEach(function(otu){
    testSubjects.append("option").text(otu).property("value");
    });
    displayMetaData(940,dataSet);
    barChart(940,dataSet);
})

function displayMetaData(otu, data){
    var metaData = data.metadata.filter(row => row.id == otu);
    var metaObject = d3.select("#sample-metadata");
    metaObject.html(displayMeta(metaData[0]));
}

function displayMeta(row){
    var line = "";
    Object.entries(row).forEach(([k,v])=>{
        line += `${k}:${v}</br>`;
    })
    return line;
}

function barChart(otu, data){
    var chartData = data.samples.filter(sample => sample.id == otu);
    var mappedData = chartData.map(row => row.otu_ids);
    var allOtus = [];
    for(i = 0;i < mappedData[0].length; i++){
        allOtus.push(`OTU ${mappedData[0][i]}`);
    }
    var value = chartData.map(row => row.sample_values);
    var labels = chartData.map(row => row.otu_labels);
    var trace = {
        x:value[0].slice(0,10), 
        y:allOtus.slice(0,10),
        text:labels[0].slice(0,10),
        type:"bar",
        orientation:"h",
    };
    var result = [trace];
    var layout = {
        yaxis:{
            autorange:"reversed"
        }

    };
    Plotly.newPlot("bar",result,layout);
}
