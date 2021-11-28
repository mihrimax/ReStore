import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    //it runs with every each render
    //if we'rent add dependencies, it gonna be called over and over - endless loop
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            //promise for fetch
            .then(response => response.json())
            //promise for response
            .then(data => setProducts(data))
        //no dependencies
    }, [])

   
    return (
        //or fragment or <>
        <>
            <ProductList products={products} />
        </>
    )
}