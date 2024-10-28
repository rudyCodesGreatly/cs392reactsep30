import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

const CourseCard = ({
                        courseID,
                        course,
                        isSelected,
                        isShopping,
                        toggleCourseSelection,
                        viewingCart,
                    }) => {

    const navigate = useNavigate();

    const openEditor = () => {
        navigate(`/edit/${courseID}`);
    };

    return (
        <div
            key={courseID}
            onClick={() => !viewingCart && toggleCourseSelection(courseID)}
            className={`bg-white p-4 h-full rounded-lg shadow mx-auto w-full flex flex-col justify-between relative ${
                !viewingCart && isShopping ? 'cursor-pointer hover:bg-blue-50' : ''
            }`}
        >
            {/* Circle button in top-right corner */}
            {isShopping && !viewingCart && (
                <button
                    onClick={(event) => {
                        event.stopPropagation();
                        toggleCourseSelection(courseID);
                    }}
                    className="absolute top-2 right-2 focus:outline-none cursor-pointer"
                    aria-label={isSelected ? 'Deselect course' : 'Select course'}
                >
                    {isSelected ? (
                        // Filled circle with checkmark
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                            ✓
                        </div>
                    ) : (
                        // Empty circle
                        <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                    )}
                </button>
            )}

            {/* Course Details */}
            <div>
                <h2 className="text-xl font-semibold text-blue-600">
                    {course.term} {course.number}
                </h2>
                <p className="mt-2">{course.title}</p>
            </div>

            <div className="flex flex-row items-center justify-between mt-4">
                <p className="mr-4">{course.meets}</p>
                <button
                    className="bg-white px-2 py-1 cursor-pointer hover:bg-gray-200"
                    onClick={(event) => {
                        event.stopPropagation();
                        openEditor();
                    }}
                >
                    <FaEdit />
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
