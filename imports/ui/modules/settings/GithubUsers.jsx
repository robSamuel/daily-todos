import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '/imports/ui/components/widgets/Table';
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
            records: [],
            selectedRecord: null,
            contentTable: {

            }
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
    }

    onClose() {
        this.setState({ open: false });
    }

    onCreate() {
        this.setState({ open: true, selectedRecord: null });
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
                accessor: 'name',
                style: columnStyle,
            },
            {
                Header: 'Description',
                accessor: 'description',
                style: columnStyle,
            },
            {
                Header: 'Type',
                id: 'type',
                accessor: record => record,
                style: columnStyle,
            },
            {
                Header: 'Projects',
                accessor: 'projects',
                style: columnStyle,
            },
        ];

        return columns;
    }

    renderTable() {

        return (
            <Table
                data={[]}
                columns={this.getColumns()}
                load={false}
            />
        );
    }

    render() {
        const { props: { classes }, state: { open } } = this;

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
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.buttonStyle}
                    >
                        Delete
                    </Button>
                </SettingsPanel.Toolbar>
                {this.renderTable()}
                {open && <GithubUsersForm opened={open} onClose={this.onClose} />}
            </SettingsPanel>
        );
    }
}

const github = withStyles(styles)(GithubUsers);

export { github as GithubUsers };
