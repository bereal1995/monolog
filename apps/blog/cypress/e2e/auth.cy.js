describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('login', () => {
    cy.get('[name="email"]').type("dev.koo6357@gmail.com")
    cy.get('[name="password"]').type("123456")
    cy.get('[data-test-id="login-button"]').click()
  })

})
