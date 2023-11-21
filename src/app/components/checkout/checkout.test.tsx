import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Checkout from './checkout';


test('renders the title correctly', () => {
    const { getByText } = render(<Checkout cartItems={[]} onClose={() => { }} />);
    const titleElement = getByText('Carrinho de Compras');
    expect(titleElement).toBeInTheDocument();
});

