import styles from '../../styles/Home.module.css'

const Grids = ({ data, numWorkouts, displayClickedWorkout, clickedDate, ifEverClick }) => {
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
            data.map((activity) => {
              let startDate = activity.start_date_local.split("T")[0];
              if (startDate === currDate) {
                clickedDisplayBool = true;
              }
            })
            displayClickedWorkout(clickedDisplayBool);
            clickedDate(currDate);
            ifEverClick(true);
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
          data.filter(activity => activity.start_date_local.split("T")[0] === currDate)
            .map((activity) => {
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
          );
          numWorkouts(workouts);
          return day;
        })}
      </svg>
    )
  }

export default Grids