const sumProp = prop => array =>
  array.reduce((sum, item) => sum + item[prop], 0)

const sumAmounts = sumProp('amount')
const sumFrequentRenterPoints = sumProp('frequentRenterPoints')

const calculateBonus = (days, threshold) =>
  days > threshold
    ? (days - threshold) * 1.5
    : 0

const calculateAmount = (movieCode, days) => ({
  'regular': 2 + calculateBonus(days, 2),
  'new': days * 3,
  'childrens': 1.5 + calculateBonus(days, 3),
})[movieCode]

const calculateFrequentRenterPoints = (movieCode, days) => ({
  'regular': 1,
  'new': 1 + (days > 2 ? 1 : 0),
  'childrens': 1,
})[movieCode]

const buildRentalRecord = movies => rental => {
  const movie = movies[rental.movieID]
  return {
    movie,
    amount: calculateAmount(movie.code, rental.days),
    frequentRenterPoints: calculateFrequentRenterPoints(movie.code, rental.days)
  }
}

const printFigures = rentalRecord =>
  `\t${rentalRecord.movie.title}\t${rentalRecord.amount}\n`

const printStatementForCustomer = customer => rentalRecords =>
  `Rental Record for ${customer.name}\n
  ${rentalRecords.map(printFigures)}
  Amount owed is ${sumAmounts(rentalRecords)}\n
  You earned ${sumFrequentRenterPoints(rentalRecords)} frequent renter points\n`

function statement(customer, movies) {
  const toRentalRecord = buildRentalRecord(movies)
  const printStatement = printStatementForCustomer(customer)
  const rentalRecords = customer.rentals.map(toRentalRecord)
  return printStatement(rentalRecords)
}

module.exports = statement
