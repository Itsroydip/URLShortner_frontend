import React, { useEffect } from 'react'
import { useState, useMemo } from 'react'
import styles from './Links.module.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'
import EditModal from '../../components/editmodal/EditModal'
import DeleteModal from '../../components/deletemodal/DeleteModal'
import { Pencil, Trash2, Copy } from "lucide-react"
import { fetchUrls} from '../../services/url'
import toast from 'react-hot-toast'


const Links = () => {
  const [urls, setUrls] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [content, setContent] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [totalCount, setTotalCount] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUrls(currentPage,pageSize);
        setUrls(data.data);
        setTotalCount(data.totalCount);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [isEditing, currentPage]);

  const handleCopy = (url) =>{ 
    navigator.clipboard.writeText(import.meta.env.VITE_FRONTEND_URL + "/" + url.shortId);
    toast.success("Link copied to clipboard");

  }

  const handleEdit = (url) => {
    setContent(url);
    setIsEditing(true);

  }

  const handleDelete = (url) => {
    setContent(url);
    setIsDeleting(true);
  }

  //Pagination Logic
  const totalPages = Math.ceil(totalCount/pageSize);
  const pageNumbers = useMemo(() => {
    let numbers = [];
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i)
    }
    return numbers
  }, [totalCount]);



  return (
    <div className={styles.app}>
          <Sidebar/>
          <main className={styles.main_content}>
              <Header/> 
              
              <EditModal isOpen={isEditing} setIsOpen={setIsEditing} url={content}/>
              <DeleteModal isOpen={isDeleting} setIsOpen={setIsDeleting} id={content._id}/>

              <div className={styles.table_container}>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Original Link</th>
                        <th>Short Link</th>
                        <th>Remarks</th>
                        <th>Clicks</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        urls.map((url) => (
                        <tr key={url._id}>
                          <td>
                            {
                              new Date(url.createdAt).toLocaleString('en-US', {
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
                              url.redirectUrl.length <= 15 ? 
                                 url.redirectUrl : 
                                 url.redirectUrl.substring(0, 12) + "..."
                            }
                          </td>

                          <td className={styles.link_cell}>
                            {
                              (import.meta.env.VITE_FRONTEND_URL + "/" + url.shortId).length <= 15 ?
                                import.meta.env.VITE_FRONTEND_URL + "/" + url.shortId :
                                (import.meta.env.VITE_FRONTEND_URL + "/" + url.shortId).substring(0, 12) + "..."
                            }
                            <button className={styles.copy_btn} onClick={()=>handleCopy(url)}>
                              <Copy className={styles.icon} />
                            </button>
                          </td>
                   
                          <td>
                            {
                              url.remarks.length <= 15 ?
                                url.remarks :
                                url.remarks.substring(0, 12) + "..."
                            }
                          </td>

                          <td>
                            {url.visitHistory.length}
                          </td>

                          <td>
                            <span className={`${styles.status} ${!url.expiration || new Date(url.expiration) > new Date() ? `${styles.active}` : `${styles.inactive}`}`}>
                               {
                                  !url.expiration || new Date(url.expiration) > new Date() ? 'Active' : 'Inactive'
                               } 
                            </span>
                          </td>

                          <td>
                            <div className={styles.actions}>
                              <button onClick={()=> handleEdit(url)}>
                                <Pencil className={styles.icon} />
                              </button>
                              <button onClick={()=> handleDelete(url)}>
                                <Trash2 className={styles.icon} />
                              </button>
                            </div>
                          </td>
                          
                        </tr>
                        
                      ))
                      }
                    </tbody>
                  </table>
              </div>

              {/* pagination start from here */}
              <div className={styles.pagination}>
                <button 
                  onClick={()=>setCurrentPage((prev)=>--prev)}
                  disabled = {currentPage===1}
                >←</button>
                
                    {
                      pageNumbers.map((num)=>(
                        <button 
                        className={num===currentPage ? `${styles.active}` : ""}
                        key={num}
                        >
                          {num}
                        </button>
                      ))

                    }
               
                <button
                  onClick={()=>setCurrentPage((prev)=>++prev)}
                  disabled = {currentPage===totalPages}
                >→</button>
              </div>          
              
          </main>
          
    </div>
  )
}

export default Links