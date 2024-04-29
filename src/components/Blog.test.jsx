import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {


  test('renders title', () => {
    const blog = {
      title: 'Component title renders',
    }

    render(<Blog blogNow={blog} />)
    screen.debug()


    const element = screen.getByText('Component title renders')
    expect(element).toBeDefined()
  })

  test('at start the details are not displayed', () => {
    const blog = {
      title: 'Component like and user shown',
      user: {
        username:'TestUser'
      },
      likes:2,
      url: 'TestUrl'
    }
    render(
      <Blog blogNow={blog}/>
    )
    const element = screen.getByText('view')
    expect(element).not.toHaveTextContent('TestUser')
    expect(element).not.toHaveTextContent('likes 2')
    expect(element).not.toHaveTextContent('TestUrl')

  })


  test('clicking the button brings like and user', async () => {
    const blog = {
      title: 'Component like and user shown',
      user: {
        username:'TestUser'
      },
      likes:2,
      url: 'TestUrl'
    }
    const { container } = render(
      <Blog blogNow={blog}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.showDetails')

    expect(div).toHaveTextContent(
      'likes 2'
    )
    expect(div).toHaveTextContent(
      'TestUser'
    )
    expect(div).toHaveTextContent(
      'TestUrl'
    )
  })

  test('clicking the button twice calls event handler twice', async () => {
    const blog = {
      title: 'Component like and user shown',
      user: {
        username:'TestUser'
      },
      likes:2,
      url: 'TestUrl'
    }

    const mockHandler = vi.fn()

    render(
      <Blog blogNow={blog} handleLikes={mockHandler}/>
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const LikeButton = screen.getByText('like')
    await user.click(LikeButton)
    await user.click(LikeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})