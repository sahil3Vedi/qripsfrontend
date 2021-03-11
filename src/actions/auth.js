import axios from 'axios'
import { message } from 'antd'

export const superLogout = (setLogin) => {
    localStorage.removeItem('superuser');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    setLogin(false)
}

export const authSuperLogin = (values,btnToggle, setLogin) => {
    axios.post(`${process.env.REACT_APP_BACKEND}/superusers/login`,values)
    .then(res=>{
        let token = res.data.token
        const expirationDate = new Date(new Date().getTime() + 3600*1000)
        localStorage.setItem('token', token)
        localStorage.setItem('expirationDate', expirationDate)
        setTimeout(() => {
            superLogout(setLogin);
        }, 3600*1000)
        btnToggle()
        setLogin(true)
        message.success("Authenticated")
    })
    .catch(err=>{
        console.log(err)
        message.error(err.response ? err.response.data.message : "Server Timed Out")
        btnToggle()
    })
}

export const authCheckSuperState = (setLogin) => {
    let token = localStorage.getItem('token')
    if (!token) {
        superLogout(setLogin)
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()){
            superLogout(setLogin)
        } else {
            setTimeout(() => {
                superLogout(setLogin);
            }, expirationDate.getTime() - new Date().getTime())
            setLogin(true)
        }
    }
}
