import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

export default function Home() {
  const [activityData, setActivityData] = useState([]);
/*   useEffect(() => {
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

  console.log(activityData); */

  const displayActivityData = activityData.map((activity) => {
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
  })

  // Build the GitHub contributions calendar but for Strava workouts next. Areas to start would be the UI:
  // do a grid of super-small squares which change chade of color relative to how many workouts a day.
  // In this grid, each passing day creates a new square as well. A counter of 'contributions' per year is 
  // also shown above. 

  const ContributionGrids = () => {
    let columnArray = [];
    for (let transformXCoords = 0; transformXCoords < 52; transformXCoords++) {
      columnArray.push(
        <g transform={`translate(${transformXCoords*16}, 0)`}>
          <rect className={styles.tinyCard} x="16" y="0" rx="2" ry="2"></rect>
          <rect className={styles.tinyCard} x="16" y="15" rx="2" ry="2"></rect>
          <rect className={styles.tinyCard} x="16" y="30" rx="2" ry="2"></rect>
          <rect className={styles.tinyCard} x="16" y="45" rx="2" ry="2"></rect>
          <rect className={styles.tinyCard} x="16" y="60" rx="2" ry="2"></rect>
          <rect className={styles.tinyCard} x="16" y="75" rx="2" ry="2"></rect>
          <rect className={styles.tinyCard} x="16" y="90" rx="2" ry="2"></rect>
        </g>
      )
    }
    return (
      columnArray.map((column) => {
        return column;
      })
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
        <p className={styles.description}>A potential idea is doing the GitHub progress bar but for Strava. Another idea
        would include paying myself in Ethereum or something.</p>
        <svg className={styles.contributionGrid}>
          <ContributionGrids />
        </svg>
        <div className={styles.grid}>
          {displayActivityData}
        </div>
      </main>
    </div>
  )
}
