describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login Here')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('user1')
      cy.get('#password').type('useme')
      cy.get('#loginform').click()
      cy.contains('Logged in as user1')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('user1')
      cy.get('#password').type('ssss')
      cy.get('#loginform').click()
      cy.get('.error').contains('Incorrect Username or password')
    })
  })
  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login('user1', 'useme')
      cy.cretePost('cypress-2', 'cypress.com', 'before-2')
      cy.cretePost('cypress-1', 'cypress.com', 'before-1')
      cy.cretePost('cypress-0', 'cypress.com', 'before-0')

      cy.contains('cypress-2').parent().contains('view').click()
      cy.get('#cypress-2').contains('like').click()
      cy.get('#cypress-2').contains('like').click()
    })

    it('A blog can be created', function () {
      cy.get('#togglable').contains('Create a new post').click()
      cy.get('#title').type('post from cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#author').type('cypress')
      cy.get('#createblog').click()
      cy.get('.error').contains('Blog is added now')
      cy.get('#displayBlogs').contains('post from cypress')
    })

    it('A post can be liked', function () {
      cy.contains('cypress-1').parent().contains('view').click()
      cy.get('#cypress-1').contains('like').click()
      cy.get('#cypress-1').contains('1')
    })
    it('A post can be deleted', function () {
      cy.get('#cypress-1').contains('view').click()
      cy.get('#cypress-1').contains('remove').click()
    })
    it('Posts are ordered by likes', function () {
      cy.contains('cypress-0').parent().contains('view').click()
      cy.get('#cypress-0').contains('like').click().then(() => {
        cy.get('#cypress-0').contains('like').click().then(() => {
          cy.get('#cypress-0').contains('like').click().then(() => {
            cy.get('#cypress-0').contains('2')
          })
        })
      })
    })
  })
})
