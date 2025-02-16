import {
    CreateParams,
    CreateResult,
    DataProvider, GetListParams,
    GetListResult, GetOneParams,
    GetOneResult,
    Identifier,
    QueryFunctionContext,
} from 'react-admin';

type PostRecord = {
    userId : number;
    id : Identifier;
    title : string;
    body: string;
}

export const dataProvider : DataProvider = {
    getList : async function <RecordType extends PostRecord> (
        resource : string, 
        params : GetListParams & QueryFunctionContext
    ) :Promise<GetListResult<RecordType>> {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts', { method: 'GET' });
        
    }
};