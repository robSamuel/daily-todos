import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import withRoot from './layouts/withRoot';
import { Settings } from '/imports/ui/modules/settings/Settings';
import { MainLayout } from '/imports/ui/layouts/MainLayout';

class DailyTodos extends React.Component {
    constructor(props) {
        super(props);

        this.initBind();
    }

    initBind() {

    }

    //TODO: Render the modules from here
    renderModules() {
        return(
            <React.Fragment>
                <Route
                    path='/settings'
                    render={params => (
                        <Settings {...params} />
                    )}
                />
            </React.Fragment>
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
