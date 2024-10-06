// src/components/Catalog.jsx
import React from "react";

const Catalog = ({ courses }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {Object.entries(courses).map(([courseID, course]) => (
      <div key={courseID} className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-blue-600">Course ID: {courseID}</h2>
        <p className="mt-2"><span className="font-medium">Title:</span> {course.title}</p>
        <p><span className="font-medium">Term:</span> {course.term}</p>
        <p><span className="font-medium">Number:</span> {course.number}</p>
        <p><span className="font-medium">Meets:</span> {course.meets}</p>
      </div>
    ))}
  </div>
);

export default Catalog;


// courses: {
//     F101: {
//       term: "Fall",
//       number: "101",
//       meets: "MWF 11:00-11:50",
//       title: "Computer Science: Concepts, Philosophy, and Connections",
//     },
//     F110: {
//       term: "Fall",
//       number: "110",
//       meets: "MWF 10:00-10:50",
//       title: "Intro Programming for non-majors",
//     },
//     S313: {
//       term: "Spring",
//       number: "313",
//       meets: "TuTh 15:30-16:50",
//       title: "Tangible Interaction Design and Learning",
//     },
//     S314: {
//       term: "Spring",
//       number: "314",
//       meets: "TuTh 9:30-10:50",
//       title: "Tech & Human Interaction",
//     }
//   }
