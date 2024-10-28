export function conflict(coursesInCart, newCourse) {
    // Filter courses in the same quarter/term as the new course
    const sameQuarterCourses = filterByQuarter(coursesInCart, newCourse.term);

    // Convert the courses in the cart to time tuples
    const arrayOfTimeConvertedCourseTuples = sameQuarterCourses.map((course) =>
        makeCourseObjectIntoTimeTuple(course)
    );

    // Get the time tuples for the new course
    const newCourseTimesRepresentedAsTuples = makeCourseObjectIntoTimeTuple(newCourse);

    // Check for conflicts
    for (const courseTimeTuples of arrayOfTimeConvertedCourseTuples) {
        for (const cartTimeTuple of courseTimeTuples) {
            for (const newTimeTuple of newCourseTimesRepresentedAsTuples) {
                if (timesOverlap(cartTimeTuple, newTimeTuple)) {
                    return true; // Conflict detected
                }
            }
        }
    }

    return false; // No conflicts found
}

function timesOverlap(tuple1, tuple2) {
    const [start1, end1] = tuple1;
    const [start2, end2] = tuple2;

    // Two intervals [start1, end1] and [start2, end2] overlap if:
    // The maximum of the start times is less than the minimum of the end times.
    return Math.max(start1, start2) < Math.min(end1, end2);
}


function filterByQuarter(courses, newCourseTerm) {
    return courses.filter(course => course.term.toLowerCase() === newCourseTerm.toLowerCase());
}

function makeCourseObjectIntoTimeTuple(course) {
    const dayOffsets = {
        'M': 0,
        'Tu': 24,
        'W': 48,
        'Th': 72,
        'F': 96,
        'Sa': 120,
        'Su': 144
    };

    // Helper function to extract days from the 'meets' string
    function extractDays(meets) {
        const dayAbbreviations = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];
        const days = [];

        let dayString = meets.split(' ')[0];

        while (dayString.length > 0) {
            let matched = false;
            for (const day of dayAbbreviations) {
                if (dayString.startsWith(day)) {
                    days.push(day);
                    dayString = dayString.slice(day.length);
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                // Break to avoid infinite loop if no day abbreviation matches
                break;
            }
        }
        return days;
    }

    // Helper function to convert time strings to hour fractions
    function timeStringToHours(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours + minutes / 60;
    }

    // Begin parsing the course 'meets' string
    const meets = course.meets;
    if (!meets) {
        return []; // Return empty array if no 'meets' information
    }

    const [daysPart, timesPart] = meets.split(' ');
    if (!timesPart) {
        return []; // Return empty array if times are missing
    }

    const days = extractDays(meets);
    const [startTimeStr, endTimeStr] = timesPart.split('-');

    const startTime = timeStringToHours(startTimeStr);
    const endTime = timeStringToHours(endTimeStr);

    const timeTuples = [];

    for (const day of days) {
        const dayOffset = dayOffsets[day];
        if (dayOffset === undefined) {
            continue; // Skip if day abbreviation is unrecognized
        }
        const absoluteStartTime = dayOffset + startTime;
        const absoluteEndTime = dayOffset + endTime;
        timeTuples.push([absoluteStartTime, absoluteEndTime]);
    }

    return timeTuples;
}


