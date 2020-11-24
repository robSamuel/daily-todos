export const getApolloHeaders = () => {
    return {
        HTTP_URL: Meteor.settings.public.GraphQLHTTP,
        WS_URL: Meteor.settings.public.GraphQLWS,
    };
};

export const graphQLClient = ApolloHeaders => {

};
