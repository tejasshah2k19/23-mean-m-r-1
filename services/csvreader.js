const fs = require("fs")
const CsvReader = require("csv-reader");
  



function readFile() {


    let myfile = fs.createReadStream("./seed/ind_nifty50list.csv", "utf8") // fopen("data.txt","r") 


    // console.log("file => ",myfile);


    myfile
        .pipe(new CsvReader({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', function (row) {
            console.log('A row arrived: ', row[0]);
        })
        .on('end', function () {
            console.log('No more rows!');
        });

}
 
//read industry data from csv 
module.exports.uploadIndustry = async function(){
    //seed ind_nifty50list.csv 
    let industryArray = []
    let myFile = fs.createReadStream("./seed/ind_nifty50list.csv","utf8")

    let promise = new Promise((resolve,reject)=>{
        myFile.pipe(new CsvReader())
        .on('data',function(row){
                if(industryArray.indexOf(row[1].toLowerCase()) == -1 ){ 
                    industryArray.push(row[1].toLowerCase()) 
                }
        })
        .on('end',function(){
            console.log(industryArray);
            console.log("\n"+industryArray.length);
            let industryJson = []
            industryArray.forEach(item=>industryJson.push({"name":item}))

            resolve(industryJson) //return 
        })     
    })
   let data = await promise;   
    console.log("THE END");
    return data;
}

 