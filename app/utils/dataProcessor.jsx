// data migrasi dari script.js ke app/page.js

// utils/dataProcessor.jsx
export const addItemToCart = (cart, item) => {
    const totalPrice = item.quantity * item.price;
    return [...cart, { ...item, total: totalPrice }];
};

export const removeItemFromCart = (cart, index) => {
    return cart.filter((_, i) => i !== index);
};

export const calculateTotalItems = (cart) => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
};
