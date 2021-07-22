import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  avatar: {
    width: '150px',
    height: '150px',
  },
  toolbar: {
    marginTop: theme.spacing(4),
  },
  container: {
    marginRight: '120px',
    marginLeft: '120px',
    [theme.breakpoints.down(747)]: {
      marginRight: '10px',
      marginLeft: '10px',
    },
  },
}));
