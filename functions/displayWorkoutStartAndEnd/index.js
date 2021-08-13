import convertActivityToLocalStartTime from "../convertActivityToLocalStartTime"

function displayWorkoutStartAndEnd(date, elapsedTime) {
    let startTimeEpoch = new Date(date).getTime() / 1000
    let endTimeEpoch = startTimeEpoch + elapsedTime

    var startDateString = new Date(startTimeEpoch * 1000)
    var endDateString = new Date(endTimeEpoch * 1000)


    var startHour = startDateString.getHours();
/*     var startMin = startDateString.getMinutes();
    var startSec = startDateString.getSeconds(); */
    var startMin = startDateString.getMinutes() < 10 ? '0' + startDateString.getMinutes() : startDateString.getMinutes(); 
    var startSec = startDateString.getSeconds() < 10 ? '0' + startDateString.getSeconds() : startDateString.getSeconds();
    var startTime = startHour + ':' + startMin /* + ':' + startSec */ ;
    var convertedStartTime = convertActivityToLocalStartTime(startTime)



    var endHour = endDateString.getHours();
/*     var endMin = endDateString.getMinutes();
    var endSec = endDateString.getSeconds(); */
    var endMin = endDateString.getMinutes() < 10 ? '0' + endDateString.getMinutes() : endDateString.getMinutes(); 
    var endSec = endDateString.getSeconds() < 10 ? '0' + endDateString.getSeconds() : endDateString.getSeconds();
    var endTime = endHour + ':' + endMin/*  + ':' + endSec */ ;
    var convertedEndTime = convertActivityToLocalStartTime(endTime)

    let result = convertedStartTime.slice(0, -3) + " - " + convertedEndTime
    
    return result
}

export default displayWorkoutStartAndEnd