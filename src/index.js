import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2b',(req,res)=>{
    let result = "";
    let strArr = [];
    strArr = req.query.fullname.split(" ");
    
    if(strArr.length === 1 && strArr[0]===''){
         result = "Invalid fullname";
    } else if(strArr.length === 1){
        result = strArr[0];
    } else if(strArr.length === 2){
        result = strArr[1]+" " + strArr[0][0]+".";
    } else if(strArr.length === 3){
        result = strArr[2]+" " + strArr[0][0]+". "+ strArr[1][0]+".";
    } else {
        result = "Invalid fullname";
    }
    
   res.send(result); 
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
