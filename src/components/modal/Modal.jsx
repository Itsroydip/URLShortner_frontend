import React, { useState } from "react"
import { X, Calendar } from "lucide-react"
import Switch from '@mui/material/Switch'
import styles from "./Modal.module.css"
import toast from 'react-hot-toast'
import {createUrl} from "../../services/url"
import {TailSpin} from 'react-loader-spinner';


export default function Modal({isOpen, setIsOpen}) {
  const [shortUrl, setShortUrl] = useState("");
  const [hasExpiry, setHasExpiry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    redirectUrl: "",
    remarks: "",
    expiration: "",
  });

  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission
    try {      
      setIsLoading(true);
      const response = await createUrl(formData);
      console.log(response);

      if(response.shortId){
        let url = import.meta.env.VITE_FRONTEND_URL + "/" + response.shortId;
        setShortUrl(url);
        console.log(url);
        toast.success("Link created successfully");
        closeModal();
        return;
      }
      
      toast.error(response.message);
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
    finally{
      setIsLoading(false);
      setFormData({
        redirectUrl: "",
        remarks: "",
        expiration: "",
      })
    }
    
  }

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className={styles.modal_overlay} onClick={closeModal} />
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h2>New Link</h2>
          <button onClick={closeModal} className={styles.close_button}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modal_content}>
          <div className={styles.form_group}>
            <label>
              Destination Url <span className={styles.required}>*</span>
            </label>
            <input 
                type="url" 
                name="redirectUrl"
                placeholder="https://web.whatsapp.com/" 
                required 
                className={styles.input} 
                value={formData.redirectUrl}
                onChange={handleChange}
            />
          </div>

          <div className={styles.form_group}>
            <label>
              Remarks <span className={styles.required}>*</span>
            </label>
            <textarea 
                placeholder="Add remarks" 
                name="remarks"
                required 
                className={styles.input} rows={4} 
                value={formData.remarks}
                onChange={handleChange}
            />
          </div>

          <div className={`${styles.form_group} ${styles.expiry_group}`}>
            <div className={styles.expiry_header}>
              <label>Link Expiration</label>
              <Switch defaultChecked={hasExpiry} onChange={()=>setHasExpiry((prev)=>!prev)} />
            </div>

            { 
              hasExpiry && (
              <div className={styles.date_input}>
                <input 
                    type="datetime-local" 
                    name="expiration"
                    className={styles.input} 
                    value={formData.expiration}
                    onChange={handleChange}
                />            
              </div>
            )}
          </div>

          <div className={styles.modal_footer}>
            <button type="button" variant="outline" onClick={closeModal}>
              Clear
            </button>
            <button type="submit" disabled={isLoading}>
             { !isLoading ?"Create new"
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
        </form>
      </div>
    </>
  )
}


