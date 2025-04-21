const { readFile, writeFile } = require("fs");

const content = {
    a:1,
    b:2
}

function read(){
    const check = readFile("./test.json",(err, data) => {
        console.log("err",err);
        if(data){
            console.log("data", data.toString());
        }else{
            const wr = writeFile("./test.json", JSON.stringify(content),() => console.log("created"));
            console.log("wr", wr);
        }
    });

    console.log("chec", check);
}

read();