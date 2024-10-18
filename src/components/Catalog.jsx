import React from 'react';
import CourseCard from './CourseCard';

const Catalog = ({
                     courses,
                     state_of_season,
                     isShopping,
                     selectedCourses,
                     setSelectedCourses,
                 }) => {
    // Filter courses based on the term
    const filteredCourses = Object.entries(courses).filter(
        ([id, course]) => course.term.toLowerCase() === state_of_season.toLowerCase()
    );

    // Function to toggle course selection
    const toggleCourseSelection = (courseID) => {
        if (selectedCourses.includes(courseID)) {
            setSelectedCourses(selectedCourses.filter((id) => id !== courseID));
        } else {
            setSelectedCourses([...selectedCourses, courseID]);
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {filteredCourses.map(([courseID, course]) => {
                const isSelected = selectedCourses.includes(courseID);
                return (
                    <CourseCard
                        key={courseID}
                        courseID={courseID}
                        course={course}
                        isSelected={isSelected}
                        isShopping={isShopping}
                        toggleCourseSelection={toggleCourseSelection}
                        viewingCart={false}
                    />
                );
            })}
        </div>
    );
};

export default Catalog;
