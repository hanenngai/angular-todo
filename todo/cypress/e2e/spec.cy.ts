describe('Todo list Test', () => {

  beforeEach(() => {
    // Visit the Todo list app
    cy.visit('http://localhost:4200'); // Change the URL if needed
  });

  it('should view the title', () => {
    cy.get('h1').contains('My To Do List')
  });

  it('should add an item', () => {
    //Type new item in input
    cy.get('#addItemInput').type('test app')

    //Press Add
    cy.get('.btn-primary').click()

    //Check all items
    cy.contains('app-item','eat')
    cy.contains('app-item','sleep')
    cy.contains('app-item','play')
    cy.contains('app-item','laugh')
    //Check if new item is added
    cy.contains('app-item','test app')
    cy.get('app-item').should('have.length', 5)

  });

  it('should delete an item', () => {
    //Delete play
    cy.contains('app-item','play').within(() => {
      cy.get('.btn.btn-warn').click()
    })
    //Check all items left
    cy.contains('app-item','eat')
    cy.contains('app-item','sleep')
    cy.contains('app-item','laugh')
    cy.get('app-item').should('have.length', 3)
  }); 

  it('should mark item as done and undone and view todo and done lists', () => {
    //Check sleep as done
    cy.contains('app-item', 'sleep').within(() => {
      cy.get('input').click({force:true});
    })

    //View done list
    cy.contains('.btn.btn-menu', 'Done').click();
    cy.contains('app-item','eat')
    cy.contains('app-item','sleep')
    cy.get('app-item').should('have.length', 2)

    //View todo list
    cy.contains('.btn.btn-menu', 'To Do').click();
    cy.contains('app-item','play')
    cy.contains('app-item','laugh')
    cy.get('app-item').should('have.length', 2)

    //Undo check for sleep
    cy.contains('.btn.btn-menu', 'Done').click();
    cy.contains('app-item', 'sleep').within(() => {
      cy.get('input').click({force:true});
    })
    cy.contains('.btn.btn-menu', 'To Do').click();
    cy.contains('app-item','play')
    cy.contains('app-item','laugh')
    cy.contains('app-item','sleep')
    cy.get('app-item').should('have.length', 3)
  })

  it('should save edit and cancel edit', () => {
    //Edit sleep but cancel
    cy.contains('app-item', 'sleep').within(() => {
      cy.contains('button', 'Edit').click();
      cy.get('.sm-text-input').clear().type('nap')
      cy.contains('button', 'Cancel').click()
    })
    //Cancel and check 
    cy.contains('app-item','sleep')
    //Edit sleep and submit
    cy.contains('app-item', 'sleep').within(() => {
      cy.contains('button', 'Edit').click();
      cy.get('.sm-text-input').clear().type('nap')
      cy.contains('button', 'Save').click()
    })
    cy.contains('app-item','nap')
  })
})