import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validateTitle, validateMeets } from '../utilities/formValidator';

const Editor = ({ courses, updateCourse }) => {
    const { courseID } = useParams(); // Get courseID from the URL
    const navigate = useNavigate();

    // Get the course data by courseID from the courses prop
    const course = courses[courseID];

    // State to store the form values, pre-filled with existing course data
    const [formValues, setFormValues] = useState({
        term: '',
        number: '',
        title: '',
        meets: ''
    });

    // State to store validation errors
    const [errors, setErrors] = useState({
        title: '',
        meets: ''
    });

    // Pre-fill the form values when the course data is available
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

    // Handle form input change and validate fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update form values
        setFormValues({
            ...formValues,
            [name]: value
        });

        // Validate the input value using the utilities
        let error = '';
        if (name === 'title') {
            error = validateTitle(value);
        } else if (name === 'meets') {
            error = validateMeets(value);
        }

        // Set the error state accordingly
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if there are any errors
        if (errors.title || errors.meets) {
            alert('Please fix the form errors before submitting.');
            return;
        }

        // Update the course information and navigate back to the catalog
        updateCourse({ ...formValues, id: courseID });
        navigate('/');
    };

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
