import {
  Admin,
  Resource,
  EditGuesser,
  ShowGuesser
} from "react-admin";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { UserList } from "./user/userList";
import { dataProvider } from "./post/data-Provider";
import { PostList, PostShow, PostCreate } from "./post/postList";
import { UserCreate,UserShow } from "./user/userList";

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} show={PostShow} icon={PostIcon} create={PostCreate} />
    <Resource name="users" list={UserList} show={UserShow} create={UserCreate} icon={UserIcon} />
  </Admin>
);
