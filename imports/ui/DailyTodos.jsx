import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import withRoot from './layouts/withRoot';
import { MainLayout } from '/imports/ui/layouts/MainLayout';
import { Settings } from '/imports/ui/modules/settings/Settings';
import { SearchUsers } from '/imports/ui/modules/github/SearchUsers';
import { UserDetails } from '/imports/ui/modules/github/UserDetails';

class DailyTodos extends React.Component {
    constructor(props) {
        super(props);
    }

    renderModules() {
        return(
            <Switch>
                <Route
                    path='/github/:id'
                    exact
                    render={params => (
                        <UserDetails {...params} />
                    )}
                />
                <Route
                    path='/github'
                    render={params => (
                        <SearchUsers {...params} />
                    )}
                />
                <Route
                    path='/settings'
                    render={params => (
                        <Settings {...params} />
                    )}
                />
            </Switch>
        );
    }

    //TODO: The child of MainLayout will be renderModules() function
    render() {

        return(
            <BrowserRouter>
                <MainLayout>
                    {this.renderModules()}
                </MainLayout>
            </BrowserRouter>
        );
    }
}

const wrapped = withRoot(DailyTodos);

export { wrapped as DailyTodos };
