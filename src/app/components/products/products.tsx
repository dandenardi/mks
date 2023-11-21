import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Button } from '@nextui-org/react';
import styles from './products.module.scss';

interface Product {
    id: number,
    name: string,
    brand: string,
    description: string,
    photo: string,
    price: number,
    createdAt: Date,
    updatedAt: Date


}

interface ProductCardProps {
    product: Product,
    addToCart: (id: number, name: string, photo: string, quantity: number, value: number) => void;
}

export interface CartItem {
    id: number;
    name: string;
    photo: string;
    quantity: number;
    value: number;

}


export const addToCart = (id: number, name: string, photo: string, quantity: number, value: number, cart: CartItem[]): void => {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, photo, quantity, value });
    }
};

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {

    function removeAfterDot(value: number) {
        let received = String(value);

        return received.split(".")[0];
    }

    return (

        <Card className={styles.productCard}>

            <CardBody className={styles.productBody}>
                <Image
                    alt="Product background"
                    className={styles.productPhoto}
                    src={product.photo}
                    width={111}
                />

                <p className={styles.description}>Descrição: {product.description}</p>

            </CardBody>
            <CardHeader className={styles.productHeader}>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.price}>R$ {removeAfterDot(product.price)}</p>
            </CardHeader>
            <CardFooter className={styles.productFooter} onClick={() => addToCart(product.id, product.name, product.photo, 1, product.price)}>
                <p>Adicionar ao carrinho</p>
            </CardFooter>
        </Card>
    )
}

const ProductList: React.FC<{ products: Product[]; addToCart: (id: number, name: string, photo: string, quantity: number, value: number) => void }> = ({ products, addToCart }) => {


    return (
        <div className={styles.productsGrid}>
            {products.map((product) => (
                <ProductCard product={product} addToCart={addToCart} />
            ))}
        </div>
    )
}


export default ProductList
