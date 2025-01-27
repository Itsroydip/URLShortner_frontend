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

export {
    createUrl
}