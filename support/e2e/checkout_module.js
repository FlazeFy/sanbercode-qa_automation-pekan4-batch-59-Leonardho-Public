describe('Checkout Module', () => {
    it('TC-CK-001 - User can submit checkout using valid credentials (Positive)', () => {
        // Test Data
        const username = "standard_user"
        const password = "secret_sauce"
        const selectedProduct = 'Sauce Labs Bike Light'
        const firstName = "Leonardho"
        const lastName = "Sitanggang"
        const zipCode = "99351"

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

        // Step 8 : User fill the checkout form
        cy.url().should('include', '/checkout-step-one.html') 
        cy.get('#first-name').should('exist').type(firstName)
        cy.get('#last-name').should('exist').type(lastName)
        cy.get('#postal-code').should('exist').type(zipCode)

        // Step 9 : User press continue button
        cy.get('#continue').should('exist').click()

        // Expected Result
        cy.url().should('include', '/checkout-step-two.html') 
        cy.get('.summary_info').should('exist')
        const formLabels = ['Payment Information','Shipping Information','Price Total','Total']
        formLabels.forEach(el => {
            cy.get('.summary_info').contains(el)
        });

        // Audit
        cy.screenshot('TC-CK-001 - Expected Result')
    })

    it('TC-CK-002 - User can not submit checkout with all empty field (Negative)', () => {
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

        // Step 8 : User press continue button
        cy.url().should('include', '/checkout-step-one.html') 
        cy.get('#continue').should('exist').click()

        // Expected Result
        cy.url().should('include', '/checkout-step-one.html') 
        cy.get('.error-message-container').should('exist').contains('First Name is required')

        // Audit
        cy.screenshot('TC-CK-002 - Expected Result')
    })

    it('TC-CK-003 - User can not submit checkout with empty first name (Negative)', () => {
        // Test Data
        const username = "standard_user"
        const password = "secret_sauce"
        const selectedProduct = 'Sauce Labs Bike Light'
        const lastName = "Sitanggang"
        const zipCode = "99351"

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

        // Step 8 : User fill the last name and postal code field
        cy.url().should('include', '/checkout-step-one.html') 
        cy.get('#last-name').should('exist').type(lastName)
        cy.get('#postal-code').should('exist').type(zipCode)

        // Step 9 : User press continue button
        cy.get('#continue').should('exist').click()

        // Expected Result
        cy.url().should('include', '/checkout-step-one.html') 
        cy.get('.error-message-container').should('exist').contains('First Name is required')

        // Audit
        cy.screenshot('TC-CK-003 - Expected Result')
    })

    it('TC-CK-004 - User can not submit checkout with empty last name (Negative)', () => {
        // Test Data
        const username = "standard_user"
        const password = "secret_sauce"
        const selectedProduct = 'Sauce Labs Bike Light'
        const firstName = "Leonardho"
        const zipCode = "99351"

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

        // Step 8 : User fill the first name and postal code field
        cy.url().should('include', '/checkout-step-one.html') 
        cy.get('#first-name').should('exist').type(firstName)
        cy.get('#postal-code').should('exist').type(zipCode)

        // Step 9 : User press continue button
        cy.get('#continue').should('exist').click()

        // Expected Result
        cy.url().should('include', '/checkout-step-one.html') 
        cy.get('.error-message-container').should('exist').contains('Last Name is required')

        // Audit
        cy.screenshot('TC-CK-004 - Expected Result')
    })

    it('TC-CK-005 - User can not submit checkout with empty zip code (Negative)', () => {
        // Test Data
        const username = "standard_user"
        const password = "secret_sauce"
        const selectedProduct = 'Sauce Labs Bike Light'
        const firstName = "Leonardho"
        const lastName = "Sitanggang"

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

        // Step 8 : User fill the first name and last name field
        cy.url().should('include', '/checkout-step-one.html') 
        cy.get('#first-name').should('exist').type(firstName)
        cy.get('#last-name').should('exist').type(lastName)

        // Step 9 : User press continue button
        cy.get('#continue').should('exist').click()

        // Expected Result
        cy.url().should('include', '/checkout-step-one.html') 
        cy.get('.error-message-container').should('exist').contains('Postal Code is required')

        // Audit
        cy.screenshot('TC-CK-005 - Expected Result')
    })

    it('TC-CK-006 - User can finish the overview checkout and back to product page with reset all selected product from previous transaction (Positive)', () => {
        // Test Data
        const username = "standard_user"
        const password = "secret_sauce"
        const selectedProduct = 'Sauce Labs Bike Light'
        const firstName = "Leonardho"
        const lastName = "Sitanggang"
        const zipCode = "99351"

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

        // Step 8 : User fill the checkout form
        cy.url().should('include', '/checkout-step-one.html') 
        cy.get('#first-name').should('exist').type(firstName)
        cy.get('#last-name').should('exist').type(lastName)
        cy.get('#postal-code').should('exist').type(zipCode)

        // Step 9 : User press continue button
        cy.get('#continue').should('exist').click()

        // Step 10 : User finish by click "Finish" the checkout after got the overview
        cy.url().should('include', '/checkout-step-two.html') 
        cy.get('.summary_info').should('exist')
        const formLabels = ['Payment Information','Shipping Information','Price Total','Total']
        formLabels.forEach(el => {
            cy.get('.summary_info').contains(el)
        });
        cy.get('#finish').should('exist').click()

        // Step 11 : User got success checkout message and click "Back Home" to back to product page
        cy.url().should('include', '/checkout-complete.html') 
        cy.get('#checkout_complete_container').contains('Thank you for your order!')
        cy.get('#back-to-products').should('exist').click()

        cy.url().should('include', '/inventory.html') 

        // Expected Result :
        cy.get('#shopping_cart_container .shopping_cart_badge').should('not.exist')
        cy.get('#shopping_cart_container').should('not.contain', '1')

        // Audit
        cy.screenshot('TC-CK-006 - Expected Result')
    })
})
  