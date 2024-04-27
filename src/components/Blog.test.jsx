import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Component title renders',
  }

  render(<Blog blogNow={blog} />)
  screen.debug()


  const element = screen.getByText('Component title renders')
  expect(element).toBeDefined()
})

test('clicking the button brings like and user', async () => {
  const blog = {
    title: 'Component like and user shown',
  }

  const mockHandler = vi.fn()

  render(
    render(<Blog blogNow={blog}/>)
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
