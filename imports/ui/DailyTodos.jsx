import React from 'react';
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
            <MainLayout>
                <div className="main-div">

                </div>
            </MainLayout>
        );
    }
}

const wrapped = withRoot(DailyTodos);

export { wrapped as DailyTodos };
