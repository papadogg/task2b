import express from 'express';
import cors from 'cors';
//import pc from './comp';
import _ from 'underscore';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(cors());

//app.get('/', (req, res) => {
//  res.json({
//    hello: 'JS World',
//  });
//});
//
//app.get('/task2b',(req,res)=>{
//    let result = "";
//    let strArr = [];
//    strArr = req.query.fullname.split(" ");
//    
//    if(strArr.length === 1 && strArr[0]===''){
//         result = "Invalid fullname";
//    } else if(strArr.length === 1){
//        result = strArr[0];
//    } else if(strArr.length === 2){
//        result = strArr[1]+" " + strArr[0][0]+".";
//    } else if(strArr.length === 3){
//        result = strArr[2]+" " + strArr[0][0]+". "+ strArr[1][0]+".";
//    } else {
//        result = "Invalid fullname";
//    }
//    
//   res.send(result); 
//});

//app.get('/task2c',(req,res)=>{
//    let username = req.query.username;
//   
//    if(username.indexOf('//')>-1){
//        username = username.slice(username.indexOf("//")+2,username.length);        
//    }
//    
//    username =username.slice(username.indexOf("/")+1,username.length);
//    
//    if(username.indexOf('/')>0) {
//        username = username.slice(0,username.indexOf("/"));
//    }
//    
//    username = username.replace(/@/g, "");
//    username = "@"+username;
//    res.send(username);
//});

//--------------------------------

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });

app.get('/task3A/volumes',(req,res)=>{
    let sizeCArr = _.where(pc.hdd,{volume:"C:"});
    let sizeC = 0;
    sizeCArr.forEach(hdd =>{
        sizeC += hdd.size;
        
    });
    sizeC +="B";
    let sizeDArr = _.where(pc.hdd,{volume:"D:"});
    let sizeD = 0;
    sizeDArr.forEach(hdd =>{
        sizeD += hdd.size;
        
    });
    sizeD +="B";
    res.json({"C:":sizeC, "D:":sizeD});
   
    
});

app.get('/task3A/:id?/:id2?/:id3?',(req,res)=>{
    let id = req.params.id;
    let id2 = req.params.id2;
    let id3 = req.params.id3;
    
    try{
    if(!id && !id2 && !id3){
        return res.json(pc);
    } else if(id3 && pc[id][id2].hasOwnProperty(id3)){
       return res.json(pc[id][id2][id3]);
    } else if(id2 && pc[id].hasOwnProperty(id2) && !id3) {
       return res.json(pc[id][id2]);
    } else if(id && pc.hasOwnProperty(id) && !id2) {
       return res.json(pc[id]);
    } else {
        res.status(404).send('Not found');
    }
    
    } catch (err){
        console.log(err);
         res.status(404).send('Not found');
    }
});





app.get('/*',(req,res)=>{
    res.status(404).send('Not found');
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
