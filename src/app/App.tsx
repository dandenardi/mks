import Head from 'next/head';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { useQuery } from 'react-query'

import { CartItem } from './components/products/products';
import ProductList, { addToCart } from './components/products/products';
import styles from './page.module.css'
import Checkout from './components/checkout/checkout';

const PRODUCTS_URL = 'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=20&sortBy=id&orderBy=DESC';

export default function App() {

    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

    const getProducts = async () => {
        const res = await fetch(PRODUCTS_URL);
        return res.json();
    }

    const handleCart = (id: number, name: string, photo: string, quantity: number, value: number): void => {
        addToCart(id, name, photo, quantity, value, cart);
        setCart([...cart]);

    }

    function toggleCheckout() {
        setIsCheckoutVisible(!isCheckoutVisible);
    }


    const { data, error, isLoading } = useQuery('products', getProducts);

    if (error) return <div>Request Failed</div>
    if (isLoading) return <div>Loading...</div>

    const products = data.products;



    return (
        <main className={styles.main}>
            <Head>

                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet" />

            </Head>
            <nav className={styles.navbarContainer}>
                <section className={styles.logo}>
                    <h1 id={styles.logoName}>MKS</h1><h6 id={styles.logoSurname}>Sistemas</h6>
                </section>
                <Button onClick={toggleCheckout} className={styles.cart}>Carrinho</Button>

            </nav>

            <ProductList products={products} addToCart={handleCart} />
            {isCheckoutVisible && <Checkout cartItems={cart} onClose={toggleCheckout} />}



        </main>
    )

}
