describe('유저 로그인 테스트', () => {
  it('login', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-test-id="email"]').type("dev.koo6357@gmail.com")
    cy.get('[data-test-id="password"]').type("123456")
    cy.get('[data-test-id="login-button"]').click()
    cy.url().should('be.equal', 'http://localhost:3000/')
  })

  it('is redirected to the login page on log out', () => {
    cy.contains('로그아웃')
      .should('be.visible')
      .click()

    // cy.url().should('be.equal', 'http://localhost:3000/login')
  })

})
