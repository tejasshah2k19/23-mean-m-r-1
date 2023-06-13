const fs = require("fs")
const CsvReader = require("csv-reader");
const IndustryModel = require("../model/industryModel")  



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
    let myDataFromDb =[] 
    
    IndustryModel.find().then(data=>{
        myDataFromDb = data
  
    })

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
           
            //a => db{1,2,3,4,5,6,7} 
            //b => file{2,4,7,8,9,10} 
            //c => {8,9,10}{b-a}
            
            //b-a 
            console.log("dbLength ",myDataFromDb.length);
            console.log("****"+myDataFromDb);//b 

            for(i=0;i<myDataFromDb.length;i++){
                if(industryArray.indexOf(myDataFromDb[i].name.toLowerCase()) != -1 ){ 
                    delete industryArray[industryArray.indexOf(myDataFromDb[i].name)]   

                }
            } 
           
            //
            industryArray.forEach(item=>industryJson.push({"name":item}))
            console.log("=====>");
            console.log(industryJson);
           

            resolve(industryJson) //return 
        })     
    })
   let data = await promise;   
    console.log("THE END");
    return data;
}

 


//equity 
module.exports.uploadEquity = async function(){
    //seed ind_nifty50list.csv 
    let eqArray = []  // {name,isin,industryfk,XXXX,XXX} 
    let myFile = fs.createReadStream("./seed/ind_nifty50list.csv","utf8")
     

    let promise = new Promise((resolve,reject)=>{
        myFile.pipe(new CsvReader())
        .on('data',function(row){


                let industryName = row[1] 
                IndustryModel.findOne({name:industryName}).then(data=>{
                    if(data){
                        let eq = {name:row[0],symbol:row[2],isin:row[4],industry:data._id} 
                        eqArray.push(eq);                       
                    }
                })

               
        })
        .on('end',function(){
              

            resolve(eqArray) //return 
        })     
    })
   let data = await promise;   
    console.log("THE END");
    return data;
}





