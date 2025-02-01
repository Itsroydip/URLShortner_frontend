import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'
import { getDateWiseClicks, getDeviceInfo } from '../../services/url'


const Dashboard = () => {
    const [totalClicks, setTotalClicks] = useState(0);
    const [dateData, setDateData] = useState([]);    
    const [deviceData, setDeviceData] = useState([
    { device: "Mobile", clicks: 134, width: "100%" },
    { device: "Destop", clicks: 40, width: "70%" },
    { device: "Tablet", clicks: 3, width: "20%" },
    ])
    
      useEffect( () => {
        const fetchDateData = async ()=>{
          const data = await getDateWiseClicks();
          setDateData(data);
          
        }

        const fetchDeviceData = async ()=>{
          const data = await getDeviceInfo();
          console.log(data);
          setDeviceData(data[0].devices);
          setTotalClicks(data[0].totalClicks);
        }

        fetchDateData();
        fetchDeviceData();
        
      }, [])


    
      const BarChart = ({ data, labelKey }) => (
        <div className={styles.chart}>

          {
          data.map((item, index) => (
            <div key={index} className={styles.bar_row}>
              <span>{item[labelKey]}</span>
              <div className={styles.bar_container}>
                <div className={styles.bar} style={{ width: `${(item.clicks / totalClicks *100)}%` }}></div>
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
                        Total Clicks <span className={styles.total}> {totalClicks} </span>
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