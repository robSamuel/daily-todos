import React, { useState } from 'react';
import { GithubSettings } from '/imports/ui/modules/settings/panels/GithubSettings';

/*Material UI*/
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

const useStyles = makeStyles({
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
        marginTop: '10px',
        overflow: 'hidden',
    }
});

function Settings() {
    const classes = useStyles();
    const [ selectedTab, setSelectedTab ] = useState(1);

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={selectedTab}
                    onChange={setSelectedTab}
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

export { Settings };
