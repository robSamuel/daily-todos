import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => 
  createStyles({
    itemContent: {
      display: 'flex',
      alignItems: 'center'
    },
    itemText: {
      marginRight: theme.spacing(1)
    },
    chip: {
      fontSize: 12,
      height: 20,
      width: 60
    },
    menuItem: {
      '&:focus': {
        textDecoration: 'none',
      },
    },
    icon: {
      fontSize: '1.8rem',
      minHeight: 56,
      minWidth: 56,
      textAlign: 'center',
    },
    iconImage: {
      height: 48,
      width: 48,
    },
  })
);
