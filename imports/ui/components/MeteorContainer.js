import { withTracker } from 'meteor/react-meteor-data';

export const MeteorContainer = {
    create: function(getData, component) {
        return withTracker(getData)(component);
    },
};
