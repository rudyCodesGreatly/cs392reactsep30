import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner.jsx';
import Catalog from './components/Catalog.jsx';
import { useJsonQuery } from './utilities/fetch';
import Selector from './components/termSelector.jsx';
import Cart from './components/Cart.jsx';
import CartModal from './components/CartModal.jsx';
import Editor from "./components/editCourseInformation.jsx";

const App = () => {
    const [season, setSeason] = useState('Fall');
    const [isShopping, setIsShopping] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [courses, setCourses] = useState({}); // Initialize with an empty object

    // Fetch data
    const [data, isLoading, error] = useJsonQuery(
        'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
    );

    // Effect to set the courses state once data is available
    useEffect(() => {
        if (data && data.courses) {
            setCourses(data.courses);
        }
    }, [data]);

    // Handle loading or error state
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    // Courses in cart are basically just the selected courses but displayed as objects rather than course IDs
    const coursesInCart = Object.entries(courses).filter(([courseID]) =>
        selectedCourses.includes(courseID)
    );

    const updateCourse = (updatedCourse) => {
        setCourses((prevCourses) => ({
            ...prevCourses,
            [updatedCourse.id]: updatedCourse
        }));
    };

    return (
        <div className="min-h-screen p-4 bg-blue-100">
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            {/* Beginning of the course catalog page */}
                            {data.title && <Banner title={data.title} />}
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
                            {/* End of the course catalog page */}
                        </div>
                    }
                />

                <Route path="/edit/:courseID" element={<Editor courses={courses} updateCourse={updateCourse} />} />
            </Routes>
        </div>
    );
};

export default App;
