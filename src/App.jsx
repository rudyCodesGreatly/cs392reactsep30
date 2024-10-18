import React, { useState } from 'react';
import Banner from './components/Banner.jsx';
import Catalog from './components/Catalog.jsx';
import { useJsonQuery } from './utilities/fetch';
import Selector from './components/termSelector.jsx';
import Cart from './components/Cart.jsx';
import CartModal from './components/CartModal.jsx';

const App = () => {
    const [season, setSeason] = useState('Fall');
    const [isShopping, setIsShopping] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);

    // Fetch data
    const [data, isLoading, error] = useJsonQuery(
        'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
    );
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    const schedule = data;
    const courses = schedule.courses;

    // Get courses in cart
    const coursesInCart = Object.entries(courses).filter(([courseID]) =>
        selectedCourses.includes(courseID)
    );

    return (
        <div className="min-h-screen p-4 bg-blue-100">
            <Banner title={schedule.title} />

            <div className="flex justify-between items-center">
                <Cart
                    isShopping={isShopping}
                    setIsShopping={setIsShopping}
                    showCartModal={showCartModal}
                    setShowCartModal={setShowCartModal}
                />
                <Selector state_of_season={season} setSeason={setSeason} />
            </div>

            {/* Catalog */}
            <Catalog
                courses={courses}
                state_of_season={season}
                isShopping={isShopping}
                selectedCourses={selectedCourses}
                setSelectedCourses={setSelectedCourses}
            />

            {/* Cart Modal */}
            <CartModal
                isOpen={showCartModal}
                onRequestClose={() => setShowCartModal(false)}
                coursesInCart={coursesInCart}
                selectedCourses={selectedCourses}
                setSelectedCourses={setSelectedCourses}
            />
        </div>
    );
};

export default App;
