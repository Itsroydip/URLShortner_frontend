import React from 'react';
import { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/logo.png";
import { login } from "../../services/user.js";
import { useNavigate, Link } from "react-router-dom";
import {TailSpin} from 'react-loader-spinner';
import toast from 'react-hot-toast';

const Login = () => {

  const navigate = useNavigate();
    
const [formData, setFormData] = useState({
    email: "",
    password: "",
})

const [errors, setErrors] = useState({
    email: "",
    password: ""
})

const [isLoading, setIsLoading] = useState(false);

const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
    } else {
        newErrors.email = "";
    }

    // Password validation
    if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long"
        isValid = false;
    } else {
        newErrors.password = "";
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
      const response = await login(formData);
      console.log(response);

      if(response.token){
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", response.id);
        localStorage.setItem("username", response.name);
        toast.success(response.message);
        navigate('/dashboard');//==================================================================================
      }      
      else
      toast.error(response.message);
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
    finally{
      setIsLoading(false);
      setFormData({
        email: "",    
        password: ""
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
          <button className={styles.btn_primary} onClick={()=> navigate('/signup')}>SignUp</button>
          <button className={styles.btn_secondary} onClick={()=> navigate('/')}>Login</button>
        </nav>

        <div className={styles.form_container}>
          <h1>Join us Today!</h1>

          <form onSubmit={handleSubmit} noValidate>

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
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <button type="submit" disabled={isLoading} className={styles.btn_register}>
               {!isLoading && "Login"} 
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
            Don't have an account? <Link to="/signup">SignUp</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Login

