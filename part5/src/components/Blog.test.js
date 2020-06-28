import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog List',() => {
  let component
  const blog = {
    author: 'user',
    likes:12,
    title:'blog 1',
    url: 'https://fullstack.open',
    user: {
      user: 'user 1'
    }
  }
  const user = {
    user: 'user 1'
  }
  const updatePost = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} handlePostUpdation={updatePost}/>
    )
  })

  test('renders correct content', () => {
    const shownBlog = component.container.querySelector('.divBlog')
    expect(shownBlog).not.toHaveStyle('display:none')

    // author check
    expect(shownBlog).toHaveTextContent('user')
    // title check
    const title = component.container.querySelector('strong')
    expect(title).toHaveTextContent('blog 1')
    // style check
    const hiddenBlog = component.container.querySelector('.hiddenBlog')
    expect(hiddenBlog).toHaveStyle('display:none')
  })
  test('url and author are when shown when button is clicked',() => {
    const button = component.getByText('view')
    fireEvent.click(button)
    // class should be changed
    const hiddenBlog = component.container.querySelector('.hiddenBlog')
    expect(hiddenBlog).not.toHaveStyle('display:none')
    // url and likes should be visible
    expect(hiddenBlog).toHaveTextContent('https://fullstack.open')
    expect(hiddenBlog).toHaveTextContent('12')
  })

  test('like button clicked twice event is handled',() => {
    const likeButton = component.getByText('like')
    // clicking the button twice
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    // function props to handled twice
    expect(updatePost.mock.calls).toHaveLength(2)
  })

})
