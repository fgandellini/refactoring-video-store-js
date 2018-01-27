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

function statement(customer, movies) {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let r of customer.rentals) {
    let movie = movies[r.movieID];
    let thisAmount = calculateAmount(movie.code, r.days)
    let thisFrequentRenterPoints = calculateFrequentRenterPoints(movie.code, r.days)

    //add frequent renter points
    frequentRenterPoints += thisFrequentRenterPoints

    //print figures for this rental
    result += `\t${movie.title}\t${thisAmount}\n` ;
    totalAmount += thisAmount;
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
}

module.exports = statement
