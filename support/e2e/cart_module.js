describe('Cart Module', () => {
    it('TC-CA-001 - User can see selected product in cart list (Positive)', () => {
        // Test Data
        const username = "standard_user"
        const password = "secret_sauce"
        const selectedProduct = 'Sauce Labs Bike Light'

        // Step 1 : User visit the base url
        cy.visit('/')

        // Step 2 : User fill the username and password field
        cy.get('#user-name').should('exist').type(username)
        cy.get('#password').should('exist').type(password)

        // Step 3 : User press the "Login" button
        cy.get('#login-button').should('exist').click()

        // Step 4 : User select product with name "Sauce Labs Bike Light"
        cy.url().should('include', '/inventory.html') 
        cy.get('#inventory_container .inventory_list').should('exist').children() 
            .each(($el) => {
                cy.wrap($el).find('.inventory_item_name').invoke('text').then((itemName) => {
                    if (itemName.includes(selectedProduct)) {
                        // Step 5 : User press the "Add to Cart"
                        cy.wrap($el).find('.btn_inventory').should('exist').click()
                    }
                })
            })

        // Step 6 : User press cart button to open cart page
        cy.get('#shopping_cart_container .shopping_cart_link').should('exist').click()

        // Step 7 : User see the selected product with the information
        cy.url().should('include', '/cart.html') 
        cy.get('#cart_contents_container .cart_list').should('exist').children('.cart_item') 
            .each(($el) => {
                cy.wrap($el).find('.inventory_item_name').should('have.text', selectedProduct)
            })

        // Audit
        cy.screenshot('TC-CA-001 - Expected Result')
    })

    it('TC-CA-002 - User will get no selected product message in cart list when no product selected (Negative)', () => {
        // Test Data
        const username = "standard_user"
        const password = "secret_sauce"

        // Step 1 : User visit the base url
        cy.visit('/')

        // Step 2 : User fill the username and password field
        cy.get('#user-name').should('exist').type(username)
        cy.get('#password').should('exist').type(password)

        // Step 3 : User press the "Login" button
        cy.get('#login-button').should('exist').click()

        // Step 4 : User press cart button to open cart page
        cy.url().should('include', '/inventory.html') 
        cy.get('#shopping_cart_container .shopping_cart_link').should('exist').click()

        // Step 5 : User see the no selected product message
        cy.url().should('include', '/cart.html') 
        cy.get('#cart_contents_container .cart_list').should('have.text', 'No product selected')

        // Audit
        cy.screenshot('TC-CA-002 - Expected Result')
    })

    it('TC-CA-003 - User can checkout the selected product that has been shown in cart (Positive)', () => {
        // Test Data
        const username = "standard_user"
        const password = "secret_sauce"
        const selectedProduct = 'Sauce Labs Bike Light'

        // Step 1 : User visit the base url
        cy.visit('/')

        // Step 2 : User fill the username and password field
        cy.get('#user-name').should('exist').type(username)
        cy.get('#password').should('exist').type(password)

        // Step 3 : User press the "Login" button
        cy.get('#login-button').should('exist').click()

        // Step 4 : User select product with name "Sauce Labs Bike Light"
        cy.url().should('include', '/inventory.html') 
        cy.get('#inventory_container .inventory_list').should('exist').children() 
            .each(($el) => {
                cy.wrap($el).find('.inventory_item_name').invoke('text').then((itemName) => {
                    if (itemName.includes(selectedProduct)) {
                        // Step 5 : User press the "Add to Cart"
                        cy.wrap($el).find('.btn_inventory').should('exist').click()
                    }
                })
            })

        // Step 6 : User press cart button to open cart page
        cy.get('#shopping_cart_container .shopping_cart_link').should('exist').click()

        // Step 7 : In cart page, user press checkout button
        cy.url().should('include', '/cart.html') 
        cy.get('#checkout').should('exist').click()

        // Expected Result :
        cy.url().should('include', '/checkout-step-one.html') 
        cy.get('#first-name').should('exist')
        cy.get('#last-name').should('exist')
        cy.get('#postal-code').should('exist')

        // Audit
        cy.screenshot('TC-CA-003 - Expected Result')
    })

    it('TC-CA-004 - User can not checkout empty cart (Negative)', () => {
        // Test Data
        const username = "standard_user"
        const password = "secret_sauce"
        const selectedProduct = 'Sauce Labs Bike Light'

        // Step 1 : User visit the base url
        cy.visit('/')

        // Step 2 : User fill the username and password field
        cy.get('#user-name').should('exist').type(username)
        cy.get('#password').should('exist').type(password)

        // Step 3 : User press the "Login" button
        cy.get('#login-button').should('exist').click()

        // Step 4 : User press cart button to open cart page
        cy.url().should('include', '/inventory.html') 
        cy.get('#shopping_cart_container .shopping_cart_link').should('exist').click()

        // Step 5 : In cart page, user press checkout button
        cy.url().should('include', '/cart.html') 
        cy.get('#checkout').should('exist').click()
        cy.url().should('include', '/cart.html') 

        // Expected Result : The system will be show failed message when click checkout with empty cart
        cy.get('#failed-modal').should('have.text', 'Cant checkout with no product selected')

        // Audit
        cy.screenshot('TC-CA-004 - Expected Result')
    })
})
  