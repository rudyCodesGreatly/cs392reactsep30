export function conflict(coursesInCart, newCourse) {
    const sameQuarterCourses = filterByQuarter(coursesInCart, newCourse.term);

    const arrayOfTimeConvertedCourseTuples = sameQuarterCourses.map((course) =>
        makeCourseObjectIntoTimeTuple(course)
    );

    const newCourseTimesRepresentedAsTuples = makeCourseObjectIntoTimeTuple(newCourse);

    for (const courseTimeTuples of arrayOfTimeConvertedCourseTuples) {
        for (const cartTimeTuple of courseTimeTuples) {
            for (const newTimeTuple of newCourseTimesRepresentedAsTuples) {
                if (timesOverlap(cartTimeTuple, newTimeTuple)) {
                    return true; // Conflict detected
                }
            }
        }
    }

    return false;
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

                break;
            }
        }
        return days;
    }

    function timeStringToHours(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours + minutes / 60;
    }

    const meets = course.meets;
    if (!meets) {
        return [];
    }

    const [daysPart, timesPart] = meets.split(' ');
    if (!timesPart) {
        return [];
    }

    const days = extractDays(meets);
    const [startTimeStr, endTimeStr] = timesPart.split('-');

    const startTime = timeStringToHours(startTimeStr);
    const endTime = timeStringToHours(endTimeStr);

    const timeTuples = [];

    for (const day of days) {
        const dayOffset = dayOffsets[day];
        if (dayOffset === undefined) {
            continue;
        }
        const absoluteStartTime = dayOffset + startTime;
        const absoluteEndTime = dayOffset + endTime;
        timeTuples.push([absoluteStartTime, absoluteEndTime]);
    }

    return timeTuples;
}


