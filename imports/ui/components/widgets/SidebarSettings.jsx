import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { StringUtils } from '/lib/StringUtils';

export default class SidebarSettings extends React.Component {
    constructor(props) {
        super(props);

        this.getListItems = this.getListItems.bind(this);
    }

    static propTypes = {
        items: PropTypes.array.isRequired,
        minWidth: PropTypes.number,
        change: PropTypes.func.isRequired,
        classes: PropTypes.object,
        selected: PropTypes.number.isRequired,
    };

    getListItems() {
        const { props } = this;
        const { items, classes, selected } = props;

        return items.map((item, index) => (
            <Button
                key={index}
                onClick={() => props.change(index)}
                color={selected === index ? 'primary' : 'default'}
                style={{ padding: 10 }}
                size="small"
                className={classes.customButton}
            >
                {item.icon}
                {item.text}
            </Button>
        ));
    }

    render() {
        const { props } = this;
        const { minWidth } = props;

        const containerStyle = {
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '100%',
            overflow: 'auto',
            padding: '12px',
            minWidth: StringUtils.isEmpty(minWidth) ? 130 : minWidth,
        };

        return (
            <div style={containerStyle}>
                {this.getListItems()}
            </div>
        );
    }
}
