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
  SimpleForm,
  Edit,
  required,
} from "react-admin";
import Button from "@mui/material/Button";
import { RichTextInput } from "ra-input-rich-text";

export const PostList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <ReferenceField source="userId" reference="users" link="show" />{" "}
      {/*link to User for post  */}
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
      <TextInput source="title" />
      <TextInput source="body" multiline={true} label="Short body" />
      <BooleanInput source="bool" label="Short body" />
      <NumberInput source="bool" label="Short body" />
    </SimpleForm>
  </Create>
);

export const PostEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="userId" source="userId" />
      <TextInput disabled label="Id" source="id" />
      <TextInput source="title" validate={required()} />
      <RichTextInput source="body" validate={required()} />
    </SimpleForm>
  </Edit>
);
