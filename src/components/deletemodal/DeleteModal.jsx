import React, {useState} from 'react'
import styles from './DeleteModal.module.css'
import { X } from "lucide-react"
import { deleteUrl } from '../../services/url'
import {TailSpin} from 'react-loader-spinner'
import toast from 'react-hot-toast'

const DeleteModal = ({isOpen, setIsOpen, id}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {      
            setIsLoading(true);
            const response = await deleteUrl(id);
            console.log(response);
      
            toast.success(response.message);
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
        finally{
            setIsLoading(false);
            setIsOpen(false);
        }
    }


    if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
       <div className={styles.modal}>
            <div className={styles.modal_header}>
                <button onClick={()=>setIsOpen(false)} className={styles.close_btn}>
                    <X className={styles.icon} />
                </button>
            </div>

            <div className={styles.modal_content}>            
                <p>Are you sure. You want to delete it? </p>
                <div className={styles.modal_actions}>
                    <button onClick={()=>setIsOpen(false)} className={`${styles.modal_btn} ${styles.cancel}`}>
                        No
                    </button>
                    <button
                        onClick={handleDelete}
                        className={`${styles.modal_btn} ${styles.delete}`}
                        disabled = {isLoading}
                    >
                        {
                            !isLoading ? "Yes"
                            :
                            <TailSpin
                                visible={isLoading}
                                height="20"
                                width="20"
                                color="#ffffff"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />

                        }
                        
                    </button>
                   
                </div>
            </div>
            
        </div>
    </div>
    
  )
}

export default DeleteModal

