import { GithubUsers } from '/imports/api/settings/collections';

Meteor.publish('githubUsers', function(condition) {
    check(condition, Object);

    return GithubUsers.find(condition || []);
});
