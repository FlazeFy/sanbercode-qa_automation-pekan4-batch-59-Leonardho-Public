describe('Auth Module', () => {
    it('TC-AU-001 - User can login to Swag Labs with valid credentials (Positive)', () => {
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

        // Expected Result
        cy.url().should('include', '/inventory.html') 

        // Audit
        cy.screenshot('TC-AU-001 - Expected Result')
    })

    it('TC-AU-002 - User can not login to Swag Labs with empty username (Negative)', () => {
        // Test Data
        const password = "secret_sauce"

        // Step 1 : User visit the base url
        cy.visit('/')

        // Step 2 : User fill the password field
        cy.get('#password').should('exist').type(password)

        // Step 3 : User press the "Login" button
        cy.get('#login-button').should('exist').click()

        // Expected Result
        cy.url().should('include', '/') 
        cy.get('.error-message-container').should('exist').and('contain.text', 'Username is required') 

        // Audit
        cy.screenshot('TC-AU-002 - Expected Result')
    })

    it('TC-AU-003 - User can not login to Swag Labs with empty password (Negative)', () => {
        // Test Data
        const username = "standard_user"

        // Step 1 : User visit the base url
        cy.visit('/')

        // Step 2 : User fill the username field
        cy.get('#user-name').should('exist').type(username)

        // Step 3 : User press the "Login" button
        cy.get('#login-button').should('exist').click()

        // Expected Result
        cy.url().should('include', '/') 
        cy.get('.error-message-container').should('exist').and('contain.text', 'Password is required')

        // Audit
        cy.screenshot('TC-AU-003 - Expected Result') 
    })

    it('TC-AU-004 - User can login to Swag Labs with valid credentials (Negative)', () => {
        // Test Data
        const username = "special_user"
        const password = "spicy_sauce"

        // Step 1 : User visit the base url
        cy.visit('/')

        // Step 2 : User fill the username and password field
        cy.get('#user-name').should('exist').type(username)
        cy.get('#password').should('exist').type(password)

        // Step 3 : User press the "Login" button
        cy.get('#login-button').should('exist').click()

        // Expected Result
        cy.url().should('include', '/') 
        cy.get('.error-message-container').should('exist').and('contain.text', 'Username and password do not match any user in this service') 

        // Audit
        cy.screenshot('TC-AU-004 - Expected Result')
    })

    it('TC-AU-005 - User can sign out from Swag Labs (Positive)', () => {
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

        // Step 4 : In product page, user press left navbar button
        cy.url().should('include', '/inventory.html') 
        cy.get('#react-burger-menu-btn').should('exist').click()

        // Step 5 : User click the "Logout" button
        cy.get('#logout_sidebar_link').should('exist').click()

        // Expected Result
        cy.url().should('include', '/') 

        // Audit
        cy.screenshot('TC-AU-005 - Expected Result')
    })
})
  