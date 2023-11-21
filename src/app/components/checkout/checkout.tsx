import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button, Image, CardFooter } from '@nextui-org/react';
import { motion } from 'framer-motion';
import styles from './checkout.module.scss';

interface CartItem {
    id: number;
    name: string;
    photo: string;
    quantity: number;
    value: number;
}

const Checkout: React.FC<{ cartItems?: CartItem[]; onClose: () => void }> = ({ cartItems, onClose }) => {

    const [cart, setCart] = useState<CartItem[]>(cartItems || []);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, [])

    const handleAdjustQuantity = (itemId: number, newQuantity: number) => {

        if (cart) {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        }


    };

    const handleRemoveItem = (itemId: number) => {

        if (cart) {
            setCart(prevCart => prevCart.filter(item => item.id !== itemId));
        }

    };

    const cartCost = () => {
        return cart.reduce((total, item) => total + item.quantity * item.value, 0);
    }

    return (
        <motion.div className={`${styles.checkout} ${isVisible ? styles.visible : ''}`}>
            <Card className={styles.checkoutCard}>
                <CardHeader>
                    <h3>Carrinho de Compras</h3>
                    <Button onClick={onClose}>Fechar</Button>

                </CardHeader>
                <CardBody className={styles.productCardBody}>
                    <ul>
                        {cart && cart.map(item => (
                            <li key={item.id} className={styles.product}>
                                <Image
                                    src={item.photo}
                                    width="100"
                                    height='100'
                                    alt={`image of ${item.name}`}
                                />
                                <p>{item.name}</p>
                                <section className={styles.quantityControl}>
                                    <Button onClick={() => handleAdjustQuantity(item.id, item.quantity + 1)}>+</Button>
                                    <p>{item.quantity}</p>
                                    <Button onClick={() => handleAdjustQuantity(item.id, item.quantity - 1)}>-</Button>
                                </section>
                                <section><p className={styles.price}>R$ ${item.value}</p></section>



                                <Button className={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>Remover</Button>
                            </li>
                        ))}
                    </ul>
                </CardBody>

                <CardFooter className={styles.endBuy}>
                    <section className={styles.sumUp}>
                        <p>Total: </p><p>R${cartCost()}</p>
                    </section>

                    <Button className={styles.finishButton}>Finalizar Compra </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
};

export default Checkout;