describe('constructor testing', () => {
    beforeEach('should make an order and open app', () => {
        cy.intercept('POST', 'api/orders', {fixture: 'order.json'})
        cy.visit('http://localhost:3000')
    })

    it('should drop ingredients to constructor, make an order, close modal window', () => {
        cy.contains('Соберите бургер')

        cy.get('[data-cy=bun]')
            .find('[data-cy=BurgerIngredient]')
            .first()
            .trigger("dragstart")

        cy.get('[data-cy=ConstructorContainer]')
            .trigger("drop")

        cy.get('[data-cy=main]')
            .find('[data-cy=BurgerIngredient]')
            .first()
            .trigger("dragstart")

        cy.get('[data-cy=ConstructorContainer]')
            .trigger("drop")

        cy.get('button').contains('Оформить заказ').click()

        cy.get('[data-cy=email]')
            .type('spoontamer7@gmail.com')
        cy.get('[data-cy=pass]')
            .type('1234')
        cy.get('button').contains('Войти').click()

        cy.get('button').contains('Оформить заказ').click()

        cy.contains('12345').should('exist')
        cy.get('[data-cy=ModalButtonClose]').click()
        cy.contains('12345').should('not.exist')
    })

    it('should open and close ingredient window', () => {
        cy.get('[data-cy=IngredientLink]').first().click()
        cy.contains('Детали ингредиента').should('exist')

        cy.get('[data-cy=ModalButtonClose]').click()
        cy.contains('Детали ингредиента').should('not.exist')
    })
})

export {}
