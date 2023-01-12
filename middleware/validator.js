const Validator = {};

Validator.checkName = function nameCheck(el) {
  const regexName = /^[а-яА-я]+$/;

  if (regexName.test(el)) {
    return true;
  } else {
    return false;
  }
};

Validator.checkEmail = function emailCheck(el) {
  const regexEmail =
    /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/;

  if (regexEmail.test(el)) {
    return true;
  } else {
    return false;
  }
};

Validator.checkRating = function ratingCheck(el) {
  if (el >= 1 && el <= 5) {
    return true;
  } else {
    return false;
  }
};

Validator.dateChecker = function checkerDate(day, hours) {
  let d = new Date();
  let currentDay = String(d.getDate());
  let currentMonth = String(d.getMonth() + 1);
  let currentYear = String(d.getFullYear());
  let currenthour = String(d.getHours())
  let currentTimestamp = Validator.dateConverter(currentDay, currentMonth, currentYear, currenthour)
  let date = day.split('.')

  if (date[0][0] == 0) date[0] = date[0][1]
  if(Validator.dateConverter(date[0], date[1], date[2], hours.split('-')[0]) > currentTimestamp) {
    return true
  }else return false
}

Validator.dateConverter = function converterData(day, month, year, hour) {
  if (Number(day)[0] == 0) Number(day) = Number(day)[1]
   return (year * 8760 + month * 730 + day * 24 + hour)
 }

Validator.hoursChecker = function checkerHours(hours) {
  if(hours >= 9 && hours <= 17) {
    return true
  } else {
    return false
  }
}

module.exports = Validator;
