import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../context/MainContext'

const Login = () => {
    const { setAlert, setUserInfo } = useContext(MainContext)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/users/login/', form)
        .then(resp => {
            setUserInfo(resp.data.user)
            setAlert({
                message: resp.data.message,
                status: 'success'
            })

            setTimeout(() => {
                if(resp.data.user.role === 1)
                    return navigate('/')

                navigate('/')
            }, 1000)
        })
        .catch(error => {
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })
    }


    return (

        <div className="container">
        {alert.message && (
       <div className={'alert alert-' + alert.status}>
       {alert.message}
       </div>
       )}
       <h1>Login</h1>
       
       <form onSubmit={handleSubmit}>
       
       <div className="form-control">
        <label>Email</label>
        <br></br>
        <input type="email" name="email" onChange={handleForm}></input>
       </div>
       <div className="form-control">
        <label>Password</label>
        <br></br>
        <input type="password" name="password" onChange={handleForm}></input>
       </div>
       <button className="btn btn-primary">Login</button>
       </form>    
       </div> 
       )}
       
       export default Login;