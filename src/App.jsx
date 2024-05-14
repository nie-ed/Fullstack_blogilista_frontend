import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'



const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [addBlogVisible, setAddBlogVisible] = useState(false)
  const [blogs, setBlogs] = useState([])




  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs( blogs )
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )



  const logoutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const addBlog = async (blogObject) => {
    await blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.concat({ ...returnedBlog, user:user }))
      })
      .then(returnedBlog => {
        setNotificationMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'note')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setAddBlogVisible(false)
      })
  }

  const likeBlog = async (blogObject) => {

    await blogService
      .like(blogObject.id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : blogObject)
        )})
  }

  const deleteBlog = async (blogObject) => {
    if(blogObject.user.username === user.username) {
      if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
        await blogService
          .deleteBlog(blogObject.id)
          .then(returnedBlog => {
            setBlogs(blogs.filter(blog => blog.id !== blogObject.id)
            )}
          )
      }
    }
  }


  const blogForm = () => {
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setAddBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog}/>
          <button onClick={() => setAddBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }




  return (
    <div>
      {!user && <div>
        <Notification message={notificationMessage} type='error' />
        <h2>log in to application</h2>
        {loginForm()}
      </div>}
      {user && <div>
        <h2>blogs</h2>
        <Notification message={notificationMessage} type='note'/>
        <p>{user.name} logged in {logoutButton()}</p>
        {blogForm()}
        {console.log(blogs)}
        {blogs
          .sort((b, a) => a.likes - b.likes)
          .map((blog) =>
            <Blog key={blog.id} blogNow={blog} handleLikes = {likeBlog} handleDelete = {deleteBlog} user={user}/>)}
      </div>
      }
    </div>


  )
}

export default App