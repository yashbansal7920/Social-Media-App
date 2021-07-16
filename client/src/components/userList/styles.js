import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  cardContent: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    margin: '0 auto',
    width: '60vw',
    marginBottom: '10px',
  },
  avatar: {
    height: '65px',
    width: '65px',
  },
}));
