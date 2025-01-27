import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Header.module.css'
import Modal from '../modal/Modal'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("User Roy");
    const [date, setDate] = useState("");

    useEffect(() => {
        const date = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        setDate(formattedDate);

        setUsername(localStorage.getItem("username").split(" ")[0]);
    }, [])


  return (
    <header>
        <div className={styles.greeting}>
            <span>⭐ Good morning, {username}</span>
            <span className={styles.date}> {date} </span>
        </div>

        <Modal 
            isOpen = {isOpen}
            setIsOpen = {setIsOpen}
        />

        <div className={styles.header_right}>
            <button className={styles.create_btn} onClick={ ()=>setIsOpen(true) }>+ Create new</button>
            <div className={styles.search}>
                <input type="text" placeholder="Search by remarks" />
            </div>
            <div className={styles.avatar}> {`${username[0]}${username[1].toUpperCase()}`} </div>
        </div>
    </header>
  )
}

export default Header