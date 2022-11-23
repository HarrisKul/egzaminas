import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'

const EditPost = () => {
    const { setAlert } = useContext(MainContext)
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
        axios.get('/api/posts/single/' + id)
            .then(resp => setForm(resp.data))
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [id, setAlert])

    return (
        <>
            <div className="container mw-50">
                <div className="page-heading">
                    <h1>Edit Book</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group mb-2">
                        <label className="mb-1">Title</label>
                        <input type="text" name="name" className="form-control" onChange={handleForm} value={form.name} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Photo</label>
                        <input type="url" name="photo" className="form-control" onChange={handleForm} value={form.photo} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Description</label>
                        <input type="text" name="description" className="form-control" onChange={handleForm} value={form.description} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Price</label>
                        <input type="text" name="price" className="form-control" onChange={handleForm} value={form.price} />
                    </div>
                    <button className="btn btn-primary">Edit</button>
                </form>
            </div>
        </>
    )
}

export default EditPost


// import { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const EditPost = () => {
//     const { id } = useParams()
    
//     const [post, setPost] = useState({
//         title: '',
//         photo: '',
//         description: '',
//         price: ''
//     })

//     const [alert, setAlert] = useState({
//         message: '',
//         status: ''
//     })

//     const navigate = useNavigate()

//     useEffect(() => {
//         axios.get('/api/posts/' + id)
//         .then(resp => {
//             if(!resp.data) {
//                 navigate('/')
//                 return
//             }

//             setPost(resp.data)
//         })
//         .catch(error => {
//             console.log(error)
//             navigate('/')
//         })
//     }, [])

//     const handleForm = (e) => {
//         setPost({...post, [e.target.name]: e.target.value})
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()

//         axios.put('/api/posts/edit/' + id, post)
//         .then(resp => {
//             setAlert({
//                 message: resp.data,
//                 status: 'success'
//             })

//             window.scrollTo(0, 0)

//             setTimeout(() => navigate('/'), 2000)
//         })
//         .catch(error => {
//             setAlert({
//                 message: error.response.data,
//                 status: 'danger'
//             })
//         })

//     }

//     return (
//         <div className="container">
//             <h2>Edit book</h2>
//             {alert.message && (
//                 <div className={'alert alert-' + alert.status}>
//                 {alert.message}
//                 </div>
//             )}
//             <form onSubmit={(e) => handleSubmit(e)}>
//                 <div className="form-group mb-2">
//                     <label>Title</label>
//                     <input type="text" name="title" className="form-control" onChange={(e) => handleForm(e)} placeholder={post.title} />
//                 </div>

//                 <div className="form-group mb-2">
//                     <label>Photo</label>
//                     <input type="url" className="form-control" onChange={(e) => handleForm(e)} placeholder={post.photo} ></input>
//                 </div>
//                 <div className="form-group mb-2">
//                     <label>Price</label>
//                     <input type="text" className="form-control" onChange={(e) => handleForm(e)} placeholder={post.price} ></input>
//                 </div>
//                 <div className="form-group mb-2">
//                     <label>Description</label>
//                     <input type="text" className="form-control" onChange={(e) => handleForm(e)} placeholder={post.description} ></input>
//                 </div>
//                 <div className="form-group mb-2">
//                     <img src={post.image} alt={post.title} style={{maxWidth: 150}}/>
//                 </div>
//                 <button className="btn btn-primary">Edit</button>
//             </form>
//         </div>
//     )
// }

// export default EditPost


// import { useState, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import MainContext from '../../../context/MainContext'

// const EditPost = () => {
//     const { setAlert } = useContext(MainContext)
//     const navigate = useNavigate()

//     const [form, setForm] = useState({
//         title: '',
//         photo: '',
//         description: '',
//         price: ''
//     })

//     const handleForm = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value })
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()

//         axios.post('/api/posts/edit/', form)
//             .then(resp => {
//                 setAlert({
//                     message: resp.data,
//                     status: 'success'
//                 })

//                 navigate('/admin')
//             })
//             .catch(error => {
//                 console.log(error)

//                 setAlert({
//                     message: error.response.data,
//                     status: 'danger'
//                 })

//                 if (error.response.status === 401)
//                     navigate('/login')
//             })
//     }

//     return (
//         <>
//             <div className="container mw-50">
//                 <div className="page-heading">
//                     <h1>Edit Books</h1>
//                 </div>
//                 <form onSubmit={(e) => handleSubmit(e)}>
//                 <div className="form-control">
//                     <label for="name">Title</label>
//                     <br></br>
//                     <input type="text" name="name" id="name" onChange={handleForm} value= {form.name} />
//                 </div>
//                 <div className="form-control">
//                     <label for="photo">Photo</label>
//                     <br></br>
//                     <input type="url" name="photo" id="photo" onChange={handleForm} value= {form.photo}/>
//                 </div>
//                 <div className="form-control">
//                     <label for="price">Price</label>
//                     <br></br>
//                     <input type="text" name="price" id="price" onChange={handleForm} value= {form.price}/>
//                 </div>
//                 <div className="form-control">
//                     <label for="description">Description</label>
//                     <br></br>
//                     <textarea name="description" id="description" cols="30" rows="10" onChange={handleForm} value = {form.description}></textarea>
//                 </div>
//                     <button className="btn btn-primary">Edit</button>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default EditPost