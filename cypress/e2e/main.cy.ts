import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const LOGINGUIDEMESSAGE = '소셜 아이디로 쉽게 로그인해 보세요!';
describe('empty spec', () => {
  before(() => {
    cy.visit('/');
  });

  let id = '';
  it('check router with post card click', () => {
    cy.get('.swiper-slide-active>div>li')
      .eq(0)
      .then((dom) => {
        id = dom.data('id');
      })
      .click()
      .location('href')
      .should('include', `/detail/${id}`);

    // before login and click apply button after view SignInModal
    cy.get('.Status_Box>.Status_Btn').click();
    cy.get('.JoinWrapper>section>div>section>h2').contains(LOGINGUIDEMESSAGE);
  });
});
