/**
 * Takes a 24-hour formatted time and returns a 12-hour formatted time with AM/PM 
 * @param {string} time - a string which displays the time in hh:mm 24-hour format
 * @returns a string of the time converted into a 12-hour AM/PM format
 */
function convertToAmPm(time) {
    if (parseInt(time.substring(0, 2)) >= 12) {
        if (parseInt(time.substring(0, 2)) >= 13) {
            time = time.replace(time.substring(0, 2), (parseInt(time.substring(0, 2)) % 12).toString());
        }
        time += " PM";
    } else {
        if (parseInt(time.substring(0, 2)) == 0) {
            time = time.replace(time.substring(0, 2), "12");
        }
        time += " AM";
    }
    return time
}

export default convertToAmPm