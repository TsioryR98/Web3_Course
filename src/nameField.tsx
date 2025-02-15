import { useRecordContext } from "react-admin";

type User = {
  id: number;
  lastName: string;
  firstName: string;
};
type FullNameFieldProps = {
  record?: User;
};
const FullNameField = (props: FullNameFieldProps) => {
  const record = useRecordContext(props);
  return record ? (
    <span>
      {record.firstName} {record.lastName}
    </span>
  ) : null;
};
FullNameField.defaultProps = { label: "Name" };

/*
{
    id: 123,
    firstName: 'John',
    lastName: 'Doe'
}
    to have only one FullNameField source name 
    instead of have 2TextField
*/
