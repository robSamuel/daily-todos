import React from 'react';
import PropTypes from 'prop-types';
import { GithubSettings } from '/imports/ui/modules/settings/panels/GithubSettings';

/*Material UI*/
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import GitHubIcon from '@material-ui/icons/GitHub';
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
    tabContainerStyle: {
        flex: 1,
        display: 'flex',
        background: '#FFF',
        marginTop: '10pxy',
        overflow: 'hidden',
    }
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

    onChangeTab(event, value) {
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
                        centered
                    >
                        <Tab label="General" disabled icon={<DesktopWindowsIcon />} />
                        <Tab label="Github" icon={<GitHubIcon />} />
                        <Tab label="Work Out" disabled icon={<FitnessCenterIcon />} />
                        <Tab label="Twitter" disabled icon={<TwitterIcon />} />
                        <Tab label="Finances" disabled icon={<AttachMoneyIcon />} />
                    </Tabs>
                </AppBar>
                {selectedTab === 0 && (
                    <div className={classes.tabContainerStyle}>
                        <label htmlFor="">General</label>
                    </div>
                )}
                {selectedTab === 1 && (
                    <div className={classes.tabContainerStyle}>
                        <GithubSettings />
                    </div>
                )}
                {selectedTab === 2 && (
                    <div className={classes.tabContainerStyle}>
                        <label htmlFor="">Work Out</label>
                    </div>
                )}
                {selectedTab === 3 && (
                    <div className={classes.tabContainerStyle}>
                        <label htmlFor="">Twitter</label>
                    </div>
                )}
                {selectedTab === 4 && (
                    <div className={classes.tabContainerStyle}>
                        <label htmlFor="">Finances</label>
                    </div>
                )}
            </div>
        );
    }
}

const wrapped = withStyles(styles)(Settings);

export { wrapped as Settings };
