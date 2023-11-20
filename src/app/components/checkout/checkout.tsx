import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';
import styles from './checkout.module.scss';

interface CartItem {
    id: number;
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

    return (
        <div className={`${styles.checkout} ${isVisible ? styles.visible : ''}`}>
            <Card>
                <CardHeader>
                    <h3>Carrinho de Compras</h3>
                    <Button onClick={onClose}>Fechar</Button>

                </CardHeader>
                <CardBody>
                    <ul>
                        {cart && cart.map(item => (
                            <li key={item.id}>
                                <p>Produto ID: {item.id}</p>
                                <p>Quantidade: {item.quantity}</p>
                                <Button onClick={() => handleAdjustQuantity(item.id, item.quantity + 1)}>+</Button>
                                <Button onClick={() => handleAdjustQuantity(item.id, item.quantity - 1)}>-</Button>
                                <Button onClick={() => handleRemoveItem(item.id)}>Remover</Button>
                            </li>
                        ))}
                    </ul>
                </CardBody>
            </Card>
        </div>
    )
};

export default Checkout;