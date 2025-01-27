import React from 'react';
import { useState } from "react";
import styles from "./Register.module.css";
import logo from "../../assets/logo.png";
import { register } from "../../services/user.js";
import { useNavigate, Link } from "react-router-dom";
import {TailSpin} from 'react-loader-spinner';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
    
const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
})

const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
})

const [isLoading, setIsLoading] = useState(false);

const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Name validation
    if (formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters long";
        isValid = false;
    } else {
        newErrors.name = "";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
    } else {
        newErrors.email = "";
    }

    // phone validation
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
        isValid = false;
    } else {
        newErrors.phone = "";
    }

    // Password validation
    if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long"
        isValid = false;
    } else {
        newErrors.password = "";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
    } else {
        newErrors.confirmPassword = ""
    }

    setErrors(newErrors);
    return isValid;
}


const handleSubmit = async (e) => {

    e.preventDefault();
    if (!validateForm()) {
        console.log("Form has errors")
        return;
    } 

    try {      
      setIsLoading(true);
      const response = await register(formData);
      console.log(response);

      if(response.id){
        toast.success(response.message);
        navigate('/');
      }      
      else
      toast('Email already exists', {
        icon: '⚠️',
      });
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
    finally{
      setIsLoading(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      })
    }
}


const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }))
}



  return (
    <div className={styles.container}>
      <div className={styles.image_section}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
        </nav>
      </div>

      <main className={styles.form_section}>
        <nav className={styles.nav_buttons}>
          <button className={styles.btn_secondary} onClick={()=> navigate('/signup')}>SignUp</button>
          <button className={styles.btn_primary} onClick={()=> navigate('/')}>Login</button>
        </nav>

        <div className={styles.form_container}>
          <h1>Join us Today!</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.input_group}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.input_group}>
              <input
                type="email"
                name="email"
                placeholder="Email id"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.input_group}>
              <input
                type="tel"
                name="phone"
                placeholder="phone no."
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>

            <div className={styles.input_group}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.input_group}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
            </div>

            <button type="submit" disabled={isLoading} className={styles.btn_register}>
               {!isLoading && "Register"} 
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
            </button>
          </form>

          <p className={styles.login_text}>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Register;