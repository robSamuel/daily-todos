import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import withRoot from './layouts/withRoot';
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

    }

    //TODO: The child of MainLayout will be renderModules() function
    render() {

        return(
            <BrowserRouter>
                <MainLayout>
                    <div className="main-div">

                    </div>
                </MainLayout>
            </BrowserRouter>
        );
    }
}

const wrapped = withRoot(DailyTodos);

export { wrapped as DailyTodos };
