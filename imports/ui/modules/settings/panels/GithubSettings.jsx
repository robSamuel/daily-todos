import React from 'react';
import PropTypes from 'prop-types';
import SidebarSettings from '/imports/ui/components/widgets/SidebarSettings';
import { GithubUsersContainer } from '/imports/ui/components/containers/GithubUsersContainer';

import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    customButton: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    iconSpace: {
        marginRight: theme.spacing(1),
    },
});

const SubModules = {
    USERS: 0,
};

class GithubSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSubModule: 0
        };

        this.initBind();
    }

    initBind() {
        this.changeSubModules = this.changeSubModules.bind(this);
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    changeSubModules(subModule) {
        this.setState({ selectedSubModule: subModule });
    }

    getListItemToSidebar() {
        const { props: { classes } } = this;

        return [
            {
                text: 'Users',
                icon: <AccountCircleIcon className={classes.iconSpace} />,
            },
        ];
    }

    render() {
        const { props: { classes }, state: { selectedSubModule } } = this;

        return(
            <div style={{ display: 'flex', flex: 1}}>
                <SidebarSettings
                    classes={classes}
                    change={this.changeSubModules}
                    items={this.getListItemToSidebar()}
                    selected={selectedSubModule}
                    minWidth={180}
                />
                <div style={{display: 'flex', flexDirection: 'column', flex: 1, margin: 10, position: 'relative'}}>
                    {selectedSubModule === SubModules.USERS && (
                        <GithubUsersContainer />
                    )}
                </div>
            </div>
        );
    }
}

const github = withStyles(styles)(GithubSettings);

export { github as GithubSettings };
