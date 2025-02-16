import {
  Datagrid,
  List,
  Show,
  SimpleShowLayout,
  TextField,
  RichTextField,
  EditButton,
   TopToolbar,
   ReferenceField 
} from 'react-admin';
import Button from '@mui/material/Button';

export const PostList = () => (
  <List>
      <Datagrid>
          <TextField source="id" />
          <TextField source="title" />
          <ReferenceField source="userId" reference="users" link="show"/> {/*Link to userList for users */}
      </Datagrid>
  </List>
);
const PostShowActions = () => (
  <TopToolbar>
      <EditButton />
      {/* Add your custom actions */}
      <Button color="primary">Custom Action</Button>
  </TopToolbar>
);

export const PostShow = () => (
  <Show actions={<PostShowActions/>}>
      <SimpleShowLayout>
          <TextField source="id" />
          <TextField source="title" />
          <RichTextField source="body" />
      </SimpleShowLayout>
  </Show>
);

{/**
  getList: async function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetListParams & QueryFunctionContext
  ): Promise<GetListResult<RecordType>> {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts', { method: 'GET' });

    const { pagination } = params;

    const { page = 1, perPage = 10 } = pagination || {};

    const offset = (page - 1) * perPage;

    const posts = await data.json();
    const pageNumber = posts.length / perPage;

    const result: GetListResult = {
      data: posts.slice(offset, offset + perPage),
      total: posts.length,
      pageInfo: {
        hasNextPage: page < pageNumber,
        hasPreviousPage: page !== 1,
      },
    };

    return result;
  },


    create: async function <RecordType>(
    resource: string,
    params: CreateParams
  ): Promise<CreateResult<RecordType>> {
    const notify = useNotify(); // Utilisation de useNotify

    try {
      const { data } = params;
      const response = await fetch(`https://jsonplaceholder.typicode.com/${resource}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
       },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      notify('Item created successfully!', { type: 'success' });

      return {
        data: result,
      };
    } catch (error) {

    notify('Error creating item', { type: 'error' });

      throw error; 
  },


  
  */}