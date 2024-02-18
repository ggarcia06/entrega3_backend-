import ProductManager from "./ProductManager.js";
import express from "express";



const app = express()
const port = 8080

app.use(express.urlencoded({extended: true}))


app.listen(port, () => console.log("Servidor corriendo en el puerto", port))

app.get("/products", async (req,res) => {

    const products = new ProductManager("././productos.json")

    const productsbd = await products.getProducts()

    let limit = req.params

    // let data = users.find((user)=> (user.id == userId))

    // if(!data) return res.send("Usuario no encontrado")

    res.send(productsbd)

})




// const products = new ProductManager("././productos.json")



// const productsbd = await products.getProducts()
// console.log("TCL: productsbd", productsbd)