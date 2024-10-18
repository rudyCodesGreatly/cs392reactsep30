// components/CartModal.jsx
import React from 'react';
import Modal from 'react-modal';
import CourseCard from './CourseCard';
const CartModal = ({
                       isOpen,
                       onRequestClose,
                       coursesInCart,
                       selectedCourses,
                       setSelectedCourses,
                   }) => {
    // Function to remove a course from the cart
    const removeCourse = (courseID) => {
        setSelectedCourses(selectedCourses.filter((id) => id !== courseID));
    };

    const viewingCart = true;
    const isShopping = false;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Cart Modal"
            className="relative flex items-center justify-center min-h-screen"
            // overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        >
            <div className="absolute bg-white px-6 pb-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">

                <div className="sticky top-0 z-30 flex justify-between items-center mb-4 bg-white py-6">
                    <h2 className="text-2xl font-semibold">Your Cart</h2>


                        <button
                            onClick={onRequestClose}
                            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Close
                        </button>

                </div>


                {coursesInCart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {coursesInCart.map(([courseID, course]) => (
                            <CourseCard
                                key={courseID}
                                courseID={courseID}
                                course={course}
                                isSelected={true} // All courses in cart are selected
                                isShopping={isShopping}
                                toggleCourseSelection={removeCourse} // Use remove function
                                viewingCart={viewingCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CartModal;
