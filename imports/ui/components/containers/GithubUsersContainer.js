import { MeteorContainer } from '/imports/ui/components/MeteorContainer';
import { GithubUsers as GithubUsersCollection } from '/imports/api/settings/collections';
import { GithubUsers } from '/imports/ui/modules/settings/GithubUsers';

const wrap = () => {
    const handle = Meteor.subscribe('githubUsers', {});
    //TODO: Remove the harcoded 1 value when the login with users has been implemented
    const records = GithubUsersCollection.find({ 'groupCode': 1 }).fetch();

    return {
        loading: !handle.ready(),
        records
    };
};

const UsersContainer = MeteorContainer.create(wrap, GithubUsers);

export { UsersContainer as GithubUsersContainer };
