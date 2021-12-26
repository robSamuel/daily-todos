import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => 
  createStyles({
    container: {
      background: theme.palette.background.paper,
      padding: theme.spacing(2),
      width: '100%'
    },
    button: {
      marginRight: theme.spacing(1.25),
    }
  })
);