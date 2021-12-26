import React from 'react';
import PropTypes from 'prop-types';
import { StringUtils } from '/lib/StringUtils';

const containerStyle = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    overflow: false,
};

export class SettingsPanel extends React.Component {
    render() {
        const { props } = this;

        return(
            <div style={containerStyle}>
                {props.children}
            </div>
        );
    }
}

export class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        spacing: PropTypes.number
    };

    render() {
        const { props: { children, spacing } } = this;
        const margin = !StringUtils.isEmpty(spacing) ? `${spacing}px` : '10px 0px';

        return(
            <div style={{ display: 'flex', margin}}>
                {children}
            </div>
        );
    }
}

SettingsPanel.Toolbar = Toolbar;
