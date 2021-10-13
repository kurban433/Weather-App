var  http=require("http")
var fs=require("fs")
var requests=require("requests")

var hf=fs.readFileSync("wether.html","utf-8")
var replasval=(tempval,orgval)=>{
     var temp=tempval.replace('{%tempval%}',orgval.main.temp)
     var temp=temp.replace('{%tempmin%}',orgval.main.temp_min)
     var temp=temp.replace('{%tempmax%}',orgval.main.temp_max)
     var temp=temp.replace('{%location%}',orgval.name)
     var temp=temp.replace('{%country%}',orgval.sys.country)
     var temp=temp.replace('{%tempst%}',orgval.weather[0].main)

     return temp

}

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=palanpur&units=metric&appid=d14c75ebf369b3e037f8c7f768a7a801")
        .on("data",(data)=>{
            var obj=JSON.parse(data)
            var arr=[obj]
            // console.log(arr[0].main.temp);
            var realtimed=arr.map((val)=> replasval(hf,val))
            .join("");
             res.write(realtimed)
             res.end();
            //console.log(realtimed)
            }) 
            .on("end",(err)=>{
                if(err)return console.log("end",err);
               res.end();
           })
       }
 })         
server.listen("8080",()=>{
   console.log("Done");
})
