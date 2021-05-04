import * as dateUtil from './date.js';
function formatPhone(phone, code) {
  const countryCode = code.split('_')[0];
  return `+${countryCode}${phone}`;
}
const utils = { ...dateUtil, formatPhone };
export default utils;
