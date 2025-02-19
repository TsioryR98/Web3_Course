import { useMediaQuery, Theme } from "@mui/material";
import { UrlFieldWeb } from "./urlField";
import {
  Datagrid,
  List,
  Show,
  SimpleShowLayout,
  TextField,
  EditButton,
  DeleteButton,
  Create,
  TextInput,
  SimpleForm,
  EmailField,
  SimpleList,

} from "react-admin";
//import Button from "@mui/material/Button";

export const UserList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="username" />
          <EmailField source="email" />
          <TextField source="address.street" />
          {/*address": { street": street":*/}
          <UrlFieldWeb source="website" />
          {/** acces directly to the email and customed by ./from "./urlField"*/}
          <TextField source="company.name" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" label="Name" />
      <TextField source="username" label="Username" />
      <EmailField source="email" label="Email" />
      <TextField source="address.street" label="Street Address" />
      <UrlFieldWeb source="website" />
      <TextField source="company.name" label="Company Name" />
    </SimpleShowLayout>
  </Show>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Name" />
      <TextInput source="username" label="Username" />
      <EmailField source="email" label="Email" />
      <TextInput source="address.street" label="Street Address" />
      <TextInput source="website" label="Website" />
      <TextInput source="company.name" label="Company Name" />
    </SimpleForm>
  </Create>
);

