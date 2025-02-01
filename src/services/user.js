const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const register = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/user/signup`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(response.status === 200 || response.status === 400)
        return response.json();
    throw new Error("Something went wrong");   

}

const login = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/user/signin`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(response.status === 200 || response.status === 400)
        return response.json();
    throw new Error("Something went wrong");   
}

const editUser = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/user`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })

    if(response.status === 200 || response.status === 400)
        return response.json();
    throw new Error("Something went wrong");

}

const deleteUser = async (id) => {
    const response = await fetch(`${BACKEND_URL}/api/user/${id}`,{
        method: 'DELETE',
        headers: {
            'authorization': localStorage.getItem("token")
        }
    })

    if(response.status === 200 || response.status === 400)
        return response.json();
    throw new Error("Something went wrong"); 
}

const fetchUser = async ()=> {
    const response = await fetch(`${BACKEND_URL}/api/user/`,{
        headers: {
            'authorization': localStorage.getItem("token")
        },
    
    })

    if(response.status === 200 || response.status === 400)
        return response.json();
    throw new Error("Something went wrong");
}


export{
    register,
    login,
    editUser,
    deleteUser,
    fetchUser
}