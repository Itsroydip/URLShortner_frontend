import React, { useState } from "react"
import { X, Calendar } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import styles from "./Modal.module.css"

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasExpiry, setHasExpiry] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    closeModal()
  }

  if (!isOpen) {
    return (
      <Button onClick={openModal} className="fixed top-4 right-4">
        New Link
      </Button>
    )
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
            <input type="url" placeholder="https://web.whatsapp.com/" required className={styles.input} />
          </div>

          <div className={styles.form_group}>
            <label>
              Remarks <span className={styles.required}>*</span>
            </label>
            <textarea placeholder="Add remarks" required className={styles.input} rows={4} />
          </div>

          <div className={`${styles.form_group} ${styles.expiry_group}`}>
            <div className={styles.expiry_header}>
              <label>Link Expiration</label>
              <Switch checked={hasExpiry} onCheckedChange={setHasExpiry} />
            </div>

            { 
              hasExpiry && (
              <div className={styles.date_input}>
                <input type={styles.datetime_local} className={styles.input} />
                <Calendar className={styles.calendar_icon} />
              </div>
            )}
          </div>

          <div className={styles.modal_footer}>
            <Button type="button" variant="outline" onClick={closeModal}>
              Clear
            </Button>
            <Button type="submit">Create new</Button>
          </div>
        </form>
      </div>
    </>
  )
}


