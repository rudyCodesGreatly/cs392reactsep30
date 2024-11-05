import React from 'react';

const Cart = ({ isShopping, setIsShopping, showCartModal, setShowCartModal }) => {
    return (
        <div className="flex space-x-2">
            <button
                onClick={() => setIsShopping(!isShopping)}
                className="bg-amber-200 border-2 border-black px-2 py-1 cursor-pointer hover:bg-gray-200"
            >
                {isShopping ? 'Exit Course Selection' : 'Add Courses to Cart'}
            </button>

            <button
                onClick={() => setShowCartModal(true)}
                className="bg-white border-2 border-black px-2 py-1 cursor-pointer hover:bg-gray-200"
            >
                View Cart
            </button>
        </div>
    );
};

export default Cart;
