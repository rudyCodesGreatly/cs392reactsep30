import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validateTitle, validateMeets } from '../utilities/formValidator';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../utilities/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

const Editor = ({ courses, updateCourse }) => {
    const { courseID } = useParams();
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists() && userDoc.data().roles === "admin") {
                    setIsAuthenticated(true);
                    setIsAdmin(true);
                } else {
                    alert("You do not have permission to edit this course.");
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const course = courses[courseID];

    const [formValues, setFormValues] = useState({
        term: '',
        number: '',
        title: '',
        meets: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        meets: ''
    });

    useEffect(() => {
        if (course) {
            setFormValues({
                term: course.term || '',
                number: course.number || '',
                title: course.title || '',
                meets: course.meets || ''
            });
        }
    }, [course]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });

        let error = '';
        if (name === 'title') {
            error = validateTitle(value);
        } else if (name === 'meets') {
            error = validateMeets(value);
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.title || errors.meets) {
            alert('Please fix the form errors before submitting.');
            return;
        }

        const courseRef = doc(db, "courses", courseID);

        try {
            await updateDoc(courseRef, formValues);
            updateCourse({ ...formValues, id: courseID });
            navigate('/');
        } catch (error) {
            console.error("Error updating course: ", error);
            alert("Failed to update the course. Please try again.");
        }
    };

    if (!isAuthenticated || !isAdmin) return null;

    return (
        <div className="p-4 bg-white rounded-lg shadow mx-auto w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Course Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Term</label>
                    <input
                        type="text"
                        name="term"
                        value={formValues.term}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Number</label>
                    <input
                        type="text"
                        name="number"
                        value={formValues.number}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Meets</label>
                    <input
                        type="text"
                        name="meets"
                        value={formValues.meets}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.meets && (
                        <p className="text-red-500 text-sm mt-1">{errors.meets}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Editor;
