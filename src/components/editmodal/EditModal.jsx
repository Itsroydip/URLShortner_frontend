import React, { useEffect, useState } from "react"
import { X, Calendar, Heading1 } from "lucide-react"
import Switch from '@mui/material/Switch'
import styles from "./EditModal.module.css"
import toast from 'react-hot-toast'
import {editUrl} from "../../services/url"
import {TailSpin} from 'react-loader-spinner'


export default function EditModal({isOpen, setIsOpen, url}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    redirectUrl: "",
      remarks: "",
      hasExpiry: false,
      expiration: null
  });

  useEffect(() => {
    console.log(url);

    setFormData({
      redirectUrl: url.redirectUrl,
      remarks: url.remarks,
      hasExpiry: url.expiration!==null ? true : false,
      expiration: url.expiration,
    });
    
  }, [url]);


  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value, type, defaultChecked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? defaultChecked : value
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault()
    // Handle form submission
    if(!formData.hasExpiry)
        formData.expiration = null;
    try {      
      setIsLoading(true);
      const response = await editUrl(url._id, formData);
      console.log(response);

      toast.success(response.message);
      
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
        setIsOpen(false);
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
          <h2>Edit Link</h2>
          <button onClick={closeModal} className={styles.close_button}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleEdit} className={styles.modal_content}>
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
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={formData.hasExpiry}
                  onChange={(e) => setFormData({ ...formData, hasExpiry: e.target.checked })}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            { 
              formData.hasExpiry && (
              <div className={styles.date_input}>
                <input 
                    type="datetime-local" 
                    name="expiration"
                    className={styles.input} 
                    value={formData.expiration?.slice(0, 16)}
                    onChange={handleChange}
                    required
                />            
              </div>
            )}
          </div>

          <div className={styles.modal_footer}>
            <button type="button" variant="outline" onClick={() => setFormData({ redirectUrl: "", remarks: "", expiration: "" })}>
              Clear
            </button>
            <button type="submit" disabled={isLoading}>
             { !isLoading ?"Save"
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


