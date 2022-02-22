import moment from 'moment';

export default (fecha: string) => {
  const hoyMes = moment(fecha);
  return hoyMes.format('HH:mm a | MMMM DD');
};
