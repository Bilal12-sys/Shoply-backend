// Import Express
import express from "express"
// Import products
import { products } from "./products.js"
// Import product middleware
import product_middleware from "../../productmiddleware.js"

// Set express router in a variable: product router
const product_Router = express.Router()

product_Router.use("/products", product_middleware)
product_Router.use("/product", product_middleware)
// Make products Api
product_Router.get("/products", (req, res) => {
    if (!products) {
        return res.status(404).send({ status: 404, message: "Products not found" })
    }
    res.status(200).send({ status: 200, message: "All Products fetch Suessfully", data: products })
})

// Serch signle Product
product_Router.get("/product/:id", (req, res) => {
    // get id and covert into number store in variable: id
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).send({ status: 400, message: "Invalid product id" })
    }
    const product = products.find(item => item.id === id)

    if (!product) {
        return res.status(404).send({ status: 404, message: "Product not found " })
    }

    res.status(200).send({ status: 200, message: "Product fetch suesfully", data: product })
})

// Make Product post Api
product_Router.post("/product", (req, res) => {
    const { name, description, price, category, brand } = req.body

    // Check product data before add product
    if (!name || !description || !category || !brand || typeof price !== "number" || price <= 0) {
        return res.status(400).send({ status: 400, message: "Valid product data is required" })
    }

    products.push({ id: products.length + 1, ...req.body })
    res.status(201).send({ status: 201, message: "Product Added Suessfully" })
})

// Make Product Update Api
product_Router.put('/product/:id', (req, res) => {
    const productsId = Number(req.params.id);
    if (!Number.isInteger(productsId) || productsId <= 0) {
        return res.status(400).send({ status: 400, message: "Invalid product id" })
    }
    const productsIndex = products.findIndex(v => v.id === productsId)
    if (productsIndex === -1) {
        return res.status(404).send({ status: 404, message: "Product not found" })
    }
    const { name, description, price, category, brand } = req.body
    if (!name || !description || !category || !brand || typeof price !== "number" || price <= 0) {
        return res.status(400).send({ status: 400, message: "Valid product data is required" })
    }
    products.splice(productsIndex, 1, { id: productsId, ...req.body })
    res.status(200).send({ status: 200, message: "Product Updated Suessfully" })
})

// Make user delet Api
product_Router.delete("/product/:id", (req, res) => {
    const productsId = Number(req.params.id);
    if (!Number.isInteger(productsId) || productsId <= 0) {
        return res.status(400).send({ status: 400, message: "Invalid product id" })
    }
    const productsIndex = products.findIndex(user => user.id === productsId);
    if (productsIndex === -1) {
        return res.status(404).send({ status: 404, message: "Product not found" });
    }
    products.splice(productsIndex, 1);
    res.status(200).send({ status: 200, message: "Product deleted" });
});


// Exprt product router
export default product_Router