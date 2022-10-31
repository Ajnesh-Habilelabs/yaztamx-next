import moment from 'moment';

export const getTotalFromWeekly = (
  weeklyRate,
  selectStartDate,
  selectEndDate
) => {
  console.log("selectStartDate,", selectEndDate);
  console.log("selectEndDate", selectEndDate);
  console.log("days", (selectEndDate - selectStartDate)/(60*60*24*1000));
  const perDayRate = weeklyRate / 7;
  // // const startDate = moment(selectStartDate).format('DD');
  // // const endDate = moment(selectEndDate).format('DD');
  const days = selectEndDate > selectStartDate ? parseInt(((selectEndDate - selectStartDate)/(60*60*24*1000)) + 1): 1;
  const totalPrice = days * perDayRate;
  // const totalPrice = days + 1 * perDayRate;
  // // for 2 digit after dot in float but it will give values in string
  // // totalPayout.toFixed(2)
  // let totalPrice = 10;
  // let days = 5;
  return { totalPrice, days };
};

export const getDiscount = (totalAmount) => {
  const discount = (totalAmount * 5) / 100;
  return discount;
};

export const getTotalWithDiscount = (price, discount) => {
  const totalFee = price - discount;
  return totalFee;
};

export const getTimeFromDate = (timestamp) => {
  const pad = (num) => ('0' + num).slice(-2);
  let hours = timestamp.getHours(),
    minutes = timestamp.getMinutes(),
    seconds = timestamp.getSeconds();
  return pad(hours) + ':' + pad(minutes);
};

export const calculateTotal = (perHourRate, numHours) => {
  const totalHours = numHours?.split(':')[0];
  const totalMinutes = numHours?.split(':')[1];
  let minuteRate = 0;
  if (totalMinutes > 29) {
    minuteRate = perHourRate / 2;
  }
  const totalPayment = totalHours * perHourRate + minuteRate;
  return totalPayment;
};

export const calculateTotalPrice = (perHourRate, numHours) => {
  const totalHours = ~~(numHours);
  const totalMinutes = Number(String(numHours)?.split('.')[1])*6;
  let minuteRate = 0;
  if (totalMinutes > 29) {
    minuteRate = perHourRate / 2;
  }
  const totalPayment = totalHours * perHourRate + minuteRate;
  console.log(totalPayment)
  return totalPayment;
};

export const differenceInTime = (start, end) => {
  start = start.split(':');
  end = end.split(':');
  var startDate = new Date(0, 0, 0, start[0], start[1], 0);
  var endDate = new Date(0, 0, 0, end[0], end[1], 0);
  var diff = endDate.getTime() - startDate.getTime();
  var hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(diff / 1000 / 60);
  // If using time pickers with 24 hours format, add the below line get exact hours
  // if (hours < 0) {
  //   console.log('hours :', hours);
  //   hours = hours + 24;
  // }
  return (
    (hours <= 9 ? '0' : '') + hours + ':' + (minutes <= 9 ? '0' : '') + minutes
  );
};

export const getDifferenceInDate = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  const difference = Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
  return difference;
};

export const totalPayWithDays = (
  hours,
  hourRate,
  days
) => {
  let totalPerDay;
  totalPerDay = (hours) * (hourRate) * (days);
  return totalPerDay;
  // console.log("hours", hours)
  // console.log("hourRate", hourRate)
  // console.log("numWeeks", numWeeks)
  // console.log(totalPerDay, "totalPerDay")
  // const totalPayment = totalPerDay;
  // console.log(days, "days")
  // console.log(totalPayment, typeof totalPayment,"this is my helperjs");
};

export const getRoomId = (clientId, proId) => {
  const roomId = `f${clientId}t${proId}`;
  return roomId;
};

export const getTimeDiff = (startTime, endTime) => {
  let start = startTime?.split(':')[0];
  let end = endTime?.split(':')[0];
  let diff = end > start;
  return diff;
};

export const getDateDiff = (startDate, endDate) => {
  if (Date.parse(startDate) < Date.parse(endDate)) {
    return true;
  } else {
    return false;
  }
};


export const getTZAwareTimeComparison = (startTime, endTime) => {
  let start = new Date(`${startTime}`);
  let end = new Date(`${endTime}`);
  let diff = end > start
  return diff;
};


export const getTZAwareTimeDifference = (startTime, endTime) => {
  let start = new Date(`${startTime}`);
  let end = new Date(`${endTime}`);
  let diff = end - start;
  return diff;
};
