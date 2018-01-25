const calculateBonus = (days, threshold) =>
  days > threshold
    ? (days - threshold) * 1.5
    : 0

const calculateAmount = (movieCode, days) => {
  switch (movieCode) {
    case "regular":
      return 2 + calculateBonus(days, 2)
    case "new":
      return days * 3;
    case "childrens":
      return 1.5 + calculateBonus(days, 3)
  }
}

function statement(customer, movies) {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let r of customer.rentals) {
    let movie = movies[r.movieID];
    let thisAmount = 0;

    thisAmount = calculateAmount(movie.code, r.days)

    //add frequent renter points
    frequentRenterPoints++;
    // add bonus for a two day new release rental
    if(movie.code === "new" && r.days > 2) frequentRenterPoints++;

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
