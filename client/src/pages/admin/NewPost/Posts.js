import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'



const Posts = () => {
    const [posts, setServices] = useState([])
    const navigate = useNavigate()
    const { setAlert } = useContext(MainContext)

    const handleDelete = (id) => {
        axios.delete('/api/posts/delete/' + id)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            window.scrollTo(0, 0)

            setTimeout(() => {
                setAlert({
                    message: ''
                })
            }, 2000)
        })
        .catch(error => {
            console.log(error)

            setAlert({
                message: error.response.data,
                status: 'danger'
            })

            if (error.response.status === 401)
                navigate('/main')
        })
    }

    useEffect(() => {
        axios.get('/api/posts/')
            .then(resp => setServices(resp.data))
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [setAlert])

    return (
        
        <div className='container'>
             {alert.message && (
          <div className={'alert alert-' + alert.status}>
            {alert.message}
          </div>
        )}
            <h1>Our Products</h1>
            {posts.length > 0 && 
            posts.map(post => {
                console.log(post)
                return (
                    
                  <div className='products' key={post.id}>
                    <h2>{post.name}</h2>
                    <img className='product-img' src={post.photo} alt={post.name} />

                    <p>{post.description}</p>
                    <div className="d-flex justify-content-end gap-2">
                    <button><Link to={'/admin/posts/edit/' + post.id} className="btn btn-warning">Edit</Link></button>
                    <button className="btn btn-warning" onClick={() => handleDelete(post.id)}>Delete</button>
                </div>

                </div>
                    

                )
                })}
        </div>

    )
}

export default Posts