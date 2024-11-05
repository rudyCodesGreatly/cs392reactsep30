import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner.jsx';
import Catalog from './components/Catalog.jsx';
import Selector from './components/termSelector.jsx';
import Cart from './components/Cart.jsx';
import CartModal from './components/CartModal.jsx';
import Editor from "./components/editCourseInformation.jsx";
import Auth from "./components/Auth.jsx"; // Import the Auth component
import { collection, getDocs } from "firebase/firestore";
import { db } from "./utilities/firebaseConfig.js";

const App = () => {
    const [season, setSeason] = useState('Fall');
    const [isShopping, setIsShopping] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [courses, setCourses] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "courses"));
                const coursesData = {};

                querySnapshot.forEach((doc) => {
                    coursesData[doc.id] = doc.data();
                });

                setCourses(coursesData);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching courses: ", err);
                setError(err);
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

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
            <Auth /> {/* Add Auth component here */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <Banner title="Course Catalog" />
                            <div className="flex justify-between items-center">
                                <Cart
                                    isShopping={isShopping}
                                    setIsShopping={setIsShopping}
                                    showCartModal={showCartModal}
                                    setShowCartModal={setShowCartModal}
                                />
                                <Selector state_of_season={season} setSeason={setSeason} />
                            </div>

                            <Catalog
                                courses={courses}
                                state_of_season={season}
                                isShopping={isShopping}
                                selectedCourses={selectedCourses}
                                setSelectedCourses={setSelectedCourses}
                            />

                            <CartModal
                                isOpen={showCartModal}
                                onRequestClose={() => setShowCartModal(false)}
                                coursesInCart={coursesInCart}
                                selectedCourses={selectedCourses}
                                setSelectedCourses={setSelectedCourses}
                            />
                        </div>
                    }
                />

                <Route path="/edit/:courseID" element={<Editor courses={courses} updateCourse={updateCourse} />} />
            </Routes>
        </div>
    );
};

export default App;
