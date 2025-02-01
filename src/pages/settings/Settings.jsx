import React, {useState, useEffect} from 'react'
import styles from './Settings.module.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'
import { editUser, deleteUser, fetchUser } from '../../services/user'
import {TailSpin} from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name:"",
        email:"",
        phone:""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(()=>{
        const getUser = async () => {
            try {
              const data = await fetchUser();
              setUserData({
                name: data.name,
                email: data.email,
                phone: data.phone
              });

              console.log(data);
            } catch (error) {
              console.log(error);
            }
          };
      
          getUser();

    },[])

    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      };


    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission
        try {      
            setIsLoading(true);
            const response = await editUser(userData);
            console.log(response);
      
            if(response.message){
              toast.success(response.message);
              localStorage.setItem("username", userData.name);
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
            
          }

      };

    const handleDelete = async(e) => {
        try {      
            setIsDeleting(true);
            const response = await deleteUser(userData);
            console.log(response);
      
            if(response.message){
              toast.success(response.message);
            }   
            localStorage.clear();
            navigate("/");   
            
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
          }
          finally{
            setIsDeleting(false);
            
          }

    }


  return (
    <div className={styles.app}>
            <Sidebar/>
            <main className={styles.main_content}>
                <Header/> 
                <div className={styles.container}>
                    <div className={styles.form_wrapper}>
                        <form onSubmit={handleSubmit} className={styles.profile_form}>
                        <div className={styles.form_group}>
                            <label htmlFor="name">Name</label>
                            <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="email">Email id</label>
                            <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="mobile">Mobile no.</label>
                            <input
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            />
                        </div>

                        <button type="submit" disabled={isLoading} className={`${styles.btn} ${styles.btn_save}`}>
                            {!isLoading ? "Save Changes" :
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

                        <button type="button" disabled = {isDeleting} onClick={handleDelete} className={`${styles.btn} ${styles.btn_delete}`}>
                            {!isDeleting ? "Delete Account" :
                                <TailSpin
                                    visible={isDeleting}
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
                        </form>
                    </div>
                </div>
            </main>
    </div>
  )
}

export default Settings