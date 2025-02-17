import { PostAdd } from '@mui/icons-material';
import {
    CreateParams,
    CreateResult,
    DataProvider, GetListParams,
    GetListResult, GetOneParams,
    GetOneResult,
    Identifier,
    RaRecord,
    QueryFunctionContext,
} from 'react-admin';

type PostRecord = {
    userId : number;
    id : Identifier;
    title : string;
    body: string;
}

export const dataProvider : DataProvider = {
    getList : async function <RecordType extends RaRecord = PostRecord> (
        resource : string, 
        params : GetListParams & QueryFunctionContext
    ) :Promise<GetListResult<RecordType>> {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts', { method: 'GET' });
        
        const {pagination , sort } = params;
       //Pagination
        const {page = 1 , perPage = 10} = pagination || {} //if undefined then empty obj
        const offset = (page - 1 ) * perPage; //page 2 then 11-20 offset 10

        const postData = await data.json() as PostRecord [];
        const pageNumber = Math.ceil(postData.length / perPage);
        
        //Sort postdata

        const {field = 'id' , order='ASC'} = sort || {} //if undefined then empty obj for sort

        postData.sort((a,b) => {
            if(a[field as keyof PostRecord ] < b [field as keyof PostRecord]) return order ==='ASC' ? -1 : 1;
            if(a[field as keyof PostRecord] > b [field as keyof PostRecord]) return order ==='ASC' ? 1 : -1;
            return 0;
        })

        const result : GetListResult = {
            data : postData.slice(offset, offset+perPage) as PostRecord[], // an array of obj for getList
            total : postData.length,
            pageInfo :{
                hasNextPage: page < pageNumber,
                hasPreviousPage : page !== 1, //if page 1 no previous
            }
        };  
        return result;
    }

};