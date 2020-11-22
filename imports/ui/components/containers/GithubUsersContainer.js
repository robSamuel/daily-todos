import { MeteorContainer } from '/imports/ui/components/MeteorContainer';
import { GithubUsers as GithubUsersCollection } from '/imports/api/settings/collections';
import { GithubUsers } from '/imports/ui/modules/settings/GithubUsers';

const wrap = (...params) => {
    const usersCondition = { groupCode: 1 };
    const handle = Meteor.subscribe('githubUsers', usersCondition);

    return {
        loading: !handle.ready(),
        records: GithubUsersCollection.find(usersCondition),
        ...params
    };
};

const UsersContainer = MeteorContainer.create(wrap, GithubUsers);

export { UsersContainer as GithubUsersContainer };
