import { GithubUsers } from '../collections';

Meteor.methods({
    addGithubUser: function(data) {
        check(data, Object);
        const record = data;

        record._id = Random.id();

        GithubUsers.insert(record);
    },

    updateGithubUser: function(data) {
        check(data, Object);
        const id = data._id;
        delete data._id;

        GithubUsers.update({ _id: id }, { $set: data });
    },

    deleteGithubUser: function(id) {
        check(id, String);

        GithubUsers.remove({ _id: id });
    }
});
