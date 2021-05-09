import _ from 'lodash';
import moment from 'moment';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm';
export function dateFormat(time) {
  if (!time) {
    return '-';
  }
  if (_.isNaN(+time)) {
    return moment(time).format(DATE_FORMAT);
  }
  return moment(+time).format(DATE_FORMAT);
}
