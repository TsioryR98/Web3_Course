import {
  Datagrid,
  List,
  Show,
  SimpleShowLayout,
  TextField,
  RichTextField,
  EditButton,
  TopToolbar,
  ReferenceField,
  DeleteButton,
  Create,
  TextInput,
  NumberInput,
  BooleanInput,
  SimpleForm

} from "react-admin";
import Button from "@mui/material/Button";

export const PostList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <ReferenceField source="userId" reference="users" link="show" />{" "}
      {/*Link to userList for users */}
      <EditButton />
      <DeleteButton />
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
  <Show actions={<PostShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <RichTextField source="body" />
    </SimpleShowLayout>
  </Show>
);

export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source='title' />
      <TextInput source='body' multiline={true} label='Short body' />
      <BooleanInput source='bool' label='Short body' />
      <NumberInput source='bool' label='Short body' />
    </SimpleForm>
  </Create>
);

{
  /**
 
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

  */
}
