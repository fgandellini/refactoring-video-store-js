const assert = require('assert')
const statement = require('./index')

const MOVIES = {
  F001: { title: 'Ran', code: 'regular'},
  F002: { title: 'Trois Couleurs: Bleu', code: 'regular'},
}

const customer = {
  name: 'martin',
  rentals: [
    { movieID: 'F001', days: 3 },
    { movieID: 'F002', days: 1 },
  ]
}

const output =
'Rental Record for martin' +
'\n\tRan\t3.5' +
'\n\tTrois Couleurs: Bleu\t2' +
'\nAmount owed is 5.5' +
'\nYou earned 2 frequent renter points' +
'\n'

describe('statement', () => {
  it('should work', () => {
    assert.equal(output, statement(customer, MOVIES))
  })
})
