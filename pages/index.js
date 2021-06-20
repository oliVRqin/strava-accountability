import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [activityData, setActivityData] = useState([]);
  const [displayClickedWorkout, setDisplayClickedWorkout] = useState(false);
  const [displayGrid, setDisplayGrid] = useState(true);
  const [clickedDate, setClickedDate] = useState(null);
  const [numWorkouts, setNumWorkouts] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [ifEverClick, setIfEverClick] = useState(false);

  useEffect(() => {
      async function fetchAPI() {
          const post_url = `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${process.env.NEXT_PUBLIC_REFRESH_TOKEN}`
          const post_response = await fetch(post_url, { method: "POST" })
          const post_data = await post_response.json();
          const url = `${process.env.NEXT_PUBLIC_URL}?per_page=200&access_token=${post_data.access_token}`;
          const response = await fetch(url);
          const data = await response.json();
          setActivityData(data);
      }
      fetchAPI();
  }, [])

  useEffect(() => {
    if (isDark) {
      document.body.style.background = "black";
      document.body.style.color = "beige";
    } else {
      document.body.style.background = "white";
      document.body.style.color = "black";
    }
  })

  useEffect(() => {
    window.onresize = () => {
      setDisplayGrid(window.innerWidth > 830 ? true : false)
    }
    setDisplayGrid(window.innerWidth > 830 ? true : false)
  })
  

  const DisplayActivityData = () => {
    return (
      <div className={styles.grid}>
        {activityData.map((activity) => {
        if (activity.type == "Run" || activity.type == "Ride") {
          let movingTime = activity.moving_time;
          let movingTimeHours = Math.floor(movingTime/3600);
          movingTime = movingTime - (3600 * movingTimeHours);
          let movingTimeMinutes = Math.floor(movingTime/60);
          movingTime = movingTime - (60 * movingTimeMinutes);
          let distanceInMiles = (activity.distance / 1609.34).toFixed(2);
          let averageSpeedInMph = (activity.average_speed * 2.23694).toFixed(2);
          let startDate = activity.start_date_local.split("T")[0];
          let startTime = activity.start_date_local.split("T")[1].substring(0, activity.start_date_local.split("T")[1].length - 1);
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
          return (
            <div className={styles.card}>
              <p><b className={styles.workoutDate}>{`${startDate}`}</b></p>
              <p>{`${activity.type}`}</p>
              <p>{`Start: ${startTime}`}</p>
              <p>{`Distance: ${distanceInMiles} miles`}</p>
              <p>{`Average Speed: ${averageSpeedInMph} mph`}</p>
              <p>{(movingTimeHours > 0) ? `Workout Time: ${movingTimeHours} Hours, ${movingTimeMinutes} Minutes, ${movingTime} Seconds` : `Workout Time: ${movingTimeMinutes} Minutes, ${movingTime} Seconds`}</p>
            </div>
          )
        } else if (activity.type == "WeightTraining") {
          let movingTime = activity.moving_time;
          let movingTimeHours = Math.floor(movingTime/3600);
          movingTime = movingTime - (3600 * movingTimeHours);
          let movingTimeMinutes = Math.floor(movingTime/60);
          movingTime = movingTime - (60 * movingTimeMinutes);
          let startDate = activity.start_date_local.split("T")[0];
          let startTime = activity.start_date_local.split("T")[1].substring(0, activity.start_date_local.split("T")[1].length - 1);
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
          return (
            <div className={styles.card}>
              <p><b className={styles.workoutDate}>{`${startDate}`}</b></p>
              <p>{`${activity.type.replace(/([a-z])([A-Z])/, 't T')}`}</p>
              <p>{`Start: ${startTime}`}</p>
              <p>{(movingTimeHours > 0) ? `Workout Time: ${movingTimeHours} Hours, ${movingTimeMinutes} Minutes, ${movingTime} Seconds` : `Workout Time: ${movingTimeMinutes} Minutes, ${movingTime} Seconds`}</p>
            </div>
          )
        }
      })}
      </div>
    )
  }

  const DisplayClickedActivityData = () => {
    return (
      <div className={styles.clickedGrid}>
        {activityData.map((activity) => {
          let startDate = activity.start_date_local.split("T")[0];
          if (startDate === clickedDate) {
            if (activity.type == "Run" || activity.type == "Ride") {
              let movingTime = activity.moving_time;
              let movingTimeHours = Math.floor(movingTime/3600);
              movingTime = movingTime - (3600 * movingTimeHours);
              let movingTimeMinutes = Math.floor(movingTime/60);
              movingTime = movingTime - (60 * movingTimeMinutes);
              let distanceInMiles = (activity.distance / 1609.34).toFixed(2);
              let averageSpeedInMph = (activity.average_speed * 2.23694).toFixed(2);
              let startDate = activity.start_date_local.split("T")[0];
              let startTime = activity.start_date_local.split("T")[1].substring(0, activity.start_date_local.split("T")[1].length - 1);
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
              return (
                <div className={styles.clickedCard}>
                  <p><b className={styles.workoutDate}>{`${startDate}`}</b></p>
                  <p>{`${activity.type}`}</p>
                  <p>{`Start: ${startTime}`}</p>
                  <p>{`Distance: ${distanceInMiles} miles`}</p>
                  <p>{`Average Speed: ${averageSpeedInMph} mph`}</p>
                  <p>{(movingTimeHours > 0) ? `Workout Time: ${movingTimeHours} Hours, ${movingTimeMinutes} Minutes, ${movingTime} Seconds` : `Workout Time: ${movingTimeMinutes} Minutes, ${movingTime} Seconds`}</p>
                </div>
              )
            } else if (activity.type == "WeightTraining") {
              let movingTime = activity.moving_time;
              let movingTimeHours = Math.floor(movingTime/3600);
              movingTime = movingTime - (3600 * movingTimeHours);
              let movingTimeMinutes = Math.floor(movingTime/60);
              movingTime = movingTime - (60 * movingTimeMinutes);
              let startDate = activity.start_date_local.split("T")[0];
              let startTime = activity.start_date_local.split("T")[1].substring(0, activity.start_date_local.split("T")[1].length - 1);
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
              return (
                <div className={styles.clickedCard}>
                  <p><b className={styles.workoutDate}>{`${startDate}`}</b></p>
                  <p>{`${activity.type.replace(/([a-z])([A-Z])/, 't T')}`}</p>
                  <p>{`Start: ${startTime}`}</p>
                  <p>{(movingTimeHours > 0) ? `Workout Time: ${movingTimeHours} Hours, ${movingTimeMinutes} Minutes, ${movingTime} Seconds` : `Workout Time: ${movingTimeMinutes} Minutes, ${movingTime} Seconds`}</p>
                </div>
              )
            }
          }
      })}
      </div>
    )
  }

  const ContributionGrids = () => {
    let workouts = 0;
    let daysArray = [];
    for (let transformXCoords = 0; transformXCoords < 365; transformXCoords++) {
      daysArray.push(
        <rect 
          className={styles.tinyCard} 
          style={{ fill: '#d3d5d8' }}
          onClick={() => {
            let date = (d => new Date(d.setDate(d.getDate() - transformXCoords)))(new Date);
            let currDate = JSON.stringify(date).substring(1).split("T")[0];
            let clickedDisplayBool = false;
            activityData.map((activity) => {
              let startDate = activity.start_date_local.split("T")[0];
              if (startDate === currDate) {
                clickedDisplayBool = true;
              }
            })
            setDisplayClickedWorkout(clickedDisplayBool);
            setClickedDate(currDate);
            setIfEverClick(true);
          }}
          x={780 - (Math.floor((transformXCoords - 1) / 7) * 15)} 
          y={90 - ((transformXCoords - 1) * 15 - (Math.floor((transformXCoords - 1) / 7) * 105))} 
          rx="2" 
          ry="2" 
          date={(d => new Date(d.setDate(d.getDate() - transformXCoords)))(new Date)}>
        </rect>
      )
    }
    return (
      <svg className={styles.contributionGrid}>
        {daysArray.map((day) => {
          Date.prototype.toJSON = function(){
              const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
              this.setHours(hoursDiff);
              return this.toISOString();
          };
          let currDate = JSON.stringify(day.props.date).substring(1).split("T")[0]; 
          activityData.map((activity) => {
            let startDate = activity.start_date_local.split("T")[0];
            if (startDate === currDate) {
              workouts++;
              if (activity.type == "Run") {
                day.props.style.fill = 'limegreen';
              } else if (activity.type == "Ride") {
                day.props.style.fill = 'royalblue';
              } else if (activity.type == "WeightTraining") {
                day.props.style.fill = 'red';
              } else {
                day.props.style.fill = 'brown';
              }
            }
          });
          setNumWorkouts(workouts);
          return day;
        })}
      </svg>
    )
  }

  const ContributionLegend = () => {
    return (
      <div className={styles.legend}>
        <div className={styles.legend}>
          <svg className={styles.legendDemo}>
            <rect className={styles.legendCard} style={{ fill: '#d3d5d8' }} x="15" y="17" rx="2" ry="2"></rect>
          </svg>
          <p>None</p>
        </div>
        <div className={styles.legend}>
          <svg className={styles.legendDemo}>
          <rect className={styles.legendCard} style={{ fill: 'limegreen' }} x="15" y="17" rx="2" ry="2"></rect>
          </svg>
          <p>Run</p>
        </div>
        <div className={styles.legend}>
          <svg className={styles.legendDemo}>
          <rect className={styles.legendCard} style={{ fill: 'royalblue' }} x="15" y="17" rx="2" ry="2"></rect>
          </svg>
          <p>Bike</p>
        </div>
        <div className={styles.legend}>
          <svg className={styles.legendDemo}>
            <rect className={styles.legendCard} style={{ fill: 'red' }} x="15" y="17" rx="2" ry="2"></rect>
          </svg>
          <p>Lift</p>
        </div>
        <div className={styles.legend}>
          <svg className={styles.legendDemo}>
            <rect className={styles.legendCard} style={{ fill: 'brown' }} x="15" y="17" rx="2" ry="2"></rect>
          </svg>
          <p>Other</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Strava API App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span onClick={() => {setIsDark(!isDark)}} className={styles.slider}></span>
        </label>
        <br></br>
        <h1 className={styles.title}>Strava API Workout Visualizer</h1>
        {
          displayGrid && 
          <>
            <p className={styles.description}><b>{numWorkouts}</b> workouts in the past year</p>
            <ContributionGrids />
            <ContributionLegend />
            {displayClickedWorkout && <DisplayClickedActivityData />}
            {!displayClickedWorkout && !ifEverClick && <p className={styles.description}>Click on a <b>square</b> to see what workout I did on that specific day!</p>}
            {
              !displayClickedWorkout && 
              ifEverClick && 
              <div className={styles.clickedCard}>
                <p><b className={styles.workoutDate}>{clickedDate}</b></p>
                <p>No workout on this day!</p>
              </div>
            }
          </>
        }
        {!displayGrid && <><p className={styles.workoutDescription}><b>Workouts</b></p><DisplayActivityData /></>}
      </main>
    </div>
  )
}
