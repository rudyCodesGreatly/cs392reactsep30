import React from "react";
import { useQuery } from '@tanstack/react-query';

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw response;
  return response.json();
};

export const useJsonQuery = (url) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [url],
    queryFn: () => fetchJson(url)
  });

  return [ data, isLoading, error ];
};


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
              {" "}
              {course.term} {courseID}
            </h2>
            <p className="mt-2">
              <span className="text-large font-semibold"></span> {course.title}
            </p>
          </div>

          <div>
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <p>
              <span className="font-medium"></span> {course.meets}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};

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
