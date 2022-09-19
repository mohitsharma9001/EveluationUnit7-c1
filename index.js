
import express from "express";
import fs from "fs";


const app = express();

app.use(express.json())

let port = 3001;
app.listen(port,(req, res)=>{
    console.log(`listening on port ${port} `);
});

app.get("/",(req, res)=>{
    res.send("This is HomePage");
})




app.get("/products",(req, res)=>{
    fs.readFile("./products.json",{encoding : "utf-8"}, (err, data)=>{

        res.send(data);
      })
})




app.post("/products/create",(req,res)=>{

    fs.readFile("./products.json", (err, data)=>{
       const parsed = JSON.parse(data);
       parsed.Products = [...parsed.Products, req.body];
       fs.writeFile("./products.json", JSON.stringify(parsed),{encoding : 'utf-8'}, ()=>{
         res.send("New Product Added");
       }) 
    })
})



app.delete("/products/:productId",(req,res)=>{
    let {productId} = req.params;

    fs.readFile("./products.json", (err, data)=>{   
       const parsed = JSON.parse(data);
       parsed.Products = parsed.Products.filter((product)=>product.id != productId);
       fs.writeFile("./products.json", JSON.stringify(parsed),{encoding : 'utf-8'}, ()=>{
         res.send(" Product deleted");
       }) 
    })
})


app.patch("/products/:productId", (req, res)=>{
    let {productId} = req.params;

    fs.readFile("./products.json",(err, data)=>{
        const parsed = JSON.parse(data);
  
        parsed.Products.forEach((product)=> {if(product.id == productId)  product.Cartstatus = !product.Cartstatus})
        console.log(parsed.Products)
         fs.writeFile("./products.json",JSON.stringify(parsed),{encoding : 'utf8'},()=>{
            res.send("Product updated");
         })
    })
})