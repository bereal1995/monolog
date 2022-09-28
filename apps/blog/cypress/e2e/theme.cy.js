const themeMode = localStorage.getItem('themeMode') || 'light';
import { getTheme } from 'ui/theme';

describe('테마 테스트', () => {
  it('화면이 로드되면 헤더에 현재 테마모드가 노출된다.', () => {
    cy.visit('http://localhost:3000/');
    cy.get('header').contains(themeMode);
  });

  it('헤더에 테마버튼을 클릭하면 테마모드가 변경된다.', () => {
    cy.get('header button')
      .contains(themeMode)
      .click()
      .then(() => {
        const themeMode = localStorage.getItem('themeMode');
        cy.get('header').contains(themeMode);
        cy.get('body')
          .should('have.css', 'background-color')
          .and('eq', `${getTheme(themeMode).background}`);
      });
  });

  it('새로고침을 해도 현재 테마가 유지된다.', () => {
    const themeMode = localStorage.getItem('themeMode');

    cy.reload().then(() => {
      expect(localStorage.getItem('themeMode')).to.eq(themeMode);
    });
  });
});
