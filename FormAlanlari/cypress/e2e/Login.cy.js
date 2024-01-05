import { usersData } from "../../src/usersData"

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5184/')
  })
})

let userMail=''
let userPassword=''
usersData.forEach(item=>{
  return userMail=item.email
})
usersData.forEach(item=>{
  return userPassword=item.password
})

describe('Success Tests',()=>{
  beforeEach(() => {
    cy.visit("/");
  });
  it('sends to main page on successful login',()=>{
    cy.get('[name="email"]').type(userMail)
    cy.get("[name='password']").type(userPassword)
    cy.get("[data-cy='login-submit']").as("submitButton");

    cy.get("@submitButton").should('be.enabled')
    cy.get('@submitButton').click();
    cy.url().should('eq','http://localhost:5184/main')
  })
})

describe('Fail Tests',()=>{
  beforeEach(()=>{
    cy.visit('/')
  })
  it("sends to error page on failed login",()=>{
    cy.get('[name="email"]').type(userMail)
    cy.get("[name='password']").type('asljfasjas.')
    cy.get("[data-cy='login-submit']").as("submitButton");

    cy.get("@submitButton").should('be.enabled')
    cy.get('@submitButton').click();
    cy.url().should('eq','http://localhost:5184/error')
  })
})