import React, { useContext, useState } from 'react'
// import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserProtectWrapper = ({children}) => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    console.log(token)

    useEffect(() => {
        if(!token){
        navigate('/login')
    }
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
      if(response.status === 200){
        setUser(response.data.user)
        setIsLoading(false)
      }
    }).catch(err => {
      console.log(err)
      localStorage.removeItem('token')
      navigate('/login')
    })
    }, [token])


  return (
    <div>
        <>
            {children}
        </>
    </div>
  )
}

export default UserProtectWrapper