import React from 'react'
import styles from './Sidebar.module.css'
import logo from "../../assets/logo.png";
import { BarChart3, Link, Settings, LayoutDashboard } from "lucide-react"
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    return (
    <aside className={styles.sidebar}>
        <div className={styles.logo}>
            <img src={logo} alt="logo" />
        </div>

        <nav>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : '')}>
                <LayoutDashboard size={20} />
                Dashboard
            </NavLink>
            <NavLink to="/links" className={({ isActive }) => (isActive ? styles.active : '')}>
                <Link size={20} />
                Links
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => (isActive ? styles.active : '')}>
                <BarChart3 size={20} />
                Analytics
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? styles.active : '')}>
                <Settings size={20} />
                Settings
            </NavLink>
        </nav>
    </aside>
  )
}

export default Sidebar