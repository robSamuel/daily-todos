import { MeteorContainer } from '/imports/ui/components/MeteorContainer';
import { GithubUsers as GithubUsersCollection } from '/imports/api/settings/collections';
import { GithubUsers } from '/imports/ui/modules/settings/GithubUsers';

const wrap = () => {
    const handle = Meteor.subscribe('githubUsers', {});
    const records = GithubUsersCollection.find({ 'groupCode': 1 }).fetch();

    return {
        loading: !handle.ready(),
        records
    };
};

const UsersContainer = MeteorContainer.create(wrap, GithubUsers);

export { UsersContainer as GithubUsersContainer };
