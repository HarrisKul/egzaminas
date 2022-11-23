import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header/Header';
import Main from './pages/Main';
import Posts from './pages/Posts';

//Admin Routes
import NewPost from './pages/admin/NewPost/NewPost';
import EditPost from './pages/admin/NewPost/EditPost';
import PublicPosts from './pages/admin/NewPost/Posts'


//Public routes
import Register from './pages/Register';
import Login from './pages/Login';
import Alert from './components/Alert/Alert';
import MainContext from './context/MainContext';
import axios from 'axios';

const App = () => {
  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [userInfo, setUserInfo] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth/')
    .then(resp => {
      setUserInfo(resp.data)
    })
  }, [])


  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            {/* Admin keliai */}
            {userInfo.role === 1 &&
              <Route path="admin">
                <Route path="posts/new" element={<NewPost />} />
                <Route path="posts/" element={<PublicPosts />} />
                <Route path="posts/edit/:id" element={<EditPost />} />
              </Route>
            }

            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/posts" element={<Posts />} />
            
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
    
  )
}

export default App;
