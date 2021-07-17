

var testSubjects = d3.select("selDataset");
d3.json("samples.json").then(function(data){
    data.names.forEach(function(otu){
    testSubjects.append("option").text(otu).property("value");
    });
})
