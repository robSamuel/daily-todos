import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => 
  createStyles({
    menuContainer: {
      background: theme.palette.background.paper,
      maxWidth: 360,
      width: '100%',
    }
  })
);