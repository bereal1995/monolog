// @ts-ignore
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login')
  cy.get('[data-test=username]').type(username)
  cy.get('[data-test=password]').type(password)
  cy.get('[data-test-id="login-button"]').click()
  cy.url().should('contain', '/')
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
