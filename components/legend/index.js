import styles from '../../styles/Home.module.css'

const Legend = () => {
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

export default Legend