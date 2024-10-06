import React from "react";

const Catalog = ({ courses }) => (
  <div>
    {Object.entries(courses).map(([courseID, course]) => (
      <div key={courseID}>
        <h2>Course ID: {courseID}</h2>
        <p>Title: {course.title}</p>
        <p>Term: {course.term}</p>
        <p>Number: {course.number}</p>
        <p>Meets: {course.meets}</p>
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
