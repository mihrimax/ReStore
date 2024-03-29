import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";

export default function ProductDetail() {

    const { id } = useParams<{ id: string }>();
    //If I have a product let fetch the product, but if I haven't any product then let be null, and 
    const [product, setProducts] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);


    //Don't forget the dependencies !!!
    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('error: ', error))
            .finally(() => setLoading(false));
    }, [id])

    if (loading) return <Typography variant='h3'>Loading...</Typography>
    
    if (!product) return <Typography variant='h3'>Product not found</Typography>

    return (
        <Grid container spacing={6}>
            {/* xs = column */}
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant='h4' color='secondary'>${(product.price/100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}