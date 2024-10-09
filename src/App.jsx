// src/App.jsx
import React from "react";
import { useState, useEffect } from "react";
import Banner from "./components/Banner.jsx";
import Catalog from "./components/Catalog.jsx";


const schedule = {
  title: "CS Courses for 2018-2019",
  courses: {
    F101: {
      term: "Fall",
      number: "101",
      meets: "MWF 11:00-11:50",
      title: "Computer Science: Concepts, Philosophy, and Connections",
    },
    F110: {
      term: "Fall",
      number: "110",
      meets: "MWF 10:00-10:50",
      title: "Intro Programming for non-majors",
    },
    S313: {
      term: "Spring",
      number: "313",
      meets: "TuTh 15:30-16:50",
      title: "Tangible Interaction Design and Learning",
    },
    S314: {
      term: "Spring",
      number: "314",
      meets: "TuTh 9:30-10:50",
      title: "Tech & Human Interaction",
    },
  },
};




const App = () => {

  const [isDark, setDark] = useState(false);
  
  return (

    <div className={`min-h-screen p-4 ${isDark ? 'bg-gray-200' : 'bg-blue-100'}`}>


      <div className="flex justify-end mr-4">
        <button className="p-2 text-white bg-red-500" onClick={()=>setDark(!isDark)}>Change Color</button>
      </div>
    
      <Banner title={schedule.title} />
      <Catalog courses={schedule.courses} />

    </div>

)};

export default App;
