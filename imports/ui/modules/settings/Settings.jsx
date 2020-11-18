import React from 'react';
import PropTypes from 'prop-types';

/*Material UI*/
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import TwitterIcon from '@material-ui/icons/Twitter';
import { withStyles } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

const styles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
        height: '100%',
        zIndex: 900,
    },
});

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 0,
        };

        this.initBind();
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    initBind() {
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    onChangeTab(value) {
        this.setState({ selectedTab: value });
    }

    //TODO: The divs are for example purposes, delete them before finish this task.
    render() {
        const { props: { classes }, state: { selectedTab } } = this;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={selectedTab}
                        onChange={this.onChangeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                    >
                        <Tab label="General" icon={<DesktopWindowsIcon />} />
                        <Tab label="Work Out" icon={<FitnessCenterIcon />} />
                        <Tab label="Twitter" icon={<TwitterIcon />} />
                        <Tab label="Finances" icon={<AttachMoneyIcon />} />
                    </Tabs>
                </AppBar>
                {selectedTab === 0 && (
                    <div>
                        <label htmlFor="">General</label>
                    </div>
                )}
                {selectedTab === 1 && (
                    <div>
                        <label htmlFor="">Work Out</label>
                    </div>
                )}
                {selectedTab === 2 && (
                    <div>
                        <label htmlFor="">Twitter</label>
                    </div>
                )}
                {selectedTab === 3 && (
                    <div>
                        <label htmlFor="">Finances</label>
                    </div>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(Settings);
