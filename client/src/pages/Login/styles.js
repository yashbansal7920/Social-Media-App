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
  // form: {
  //   marginLeft: 0,
  //   [theme.breakpoints.up('xs')]: {
  //     marginLeft: '10%',
  //   },
  // },
}));
