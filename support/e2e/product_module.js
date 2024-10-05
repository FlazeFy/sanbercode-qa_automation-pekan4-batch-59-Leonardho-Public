describe('Auth Module', () => {
    it('TC-PD-001 - User can see all product that contain image, product name, description, and price in dollar (Positive)', () => {
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

        // Step 4 : User see all the product with its information
        // Expected Result
        cy.url().should('include', '/inventory.html') 
        cy.get('#inventory_container .inventory_list').should('exist').children() 
            .each(($el) => {
                cy.wrap($el).find('.inventory_item_img').should('exist')
                cy.wrap($el).find('.inventory_item_name').should('exist')
                cy.wrap($el).find('.inventory_item_desc').should('exist')
                cy.wrap($el).find('.inventory_item_price').should('exist').contains('$')
            })

        // Audit
        cy.screenshot('TC-PD-001 - Expected Result')
    })

    it('TC-PD-002 - User can add product to cart via product list page (Positive)', () => {
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

        // Step 4 : User select product with name "Sauce Labs Bike Light"
        cy.url().should('include', '/inventory.html') 
        cy.get('#inventory_container .inventory_list').should('exist').children() 
            .each(($el) => {
                cy.wrap($el).find('.inventory_item_name').invoke('text').then((itemName) => {
                    if (itemName.includes('Sauce Labs Bike Light')) {
                        // Step 5 : User press the "Add to Cart"
                        cy.wrap($el).find('.btn_inventory').should('exist').click()
                    }
                })
            })

        // Step 6 : User see total item in cart shown in cart menu button 
        // Expected Result
        cy.get('#shopping_cart_container .shopping_cart_badge').should('exist').contains('1')

        // Audit
        cy.screenshot('TC-PD-002 - Expected Result')
    })

    it('TC-PD-003 - User can remove product from cart via product list page (Positive)', () => {
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

        // Step 4 : User select product with name "Sauce Labs Bike Light"
        cy.url().should('include', '/inventory.html') 
        cy.get('#inventory_container .inventory_list').should('exist').children() 
            .each(($el) => {
                cy.wrap($el).find('.inventory_item_name').invoke('text').then((itemName) => {
                    if (itemName.includes('Sauce Labs Bike Light')) {
                        // Step 5 : User press the "Add to Cart"
                        cy.wrap($el).find('.btn_inventory').should('exist').click()

                        // Step 6 :At the same product, user press "Remove"
                        cy.wrap($el).find('.btn_inventory').should('exist').click()
                    }
                })
            })

        // Step 7 : User see total item in cart shown in cart menu button 
        // Expected Result
        cy.get('#shopping_cart_container .shopping_cart_badge').should('not.exist')
        cy.get('#shopping_cart_container').should('not.contain', '1')

        // Audit
        cy.screenshot('TC-PD-003 - Expected Result')
    })
})
  