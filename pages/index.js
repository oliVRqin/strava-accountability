import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState, useRef } from 'react';

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

/*   const hasExercisedOnDay = () => {
    return (

    )
  } */

  const ContributionGrids = () => {
    const itemsRef = useRef([]);
    let today = new Date();
    //console.log(today.getMonth() + 1);
    //console.log(today.getDate());
    //console.log(today.getFullYear());
    let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    //console.log(date);
    // console.log(today.setDate(today.getDate() - 1));
    /* let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
    console.log(yesterday); */
/*     activityData.map((activity) => {
      console.log(activity);
    }); */
    let columnArray = [];
    //for (let transformXCoords = 0; transformXCoords < 52; transformXCoords++) {
    for (let transformXCoords = 0; transformXCoords < 365; transformXCoords++) {
/*       columnArray.push(
        <g transform={`translate(${816 - (transformXCoords * 16)}, 0)`}>
          <rect ref={el => itemsRef.current[transformXCoords] = el} className={styles.tinyCard} x="0" y="0" rx="2" ry="2" date-data={(d => new Date(d.setDate(d.getDate() - 6 - (7 * transformXCoords))))(new Date)}></rect>
          <rect className={styles.tinyCard} x="0" y="15" rx="2" ry="2" date-data={(d => new Date(d.setDate(d.getDate() - 5 - (7 * transformXCoords))))(new Date)}></rect>
          <rect className={styles.tinyCard} x="0" y="30" rx="2" ry="2" date-data={(d => new Date(d.setDate(d.getDate() - 4 - (7 * transformXCoords))))(new Date)}></rect>
          <rect className={styles.tinyCard} x="0" y="45" rx="2" ry="2" date-data={(d => new Date(d.setDate(d.getDate() - 3 - (7 * transformXCoords))))(new Date)}></rect>
          <rect className={styles.tinyCard} x="0" y="60" rx="2" ry="2" date-data={(d => new Date(d.setDate(d.getDate() - 2 - (7 * transformXCoords))))(new Date)}></rect>
          <rect className={styles.tinyCard} x="0" y="75" rx="2" ry="2" date-data={(d => new Date(d.setDate(d.getDate() - 1 - (7 * transformXCoords))))(new Date)}></rect>
          <rect className={styles.tinyCard} x="0" y="90" rx="2" ry="2" date-data={(d => new Date(d.setDate(d.getDate() - (7 * transformXCoords))))(new Date)}></rect>
        </g>
      ) */
      columnArray.push(
        <rect ref={el => itemsRef.current[transformXCoords] = el} className={styles.tinyCard} x={780 - (Math.floor((transformXCoords-1)/7)*15)} y={90 - ((transformXCoords-1)*15-(Math.floor((transformXCoords-1)/7)*105))} rx="2" ry="2" date={(d => new Date(d.setDate(d.getDate() - transformXCoords)))(new Date)}></rect>
      )
    }
    //setDayArray(columnArray);
    //console.log(itemsRef.current);
    //console.log(columnArray);
    //console.log(dayArray);
    return (
      columnArray.map((column) => {
        //console.log((column.props.date).split("T")[0]);
        let currDate = JSON.stringify(column.props.date).substring(1).split("T")[0];
        console.log(currDate);
/*         console.log(refID);
        console.log(itemsRef.length); */
        activityData.map((activity) => {
          let startDate = activity.start_date_local.split("T")[0];
          //console.log("Activity", activity);

          //console.log("Column Object Values (Children)", Object.values(column).getProperties());
          
/*           if (startDate === columnDate) {
            host of columnDate turns from classname of tinycard to tinycardExercised
          } */
        });
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
