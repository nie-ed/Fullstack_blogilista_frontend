import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            data-testid='title'
            value={newTitle}
            name="Title"
            onChange={event => setNewTitle(event.target.value)}
            placeholder='write blog title here'
          />
        </div>
        <div>
        author:
          <input
            data-testid='author'
            value={newAuthor}
            name="Author"
            onChange={event => setNewAuthor(event.target.value)}
            placeholder='write blog author here'
          />
        </div>
        <div>
        url:
          <input
            data-testid='url'
            value={newUrl}
            name="url"
            onChange={event => setNewUrl(event.target.value)}
            placeholder='write blog url here'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm