import React from 'react';

const Catalog = ({
                     courses,
                     state_of_season,
                     isShopping,
                     selectedCourses,
                     setSelectedCourses,
                     viewingCart,
                 }) => {

    const filteredCourses = Object.entries(courses).filter(
        ([id, course]) => course.term.toLowerCase() === state_of_season.toLowerCase()
    );

    const coursesInCart = Object.entries(courses).filter(
        ([courseID]) => selectedCourses.includes(courseID)
    );

    const coursesToDisplay = viewingCart ? coursesInCart : filteredCourses;

    const toggleCourseSelection = (courseID) => {
        if (selectedCourses.includes(courseID)) {
            setSelectedCourses(selectedCourses.filter((id) => id !== courseID));
        } else {
            setSelectedCourses([...selectedCourses, courseID]);
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {coursesToDisplay.map(([courseID, course]) => {
                const isSelected = selectedCourses.includes(courseID);
                return (
                    <div
                        key={courseID}
                        onClick={() => toggleCourseSelection(courseID)}
                        className="bg-white p-4 h-full rounded-lg shadow mx-auto w-full flex flex-col justify-between relative"
                    >
                        {/* Circle button in top-right corner */}
                        {isShopping && (
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
                        <div>
                            <hr className="h-px my-8 bg-gray-200 border-0" />
                            <p>{course.meets}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Catalog;
