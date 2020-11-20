import React from 'react';
import PropTypes from 'prop-types';
import { SettingsPanel } from '/imports/ui/components/widgets/SettingsPanel';

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

    }

    renderTable() {

        return (
            <div>

            </div>
        );
    }

    render() {
        const { props: { classes } } = this;

        return(
            <SettingsPanel>
                <SettingsPanel.Toolbar>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonStyle}
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
            </SettingsPanel>
        );
    }
}

const github = withStyles(styles)(GithubUsers);

export { github as GithubUsers };
