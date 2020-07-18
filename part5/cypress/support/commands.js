// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username: username,
    password: password,
  }).then((resp) => {
    console.log(resp)
    localStorage.setItem('blog-user', JSON.stringify(resp.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('cretePost', (title, author, url) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title:title, author:author, url:url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('blog-user')).token
      }`,
    },
  }).then((resp) => {
    cy.visit('http://localhost:3000')
  })
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
