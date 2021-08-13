import styles from '../../styles/Home.module.css'
import Bike from '../../public/light/bike_strava.png'
import Running from '../../public/light/running_strava.png'
import Weights from '../../public/light/weights_strava.png'
import convertActivityToLocalStartTime from '../../functions/convertActivityToLocalStartTime'

const ClickedWorkoutCardLight = ({ data, clickedDate }) => {
    return (
      <div className={styles.clickedGrid}>
        {data.filter(activity => activity.start_date_local.split("T")[0] === clickedDate)
          .map((activity) => {
              let movingTime = activity.moving_time;
              let movingTimeHours = Math.floor(movingTime / 3600);
              movingTime = movingTime - (3600 * movingTimeHours);
              let movingTimeMinutes = Math.floor(movingTime / 60);
              movingTime = movingTime - (60 * movingTimeMinutes);
              let startDate = activity.start_date_local.split("T")[0];
              let startTime = convertActivityToLocalStartTime(activity);
              if (activity.type == "Run" || activity.type == "Ride") {
                let distanceInMiles = (activity.distance / 1609.34).toFixed(2);
                let averageSpeedInMph = (activity.average_speed * 2.23694).toFixed(2);
                if (activity.type == "Run") {
                  return (
                    <div className={styles.clickedCard}>   
                      <img src={Running} width="25%" height="25%"></img>
                      <p><b className={styles.workoutDate}>{`${startDate}`}</b></p>
                      <p>{`Start: ${startTime}`}</p>
                      <p>{`Distance: ${distanceInMiles} miles`}</p>
                      <p>{`Average Speed: ${averageSpeedInMph} mph`}</p>
                      <p>{(movingTimeHours > 0) ? `Workout Time: ${movingTimeHours} Hours, ${movingTimeMinutes} Minutes, ${movingTime} Seconds` : `Workout Time: ${movingTimeMinutes} Minutes, ${movingTime} Seconds`}</p>
                    </div>
                  )
                } else {
                  return (
                    <div className={styles.clickedCard}>   
                      <img src={Bike} width="25%" height="25%"></img>
                      <p><b className={styles.workoutDate}>{`${startDate}`}</b></p>
                      <p>{`Start: ${startTime}`}</p>
                      <p>{`Distance: ${distanceInMiles} miles`}</p>
                      <p>{`Average Speed: ${averageSpeedInMph} mph`}</p>
                      <p>{(movingTimeHours > 0) ? `Workout Time: ${movingTimeHours} Hours, ${movingTimeMinutes} Minutes, ${movingTime} Seconds` : `Workout Time: ${movingTimeMinutes} Minutes, ${movingTime} Seconds`}</p>
                    </div>
                  )
                }
              } else if (activity.type == "WeightTraining") {
                return (
                  <div className={styles.clickedCard}>
                    <img src={Weights} width="25%" height="25%" ></img>
                    <p><b className={styles.workoutDate}>{`${startDate}`}</b></p>
                    <p>{`Start: ${startTime}`}</p>
                    <p>{(movingTimeHours > 0) ? `Workout Time: ${movingTimeHours} Hours, ${movingTimeMinutes} Minutes, ${movingTime} Seconds` : `Workout Time: ${movingTimeMinutes} Minutes, ${movingTime} Seconds`}</p>
                  </div>
                )
              }
            }
          )
        }
      </div>
    )
}

export default ClickedWorkoutCardLight