function numberNotes(total, noteValue) {
    var rest = total % noteValue
    var totalNotes = (total - (rest)) / noteValue;
    var discounted = totalNotes * noteValue;
    return {
        totalNotes,
        rest,
        discounted
    };
}

const validateValue = (value) => {
    return value % 10 === 0;
}

function getNotes(total) {
    let notesAvailable = [100, 50, 20, 10];

    let rest = total;

    let notes = {
        100: 0,
        50: 0,
        20: 0,
        10: 0
    }

    while (rest != 0) {
        const noteValue = notesAvailable.shift();
        const result = numberNotes(rest, noteValue);
        rest = result.rest;
        notes[noteValue] = result.totalNotes;
    }
    return notes;

}

export default {
    getNotes,
    validateValue
};