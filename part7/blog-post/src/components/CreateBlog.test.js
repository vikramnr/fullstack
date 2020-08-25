import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

describe('Blog List', () => {

  test('create blog updates states', () => {
    const createBlog = jest.fn()
    const component = render(<CreateBlog handlePostCreation={createBlog} />)

    const form  = component.container.querySelector('form')
    const author = component.container.querySelector('#author')
    fireEvent.change(author, {
      target: { value: 'user 1' },
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('user 1')
  })

})
