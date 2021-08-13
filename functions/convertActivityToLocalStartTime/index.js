

function convertActivityToLocalStartTime(startTime) {
    // let startTime = activity.start_date_local.split("T")[1].substring(0, activity.start_date_local.split("T")[1].length - 1)
    // console.log(startTime)
    if (parseInt(startTime.substring(0, 2)) >= 12) {
        if (parseInt(startTime.substring(0, 2)) >= 13) {
            startTime = startTime.replace(startTime.substring(0, 2), (parseInt(startTime.substring(0, 2)) % 12).toString());
        }
        startTime += " PM";
    } else {
        if (parseInt(startTime.substring(0, 2)) == 0) {
            startTime = startTime.replace(startTime.substring(0, 2), "12");
        }
        startTime += " AM";
    }
    return startTime
}

export default convertActivityToLocalStartTime