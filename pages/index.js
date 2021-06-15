import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

export default function Home() {
  const [activityData, setActivityData] = useState([]);
  useEffect(() => {
      async function fetchAPI() {
        const url = `${process.env.NEXT_PUBLIC_URL}?per_page=200&access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.message == "Authorization Error") {
          console.log("auth error triggered");
          const post_url = `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${process.env.NEXT_PUBLIC_REFRESH_TOKEN}`
          const post_response = await fetch(post_url, { method: "POST" })
          const post_data = await post_response.json();
          const url = `${process.env.NEXT_PUBLIC_URL}?per_page=200&access_token=${post_data.access_token}`;
          const response = await fetch(url);
          const data = await response.json();
          setActivityData(data);
        } else {
          setActivityData(data);
        }
      }
      fetchAPI();
  }, [])

  console.log(activityData);

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
          return (
            <div className={styles.card}>
              <p>{`Activity Description: ${activity.name}`}</p>
              <p>{`Activity Type: ${activity.type}`}</p>
              <p>{`Start Date: ${startDate}`}</p>
              <p>{`Start Time: ${startTime}`}</p>
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
          return (
            <div className={styles.card}>
              <p>{`Activity Description: ${activity.name}`}</p>
              <p>{`Activity Type: ${activity.type.replace(/([a-z])([A-Z])/, 't T')}`}</p>
              <p>{`Start Date: ${startDate}`}</p>
              <p>{`Start Time: ${startTime}`}</p>
              <p>{(movingTimeHours > 0) ? `Workout Time: ${movingTimeHours} Hours, ${movingTimeMinutes} Minutes, ${movingTime} Seconds` : `Workout Time: ${movingTimeMinutes} Minutes, ${movingTime} Seconds`}</p>
            </div>
          )
        }
      })}
      </div>
    )
  }

  // Next tasks: Modify the GitHub contributions calendar so that we see the days of the week on the y-axis 
  // (in a similar manner to how GitHub does it). Months as well if possible. Include a simple legend which says that 
  // orange means exercised that day and red means not exercised. Also include a counter of 'contributions' per year 
  // shown above. Finally, make it responsive (check out how GitHub does it, seems like overflow scroll-x?). In the future,
  // maybe we could have different colors on the grid for different types of workouts?

  const ContributionGrids = () => {
    let daysArray = [];
    for (let transformXCoords = 0; transformXCoords < 365; transformXCoords++) {
      daysArray.push(
        <rect 
          className={styles.tinyCard} 
          style={{ fill: 'red' }}
          x={780 - (Math.floor((transformXCoords-1)/7)*15)} 
          y={90 - ((transformXCoords-1)*15-(Math.floor((transformXCoords-1)/7)*105))} 
          rx="2" 
          ry="2" 
          date={(d => new Date(d.setDate(d.getDate() - transformXCoords)))(new Date)}>
        </rect>
      )
    }
    return (
      <svg className={styles.contributionGrid}>
        {daysArray.map((day) => {
          let currDate = JSON.stringify(day.props.date).substring(1).split("T")[0];
          // console.log(currDate);
          // console.log(day);
          activityData.map((activity) => {
            let startDate = activity.start_date_local.split("T")[0];
            if (startDate === currDate) {
              day.props.style.fill = 'orange';
            }
          });
          return day;
        })}
      </svg>
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
        <h1 className={styles.title}>Strava Accountability App</h1>
        <p className={styles.description}>Every mile I run, or day I lift, I will reward myself in some way.</p>
        <ContributionGrids />
        <DisplayActivityData />
      </main>
    </div>
  )
}
