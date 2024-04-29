import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blogNow, handleLikes, handleDelete, user }) => {
  const [showFullBlog, setShowFullBlog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const addLike = () => {
    const likes = blogNow.likes +1
    handleLikes({ ...blogNow, likes })
  }

  const deleteBlog = () => {
    if(blogNow.user.username === user.username) {
      if (window.confirm(`Remove blog ${blogNow.title} by ${blogNow.author}`)) {
        handleDelete(blogNow)
      }
    }
  }

  return (
    <div style={blogStyle}>

      {blogNow.title} {blogNow.author}
      {!showFullBlog ? <button onClick={() => setShowFullBlog(true)}>view</button>:
        <div className='showDetails'>
          <button onClick={() => setShowFullBlog(false)}>hide</button><br></br>
          {blogNow.url}<br></br>
          likes {blogNow.likes}<button onClick= {addLike}>like</button><br></br>
          {blogNow.user.username}<br></br>

          <button onClick={() => deleteBlog()}>
        remove
          </button>
        </div> }
    </div>
  )
}

Blog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleLikes: PropTypes.func.isRequired,
  blogNow: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog