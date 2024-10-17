import React from "react";

const Cart = ({isShopping, setIsShopping, viewingCart, setViewingCart}) =>{
    return (
        <div className="flex ">

            <button
                    onClick={() => setIsShopping(!isShopping)}
                    className="bg-amber-200 border-2 border-black px-2 py-1  cursor-pointer hover:bg-gray-200">
                {isShopping ? 'Exit Course Selection' : 'Edit Cart'}
            </button>

            <button
                    onClick={() => setViewingCart(!viewingCart)}
                    className="bg-white border-2 border-black px-2 py-1 cursor-pointer hover:bg-gray-200"
            >
                {viewingCart ? 'View All Courses' : 'View Cart'}
            </button>


        </div>
    )
}

export default Cart;

