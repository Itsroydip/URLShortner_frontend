import React, { useState } from "react"
import styles from "./Copyurl.module.css"

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null
  
    return (
      <div className={styles.modal_overlay} onClick={onClose}>
        <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modal_close} onClick={onClose}>
            ×
          </button>
          {children}
        </div>
      </div>
    )
  }

const Copyurl = ({shortUrl, setIsSubmitted}) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [copied, setCopied] = useState(false);
  
    const handleCopy = () => {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true)
      setTimeout(() => setCopied(false), 4000)
    }

    const handleClose = () => {
        setIsModalOpen(false);
        setIsSubmitted(false);
    }
  
return (
    <div className={styles.app}>
    <Modal isOpen={isModalOpen} onClose={handleClose}>
        <div className={styles.url_shortener}>
        <h2>URL Shortener</h2>
        <div className={styles.url_input_group}>
            <input type="text" value={shortUrl} readOnly />
            <button className={styles.copy_button} onClick={handleCopy}>
            {copied ? "Copied!" : "Copy URL"}
            </button>
        </div>
        </div>
    </Modal>
    </div>
)
}

export default Copyurl