import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  signup: {
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '8px',
    },
  },
  avatar: {
    height: '62px',
    width: '62px',
    marginRight: '20px',
  },
}));
