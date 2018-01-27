const sumProp = prop => array =>
  array.reduce((sum, item) => sum + item[prop], 0)

const calculateBonus = (days, threshold) =>
  days > threshold
    ? (days - threshold) * 1.5
    : 0

const calculateMovieAmounts = days => ({
  'regular': 2 + calculateBonus(days, 2),
  'new': days * 3,
  'childrens': 1.5 + calculateBonus(days, 3),
}) 

const calculateAmount = (movieCode, days) =>
  calculateMovieAmounts(days)[movieCode]

const calculateMovieFrequentRenterPoints = days => ({
  'regular': 1,
  'new': 1 + (days > 2 ? 1 : 0),
  'childrens': 1,
})

const calculateFrequentRenterPoints = (movieCode, days) =>
  calculateMovieFrequentRenterPoints(days)[movieCode]

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

function statement(customer, movies) {
  let result = `Rental Record for ${customer.name}\n`;
  const toRentalRecord = buildRentalRecord(movies)
  const rentalRecords = customer.rentals.map(toRentalRecord)

  const frequentRenterPoints = sumProp('frequentRenterPoints')(rentalRecords)
  const totalAmount = sumProp('amount')(rentalRecords)

  for (let rentalRecord of rentalRecords) {
    result += printFigures(rentalRecord)
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
}

module.exports = statement
