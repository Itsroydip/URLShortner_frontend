import React, { useEffect } from 'react'
import { useState } from 'react'
import styles from './Analytics.module.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'
import { analyticsData } from '../../services/url'


const Analytics = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await analyticsData();
        setUrls(data.analyticsData);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);



  return (
    <div className={styles.app}>
          <Sidebar/>
          <main className={styles.main_content}>
              <Header/> 

              <div className={styles.table_container}>
                  <table>
                    <thead>
                      <tr>
                        <th>Timestamp</th>
                        <th>Original Link</th>
                        <th>Short Link</th>
                        <th>Ip Address</th>
                        <th>User Device</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        urls.map((url) => (
                        <tr key={url._id}>
                          <td>
                            {
                              new Date(url.timestamp).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                                timeZone: 'UTC'
                              })
                            }

                          </td>

                          <td className={styles.link_cell}>
                            {
                              url.originalLink.length <= 30 ? 
                                 url.originalLink : 
                                 url.originalLink.substring(0, 27) + "..."
                            }
                          </td>

                          <td className={styles.link_cell}>
                            {
                              (import.meta.env.VITE_FRONTEND_URL + "/" + url.shortId).length <= 30 ?
                                import.meta.env.VITE_FRONTEND_URL + "/" + url.shortId :
                                (import.meta.env.VITE_FRONTEND_URL + "/" + url.shortId).substring(0, 27) + "..."
                            }
                          
                          </td>    

                          <td>
                            {url.ipAddress}
                          </td>

                          <td>
                            {url.userDevice}
                          </td>
                          
                        </tr>
                        
                      ))
                      }
                    </tbody>
                  </table>
              </div>
              
          </main>
          
    </div>
  )
}

export default Analytics;