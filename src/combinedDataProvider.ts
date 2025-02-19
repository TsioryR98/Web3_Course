import { userDataProvider } from "./user/userDataProvider";
import { postDataProvider } from "./post/postDataProvider";
import { combineDataProviders } from 'react-admin';

export const dataProvider = combineDataProviders((resource) => {
    switch(resource) {
        case 'posts':
            return postDataProvider;
        case  'users':
            return userDataProvider;
        default:
            throw new Error(`Unknown resource: ${resource}`);
    }
})
