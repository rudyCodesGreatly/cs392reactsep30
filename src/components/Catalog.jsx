import React from 'react';
import CourseCard from './CourseCard';
import {conflict} from "../utilities/scheduleCheck.js";

const Catalog = ({
                     courses,
                     state_of_season,
                     isShopping,
                     selectedCourses,
                     setSelectedCourses,
                 }) => {

    const filteredCourses = Object.entries(courses).filter(
        ([id, course]) => course.term.toLowerCase() === state_of_season.toLowerCase()
    );

    // Function to toggle course selection
    const toggleCourseSelection = (courseID) => {
        if (selectedCourses.includes(courseID)) {
            // Deselect the course
            setSelectedCourses(selectedCourses.filter((id) => id !== courseID));
        } else {
            // Get the course object for the selected courseID
            const newCourse = courses[courseID];

            // Get the course objects for the selected courses
            const selectedCourseObjects = selectedCourses.map((id) => courses[id]);

            // Check for conflicts
            if (!conflict(selectedCourseObjects, newCourse)) {
                // No conflict add the course
                setSelectedCourses([...selectedCourses, courseID]);
            } else {
                // Conflict detected alert the user
                alert('Course cannot be added due to a scheduling conflict.');
            }
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
