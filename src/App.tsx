import {
  Admin,
  Resource,
  EditGuesser,
  ShowGuesser
} from "react-admin";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { dataProvider } from "./dataProvider";
import { UserList } from "./userList";
import { PostList , PostShow } from "./postList";
export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} show={PostShow} icon={PostIcon}/>
    <Resource name="users" list={UserList} show={ShowGuesser} edit={EditGuesser} icon={UserIcon}/> {/*doc test */}
  </Admin>
);
