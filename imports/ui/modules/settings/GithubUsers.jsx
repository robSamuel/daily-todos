import React from 'react';
import moment from 'moment';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Table } from '/imports/ui/components/widgets/Table';
import { DialogConfirm } from '/imports/ui/components/widgets/DialogConfirm';
import { SettingsPanel } from '/imports/ui/components/widgets/SettingsPanel';
import { GithubUsersForm } from '/imports/ui/modules/settings/GithubUsersForm';
/*Material UI*/
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    buttonStyle: {
        marginRight: 10
    }
});

class GithubUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            isDeleting: false,
            selectedRecord: null,
            showDeleteModal: false,
        };

        this.initBind();
    }

    static propTypes = {
        records: PropTypes.array,
        classes: PropTypes.object
    };

    initBind() {
        this.onClose = this.onClose.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.getRecords = this.getRecords.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.selectedRow = this.selectedRow.bind(this);
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        this.onShowDeleteModal = this.onShowDeleteModal.bind(this);
    }

    onClose(record) {
        this.setState({ open: false, selectedRecord: record });
    }

    onCreate() {
        this.setState({ open: true, selectedRecord: null });
    }

    onEdit(record) {
        const { state } = this;
        const user = isEmpty(record) ? state.selectedRecord : record;

        if(!isEmpty(user))
            this.setState({ open: true, selectedRecord: user });
    }

    onShowDeleteModal() {
        this.setState(prevState => ({ showDeleteModal: !prevState.showDeleteModal }));
    }

    onDelete() {
        const { state: { selectedRecord } } = this;
        const userName = selectedRecord.userName || '';

        this.setState({ isDeleting: true });

        try {
            Meteor.call('deleteGithubUser', selectedRecord._id, error => {
                if(!error) {
                    message.success(`User ${userName} was deleted succesfully!`);

                    this.setState({ showDeleteModal: false, selectedRecord: null });
                }
            });
        } catch (e) {
            message.error(`There was an error while trying to delete the user ${userName}.`);
        } finally {
            this.setState({ isDeleting: false });
        }
    }

    getColumns() {
        const columnStyle = {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            border: 'none',
        };

        const columns = [
            {
                Header: 'User Name',
                accessor: 'userName',
                style: columnStyle,
            },
            {
                Header: 'First Name',
                accessor: 'firstName',
                style: columnStyle,
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
                style: columnStyle,
            },
            {
                Header: 'Show Followers',
                id: 'showFollowers',
                accessor: record => record,
                style: columnStyle,
                Cell: props => {
                    const record = props.value || {};
                    const show = record.showFollowers ? 'Yes' : 'No';

                    return <span>{show}</span>;
                }
            },
            {
                Header: 'Show Following',
                id: 'showFollowing',
                accessor: record => record,
                style: columnStyle,
                Cell: props => {
                    const record = props.value || {};
                    const show = record.showFollowing ? 'Yes' : 'No';

                    return <span>{show}</span>;
                }
            },
            {
                Header: 'Created By',
                accessor: 'createdBy',
                style: columnStyle,
            },
            {
                Header: 'Created On',
                id: 'createdOn',
                accessor: record => record,
                style: columnStyle,
                Cell: props => {
                    const record = props.value || {};
                    const date = moment(record.createdOn).format('DD/MM/YYYY HH:mm');

                    return <span>{date}</span>;
                }
            },
        ];

        return columns;
    }

    getRecords() {
        const { props: { records } } = this;
        const data = [];

        for(const record of records) {
            data.push(record);
        }

        return data;
    }

    onRowClick(record) {
        if(!isEmpty(record)){
            this.setState({ selectedRecord: record });
        }
    }

    onRowDoubleClick(record) {
        if(!isEmpty(record)){
            this.setState({ open: true, selectedRecord: record });
        }
    }

    selectedRow(id) {
        const { state: { selectedRecord } } = this;

        return isEmpty(selectedRecord) ? false : selectedRecord._id === id;
    }

    renderTable() {
        const { props: { records } } = this;

        return (
            <Table
                data={records}
                columns={this.getColumns()}
                load={false}
                rowSelected={false}
                getTrProps={(state, rowInfo) => {
                    const record = rowInfo.original;
                    const selected = this.selectedRow(rowInfo.original._id);

                    return {
                        onClick: () => this.onRowClick(record),
                        onDoubleClick: () => this.onRowDoubleClick(record),
                        className: selected ? 'active' : '',
                    };
                }}
            />
        );
    }

    renderDeleteModal() {
        const { state: { selectedRecord, showDeleteModal, isDeleting } } = this;
        const description = `Are you sure you want to delete user ${selectedRecord.userName}`;

        return(
            <DialogConfirm
                opened={showDeleteModal}
                title="Delete User"
                titleOk="Delete"
                description={description}
                onClose={this.onShowDeleteModal}
                isSendingData={isDeleting}
                onAccept={this.onDelete}
            />
        );
    }

    render() {
        const { props: { classes }, state: { open, selectedRecord, showDeleteModal } } = this;
        const isNotSelected = isEmpty(selectedRecord);
        const id = isNotSelected ? '' :  selectedRecord._id;

        return(
            <SettingsPanel>
                <SettingsPanel.Toolbar>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonStyle}
                        onClick={this.onCreate}
                    >
                        New
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonStyle}
                        disabled={isNotSelected}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.buttonStyle}
                        onClick={this.onShowDeleteModal}
                        disabled={isNotSelected}
                    >
                        Delete
                    </Button>
                </SettingsPanel.Toolbar>
                {this.renderTable()}
                {open && (
                    <GithubUsersForm
                        id={id}
                        opened={open}
                        record={selectedRecord}
                        onClose={this.onClose}
                    />
                )}
                {showDeleteModal && this.renderDeleteModal()}
            </SettingsPanel>
        );
    }
}

const github = withStyles(styles)(GithubUsers);

export { github as GithubUsers };
