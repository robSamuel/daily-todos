import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StylesMUI } from '/lib/styles/StylesMUI';
import { StringUtils } from '/lib/StringUtils.js';

/*Marerial-UI*/
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme =>
    StylesMUI.Primary(theme, {
        toolbarSm: {
            minHeight: 36,
        },
    });

class ModalAppBar extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        toolbarSize: PropTypes.string,
        onClose: PropTypes.func.isRequired,
        appBarClassName: PropTypes.string,
        titleVariant: PropTypes.string,
    };

    static get defaultProps() {
        return {
            toolbarSize: '',
            appBarClassName: '',
            titleVariant: ''
        };
    }

    render() {
        const {
            props: {
                classes,
                title,
                onClose,
                toolbarSize,
                appBarClassName,
                titleVariant,
            }
        } = this;
        const toolbarClassName = toolbarSize === 'sm' ? classes.toolbarSm : '';
        const appBarClass = StringUtils.isEmpty(appBarClassName) ? '' : appBarClassName;
        const customTitleVariant = StringUtils.isEmpty(titleVariant)
            ? 'subtitle1'
            : titleVariant;

        return (
            <DialogTitle className={classes.dialogTitleAppBar}>
                <AppBar className={`${classes.appBar} ${appBarClass}`}>
                    <Toolbar className={toolbarClassName}>
                        <Typography
                            variant={customTitleVariant}
                            color="inherit"
                            className={classes.flex}
                        >
                            {title}
                        </Typography>
                        {onClose && (
                            <IconButton
                                color="inherit"
                                aria-label="Close"
                                onClick={onClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </AppBar>
            </DialogTitle>
        );
    }
}

const dialog = withStyles(styles)(ModalAppBar);

export { dialog as ModalAppBar };
