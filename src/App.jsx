// src/App.jsx
import React, { useState } from "react";
import Banner from "./components/Banner.jsx";
import Catalog from "./components/Catalog.jsx";
import { useJsonQuery } from './utilities/fetch';
import termSelector from "./components/termSelector.jsx";
import TermSelector from "./components/termSelector.jsx";

const App = () => {
  const [isDark, setDark] = useState(false);
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  const schedule = data;

  return (
    <div className={`min-h-screen p-4 ${isDark ? 'bg-gray-200' : 'bg-blue-100'}`}>
      <div className="flex justify-end mr-4">
        <button className="p-2 text-white bg-red-500" onClick={() => setDark(!isDark)}>
          Change Color
        </button>
          <TermSelector></TermSelector>
      </div>
      <Banner title={schedule.title} />
      <Catalog courses={schedule.courses} />
    </div>
  );
};

export default App;
