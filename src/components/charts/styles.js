import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  income: {
    maxWidth: 650,
    borderRadius: 20,
    borderBottom: '15px solid rgb(182, 235, 122, 0.6)',
  },
  expense: {
    maxWidth: 650,
    borderRadius: 20,
    borderBottom: '15px solid rgba(255, 0, 0, 0.7)',
  },
}));