const assert = require('assert')
const statement = require('./index')

const MOVIES = {
  F001: { title: 'Ran', code: 'regular'},
  F002: { title: 'Trois Couleurs: Bleu', code: 'regular'},
  F003: { title: 'Logan', code: 'new' },
  F004: { title: 'Robin Hood', code: 'childrens' },
}

const customer1 = {
  name: 'martin',
  rentals: [
    { movieID: 'F001', days: 3 },
    { movieID: 'F002', days: 1 },
  ]
}

const output1 =
'Rental Record for martin' +
'\n\tRan\t3.5' +
'\n\tTrois Couleurs: Bleu\t2' +
'\nAmount owed is 5.5' +
'\nYou earned 2 frequent renter points' +
'\n'

const customer2 = {
  name: 'fede',
  rentals: [
    { movieID: 'F003', days: 4 },
    { movieID: 'F004', days: 5 },
  ]
}

const output2 =
'Rental Record for fede' +
'\n\tLogan\t12' +
'\n\tRobin Hood\t4.5' +
'\nAmount owed is 16.5' +
'\nYou earned 3 frequent renter points' +
'\n'

const customer3 = {
  name: 'rob',
  rentals: [
    { movieID: 'F001', days: 1 },
    { movieID: 'F004', days: 2 },
  ]
}

const output3 =
'Rental Record for rob' +
'\n\tRan\t2' +
'\n\tRobin Hood\t1.5' +
'\nAmount owed is 3.5' +
'\nYou earned 2 frequent renter points' +
'\n'

describe('statement', () => {

  it('should print statement for customer 1', () => {
    assert.equal(output1, statement(customer1, MOVIES))
  })

  it('should print statement for customer 2', () => {
    assert.equal(output2, statement(customer2, MOVIES))
  })

  it('should print statement for customer 3', () => {
    assert.equal(output3, statement(customer3, MOVIES))
  })

})
