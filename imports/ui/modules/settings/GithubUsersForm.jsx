import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { StylesMUI } from '/lib/styles/StylesMUI';
import {ModalAppBar } from '/imports/ui/components/widgets/ModalAppBar';

/* Material UI */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

/* Material UI Dialog */
const styles = theme =>
    StylesMUI.Primary(theme, {
        dialogContent: {
            display: 'flex',
            flex: '1 1 auto',
        },
        dialogColumns: {
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            margin: 10
        },
        dialogFooter: {
            display: 'flex',
            justifyContent: 'flex-end',
            margin: 0,
            padding: '5px 24px',
        },
        checkBox: {
            padding: 0,
        },
    });

class GithubUsersForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            userName: ''
        };

        this.initBind();
    }

    static propTypes = {
        id: PropTypes.number,
        data: PropTypes.object,
        opened: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
    };

    initBind() {
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSave() {

    }

    onChange(field, value) {
        this.setState({ [field]: value });
    }

    renderTextField(label, fieldValue, fieldName) {

        return(
            <TextField
                label={label}
                value={fieldValue}
                margin="dense"
                variant="outlined"
                onChange={event => {
                    const value = event.target.value;

                    this.onChange(fieldName, value);
                }}
            />
        );
    }

    render() {
        const { props: { classes, opened, onClose, data }, state: { firstName, lastName, userName} } = this;
        const modalTitle = isEmpty(data) ? 'New' : 'Edit';

        return(
            <Dialog
                open={opened}
                onClose={onClose}
                disableBackdropClick
                maxWidth="sm"
                fullWidth={true}
            >
                <ModalAppBar
                    title={`${modalTitle} Github User`}
                    onClose={onClose}
                />
                <DialogContent className={classes.dialogContent} dividers>
                    <div className={classes.dialogColumns}>
                        {this.renderTextField('First Name', firstName, 'firstName')}
                        {this.renderTextField('Last Name', lastName, 'lastName')}
                    </div>
                    <div className={classes.dialogColumns}>
                        {this.renderTextField('User Name', userName, 'userName')}
                    </div>
                </DialogContent>
                <DialogActions className={classes.dialogFooter}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ width: 70, height: 34 }}
                        onClick={this.onSave}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const dialog = withStyles(styles)(GithubUsersForm);

export { dialog as GithubUsersForm };
