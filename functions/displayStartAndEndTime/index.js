import convertToAmPm from "../convertToAmPm"

/**
 * Takes a date and an elapsed number of seconds and returns the start and end of the time interval
 * @param {string} date - a string containing the date and time in the ISO-8601 format
 * @param {number} elapsedTime - a number representing the number of seconds elapsed
 * @returns a string showing the start and end of the time interval in a 12-hour format
 */
function displayStartAndEndTime(date, elapsedTime) {
    let startTimeEpoch = new Date(date).getTime() / 1000
    let endTimeEpoch = startTimeEpoch + elapsedTime

    var startDateString = new Date(startTimeEpoch * 1000)
    var endDateString = new Date(endTimeEpoch * 1000)

    var startHour = startDateString.getHours();
    var startMin = startDateString.getMinutes() < 10 ? '0' + startDateString.getMinutes() : startDateString.getMinutes(); 
    var startTime = startHour + ':' + startMin;
    var convertedStartTime = convertToAmPm(startTime)

    var endHour = endDateString.getHours();
    var endMin = endDateString.getMinutes() < 10 ? '0' + endDateString.getMinutes() : endDateString.getMinutes(); 
    var endTime = endHour + ':' + endMin;
    var convertedEndTime = convertToAmPm(endTime)

    if (convertedStartTime.slice(-2) === "AM" && convertedEndTime.slice(-2) === "PM"
    || convertedStartTime.slice(-2) === "PM" && convertedEndTime.slice(-2) === "AM") {
        return convertedStartTime + " - " + convertedEndTime
    } else {
        return convertedStartTime.slice(0, -3) + " - " + convertedEndTime
    }
}

export default displayStartAndEndTime