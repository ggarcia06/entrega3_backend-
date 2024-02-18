import fs from 'fs'

export default class ProductManager {
    array = new Array();

    constructor (path){
        this.path = path
        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, JSON.stringify(this.array))
        }
    }

    getProducts = async() => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(data)
        return products
    }

    getProducts = async() => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(data)
        return products
    }

    //la funcion codeValidator permite saber si el codigo ingresado de un nuevo producto ya esta registrado en la base de datos
    codeValidator = async(codeToValidate) => {
        const data = await this.getProducts()
        let result = data.find((el) => el.code === codeToValidate)
        let isValid = false;
        if(!result) {isValid = true}
        return isValid;
    }

    addProduct = async(product) => {

        const validCode = await this.codeValidator(product.code)
        if(!validCode){
            console.log("el codigo ingresad ya esta registrado")
        }else{
            const products = await this.getProducts()
        
            product.id = 0
            products.length === 0 ? (product.id = 1) : (product.id = products[products.length - 1].id + 1) 

            products.push(product)

            await fs.promises.writeFile(this.path, JSON.stringify(products,  null, "\t"))
        }
        return product
    }

    getProductsById = async(requestedId) => {
        const products = await this.getProducts()
        let result = products.find((el) => el.id === requestedId)
        if(!result){console.log("El id solicitado no existe")}
        return result

    }

    deleteProduct = async(requestedId ) => {
        const products = await this.getProducts()
        let result = products.find((el => el.id === requestedId))
        let i = products.indexOf(result)
        products.splice(i,1)

        await fs.promises.writeFile(this.path, JSON.stringify(products,  null, "\t"))
     
        return console.log(`el producto con el id ${requestedId} se ha sido eliminado correctamente`)

    }

    updateProduct = async(requestedId, updatedProduct) => {
        const products = await this.getProducts()
        let index = products.findIndex((el) => el.id === requestedId)
        products[index] = updatedProduct
        products[index].id = requestedId
        await fs.promises.writeFile(this.path, JSON.stringify(products,  null, "\t"))
        return products
        
    }
}

// const products = new ProductManager("./productos.json")



// const productsbd = await products.getProducts()
// console.log("TCL: productsbd", productsbd)



// let producto = {
//     title: "cebolla",
//     description: "cebolla",
//     price: 2500,
//     thumbnail: "http://....",
//     code: 99933,
//     stock: 36
// }
// await products.addProduct(producto)



// let newData = {
//     title: "kiwi",
//     description: "kiwi",
//     price: 2500,
//     thumbnail: "http://....",
//     code: 36478,
//     stock: 20
// }
// await products.updateProduct(1, newData)




// await products.deleteProduct(1)



// const result = await products.getProductsById(6)
// console.log(result)




    