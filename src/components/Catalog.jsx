import React from 'react';

const Catalog = ({ courses }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {Object.entries(courses).map(([courseID, course]) => (
        <div
          key={courseID}
          className="bg-white p-4 h-full rounded-lg shadow mx-auto w-full flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold text-blue-600">
              {course.term} {course.number}
            </h2>
            <p className="mt-2">{course.title}</p>
          </div>
          <div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <p>{course.meets}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
