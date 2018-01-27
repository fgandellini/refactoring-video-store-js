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
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let r of customer.rentals) {
    const rentalRecord = buildRentalRecord(movies)(r)
    frequentRenterPoints += rentalRecord.frequentRenterPoints
    result += printFigures(rentalRecord)
    totalAmount += rentalRecord.amount
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
}

module.exports = statement
