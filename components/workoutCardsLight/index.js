import styles from '../../styles/Home.module.css'
import Bike from '../../public/light/bike_strava.png'
import Running from '../../public/light/running_strava.png'
import Weights from '../../public/light/weights_strava.png'
import displayStartAndEndTime from '../../functions/displayStartAndEndTime'

const WorkoutCardsLight = ({ data }) => {
    return (
        <>
          <p className={styles.workoutDescription}><b>Workouts</b></p>
          <div className={styles.grid}>
            {data.map((activity) => {
                let displayWorkoutTimes = displayStartAndEndTime(activity.start_date, activity.elapsed_time)
                let startDate = activity.start_date_local.split("T")[0];
                if (activity.type == "Run") {
                  let distanceInMiles = (activity.distance / 1609.34).toFixed(2);
                  let averageSpeedInMph = (activity.average_speed * 2.23694).toFixed(2);
                  let paceSeconds = Math.round(activity.moving_time / distanceInMiles);
                  let averagePace = Math.floor(paceSeconds / 60)
                  paceSeconds -= averagePace * 60
                  if (paceSeconds < 10) {
                    paceSeconds = "0" + paceSeconds.toString()
                  } else {
                    paceSeconds = paceSeconds.toString()
                  }
                  averagePace = averagePace.toString() + ":" + paceSeconds
                  return (
                    <div className={styles.clickedCard}>   
                      <img src={Running} width="25%" height="25%"></img>
                      <p><b className={styles.workoutDate}>{startDate}</b></p>
                      <br></br>
                      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <div>
                          <i>Workout Time</i>
                          <p>{displayWorkoutTimes}</p>
                        </div>
                        <br></br>
                        <div>
                          <i>Distance</i>
                          <p>{`${distanceInMiles} miles`}</p>
                        </div>
                      </div>
                      <br></br>
                      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <div>
                          <i>Average Speed</i>
                          <p>{`${averageSpeedInMph} mph`}</p>
                        </div>
                        <br></br>
                        <div>
                          <i>Average Pace</i>
                          <p>{`${averagePace} /mi`}</p>
                        </div>
                      </div>
                    </div>
                  )
                } else if (activity.type == "Ride") {
                  let distanceInMiles = (activity.distance / 1609.34).toFixed(2);
                  let averageSpeedInMph = (activity.average_speed * 2.23694).toFixed(2);
                  let paceSeconds = Math.round(activity.moving_time / distanceInMiles);
                  let averagePace = Math.floor(paceSeconds / 60)
                  paceSeconds -= averagePace * 60
                  if (paceSeconds < 10) {
                    paceSeconds = "0" + paceSeconds.toString()
                  } else {
                    paceSeconds = paceSeconds.toString()
                  }
                  averagePace = averagePace.toString() + ":" + paceSeconds
                  return (
                    <div className={styles.clickedCard}>   
                      <img src={Bike} width="25%" height="25%"></img>
                      <p><b className={styles.workoutDate}>{`${startDate}`}</b></p>
                      <br></br>
                      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <div>
                          <i>Workout Time</i>
                          <p>{displayWorkoutTimes}</p>
                        </div>
                        <br></br>
                        <div>
                          <i>Distance</i>
                          <p>{`${distanceInMiles} miles`}</p>
                        </div>
                      </div>
                      <br></br>
                      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <div>
                          <i>Average Speed</i>
                          <p>{`${averageSpeedInMph} mph`}</p>
                        </div>
                        <br></br>
                        <div>
                          <i>Average Pace</i>
                          <p>{`${averagePace} /mi`}</p>
                        </div>
                      </div>
                    </div>
                  )
                } else if (activity.type == "WeightTraining") {
                  return (
                    <div className={styles.clickedCard}>
                      <img src={Weights} width="25%" height="25%" ></img>
                      <p><b className={styles.workoutDate}>{`${startDate}`}</b></p>
                      <br></br>
                      <div>
                        <i>Workout Time</i>
                        {/* <p>{displayWorkoutTimes}</p> */}
                        {
                          (Math.floor(activity.elapsed_time / 60) > 59) 
                          ?
                            <p>{Math.floor(activity.elapsed_time / 60 / 60)} hour, {Math.floor(activity.elapsed_time / 60) - Math.floor(activity.elapsed_time / 60 / 60) * 60} minutes</p>
                          :
                            <p>{Math.floor(activity.elapsed_time / 60)} minutes</p>
                        }
                      </div>
                      <br></br>
                      <div>
                          <i>Exercises</i>
                          {
                            activity.name.split("\n").map(exercise => {
                              let exerciseName = exercise.split(":")[0]
                              let exerciseAmount = exercise.split(":")[1]
                              return (
                                <p style={{ textAlign: 'center' }}><u>{exerciseName}</u>:{exerciseAmount}</p>
                              )
                            })
                          }
                      </div>
                    </div>
                  )
                }
            })}
          </div>
        </>
    )
}

export default WorkoutCardsLight