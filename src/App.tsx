import { Admin, Resource } from "react-admin";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { UserList } from "./user/userList";
import { dataProvider } from "./combinedDataProvider";
import { PostList, PostShow, PostCreate, PostEdit } from "./post/postList";
import { UserCreate, UserShow } from "./user/userList";

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="posts"
      list={PostList}
      show={PostShow}
      icon={PostIcon}
      create={PostCreate}
      edit={PostEdit}
    />
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      create={UserCreate}
      icon={UserIcon}
    />
  </Admin>
);
