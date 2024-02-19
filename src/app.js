import ProductManager from "./ProductManager.js";
import express from "express";


const products = new ProductManager("././productos.json")
const app = express()
const port = 8080

app.use(express.urlencoded({extended: true}))


app.listen(port, () => console.log("Servidor corriendo en el puerto", port))

app.get("/products", async (req,res) => {



    const productsbd = await products.getProducts()

    let limit = parseInt(req.query.limit) || productsbd.length
    const finalProductsbd = productsbd.slice(0,limit)
    
    res.send(finalProductsbd)

})

app.get("/products/:pid", async (req,res) => {

    let pid = parseInt(req.params.pid)
    const result = await products.getProductsById(pid)
    
    res.send(result)

})





// const products = new ProductManager("././productos.json")



// const productsbd = await products.getProducts()
// console.log("TCL: productsbd", productsbd)