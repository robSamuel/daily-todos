import { GithubUsers } from '../collections';

Meteor.methods({
    addGithubUser: function(data) {
        check(data, Object);
        const record = data;

        record._id = Random.id();

        GithubUsers.insert(record);
    }
});
