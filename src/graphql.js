import gql from 'graphql-tag';

export const GET_AUTH0_ROLES = gql`
    query GetAuth0Roles($designId: String!, $settingsId: String!) {
        getAuth0Roles(designId: $designId, settingsId: $settingsId) {
            success
            data
        }
    }
`;
