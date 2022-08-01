let express=require("express");
let fs=require("fs");
let dns=require("dns");

let app=express();
app.use(express.json());


//1st Problem
app.post("/getmeip",(req,res)=>
{
    let body=req.body;
    let path=body.website_name
    dns.lookup(path,(err,address,family)=>
    {
        if(err) throw err;
        res.send(address);
    })

})

//Second Problem
app.post("/products/create",(req,res)=>
{
    const data=req.body;
    const prevData=fs.readFileSync('./products.json',"utf-8");
    const parsedData=JSON.parse(prevData);
    const todos=parsedData.todos;
    const newtodos=[...todos,data];
    parsedData.todos=newtodos;
    const updatedTodos=JSON.stringify(parsedData);
    fs.writeFileSync('./products.json',updatedTodos,"utf-8");
    res.send(updatedTodos);
})

app.get("/products",(rea,res)=>
{
    const data=fs.readFileSync('./products.json',"utf-8");
    const parsedData=JSON.parse(data);
    const todos=parsedData.todos;
    res.send(todos);
})

app.put("/products/:productId",(req,res)=>
{
    const data=req.body;
    const prevData=fs.readFileSync("./products.json","utf-8");
    const parsedData=JSON.parse(prevData);
    const todos=parsedData.todos;
    const newtodos=todos.map((el)=>
    {
        if(el.id===data.id)
        {
            return data;
        }
        else{
            return el;
        }
    })
    parsedData.todos=newtodos;
    const updatedTodos=JSON.stringify(parsedData);
    fs.writeFileSync("./products.json",updatedTodos,"utf-8");
    res.send(updatedTodos);
})

app.delete("/products/:productId",(req,res)=>
{
   const {id}=req.body;
   const data=fs.readFileSync('./products.json',"utf-8");
   const parsedData=JSON.parse(data);
   const todos=parsedData.todos;
   const newtodos=todos.filter((el)=>{return el.id!==id});
   parsedData.todos=newtodos;
   const updatedTodos=JSON.stringify(parsedData);
   fs.writeFileSync('./products.json',updatedTodos,"utf-8");
   res.send(updatedTodos);

})

app.listen(7000);