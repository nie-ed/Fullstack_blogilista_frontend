import PropTypes from 'prop-types'


const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: type==='error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className="notif" style={style}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
}

export default Notification