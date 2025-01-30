const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const createUrl = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/url/`,{
        method: 'POST',
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

const fetchUrls = async (page, pageSize) => {
    
    const response = await fetch(`${BACKEND_URL}/api/url/?page=${page}&pageSize=${pageSize}`,{
        headers: {
            'authorization': localStorage.getItem("token")
        },
    
    })

    if(response.status === 200)
        return response.json();
    throw new Error("Something went wrong");   
}

const editUrl = async (id, data) => {
    const response = await fetch(`${BACKEND_URL}/api/url/${id}`,{
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

const deleteUrl = async (id) => {
    const response = await fetch(`${BACKEND_URL}/api/url/${id}`,{
        method: 'DELETE',
        headers: {
            'authorization': localStorage.getItem("token")
        }
    })

    if(response.status === 200 || response.status === 400)
        return response.json();
    throw new Error("Something went wrong");   
}

export {
    createUrl,
    fetchUrls,
    editUrl,
    deleteUrl
}