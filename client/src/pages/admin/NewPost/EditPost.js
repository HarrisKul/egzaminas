import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'
import "./EditPost.css"


const EditPost = () => {
    const { setAlert } = useContext(MainContext)
    const [refresh, setRefresh] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        photo: '',
        description: '',
        price: ''
    })

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/posts/edit/' + id, form)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })
                setRefresh(!refresh)
                navigate('/posts')
            })
            .catch(error => {
                console.log(error)

                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })

                if (error.response.status === 401)
                    navigate('/login')
            })
    }

    useEffect(() => {
        axios.get('/api/posts/' + id)
            .then(resp => setForm(resp.data))
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [id, setAlert, refresh])

    return (
        <>
            <div className="container">
                <div className="page-heading">
                    <h1>Edit Book</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-control">
                        <label className="name">Title</label>
                        <input type="text" name="name" className="form-control" onChange={handleForm} value={form.name} />
                    </div>
                    <div className="form-control">
                        <label className="photo">Photo</label>
                        <input type="url" name="photo" className="form-control" onChange={handleForm} value={form.photo} />
                    </div>
                    <div className="form-control">
                        <label for='price'>Price</label>
                        <input type="text" name="price" className="form-control" onChange={handleForm} value={form.price} />
                    </div>
                    <div className="form-control">
                        <label for='description'>Description</label>
                        <textarea type="text" name="description" className="form-control" onChange={handleForm} value={form.description} />
                    </div>
                    <button className="btn btn-primary">Edit</button>
                </form>
            </div>
        </>
    )
}

export default EditPost


