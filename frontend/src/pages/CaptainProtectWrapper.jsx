import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const UserProtectWrapper = ({children}) => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const {captain, setCaptain} = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(!token){
        navigate('/captain-login')
    }
    }, [token])

    axios.get(`${process.env.REACT_APP_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            const data = response.data
            setCaptain(data.captain)
            setIsLoading(false)
        }
    }).catch(err => {
        console.log(err)
        localStorage.removeItem('token')
        navigate('/captain-login')
    })

    //NOW, whatever token we get check whether it is a valid token or not
    if(isLoading) {
        return(
            <div>Loading...</div>
        )
    }


  return (
    <div>
        <>
            {children}
        </>
    </div>
  )
}

export default UserProtectWrapper