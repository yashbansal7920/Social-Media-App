import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '10%',
    },
  },
  lastInput: {
    marginBottom: theme.spacing(4),
  },
  btn: {
    marginRight: '20px',
    marginBottom: '10px',
  },
  form: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10%',
    },
  },
}));
