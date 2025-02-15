import { List, Datagrid, TextField, EmailField, SimpleList } from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";
import { UrlFieldWeb } from "./urlField";

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
          <TextField source="phone" />
          <UrlFieldWeb source="website" />{" "}
          {/** acces directly to the email and customed by ./from "./urlField"*/}
          <TextField source="company.name" />
        </Datagrid>
      )}
    </List>
  );
};
