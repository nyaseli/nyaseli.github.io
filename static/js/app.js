var testSubjects = d3.select("#selDataset");
var dataSet;
d3.json("samples.json").then((data)=>{
    dataSet = data;
    displayMetaData(940,dataSet);
    data.names.forEach(function(otu){
    testSubjects.append("option").text(otu).property("value");
    });
    
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
