import moment from 'moment';

const DateConvert=(utcString)=>{
// Parse as UTC, shift to IST (+05:30), and format
const formattedIST = moment.utc(utcString)
  .utcOffset("+05:30")                // Convert to IST
  .format("DD/MM/YY");         // Format as required

return formattedIST;
}

export default DateConvert;
