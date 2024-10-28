export const validateTitle = (value) => {
    if (value.length < 2) {
        return 'Course title must be at least 2 characters long';
    }
    return '';
};

export const validateMeets = (value) => {
    const meetsRegex = /^(M|Tu|W|Th|F|Sa|Su)+\s\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;

    if (value !== '' && !meetsRegex.test(value)) {
        return 'Meeting time must have one or more valid days and a non-empty time range (e.g., "MWF 10:00-11:00")';
    }
    return '';
};
