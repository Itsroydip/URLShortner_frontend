import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'


const Dashboard = () => {
    const [dateData, setDateData] = useState([
        { date: "21-01-25", clicks: 1234, width: "100%" },
        { date: "20-01-25", clicks: 1140, width: "85%" },
        { date: "19-01-25", clicks: 134, width: "25%" },
        { date: "18-01-25", clicks: 34, width: "15%" },
      ])
    
    const [deviceData, setDeviceData] = useState([
    { device: "Mobile", clicks: 134, width: "100%" },
    { device: "Destop", clicks: 40, width: "70%" },
    { device: "Tablet", clicks: 3, width: "20%" },
    ])
    
      useEffect(() => {
        // You can fetch real data here if needed
        // For now, we're using the static data defined in state
      }, [])


    
      const BarChart = ({ data, labelKey }) => (
        <div className={styles.chart}>

          {
          data.map((item, index) => (
            <div key={index} className={styles.bar_row}>
              <span>{item[labelKey]}</span>
              <div className={styles.bar_container}>
                <div className={styles.bar} style={{ width: item.width }}></div>
              </div>
              <span className={styles.clicks}>{item.clicks}</span>
            </div>
          ))
          }

        </div>
      )
    
      return (
        <div className={styles.app}>
             <Sidebar/>
            <main className={styles.main_content}>
                <Header/>           
    
                <div className={styles.stats}>
                    <h2>
                        Total Clicks <span className="total">1234</span>
                    </h2>
        
                    <div className={styles.charts}>
                        <div className={styles.chart_container}>
                        <h3>Date-wise Clicks</h3>
                        <BarChart data={dateData} labelKey="date" />
                        </div>
            
                        <div className={styles.chart_container}>
                        <h3>Click Devices</h3>
                        <BarChart data={deviceData} labelKey="device" />
                        </div>
                    </div>
                </div>
           </main>
    
          
        </div>
      )
}

export default Dashboard