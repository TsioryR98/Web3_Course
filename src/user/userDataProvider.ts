import {
  CreateParams,
  CreateResult,
  DataProvider,
  GetListParams,
  GetListResult,
  GetOneParams,
  GetOneResult,
  Identifier,
  RaRecord,
  QueryFunctionContext,
} from "react-admin";

type UserRecord = {
  id: Identifier,
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
  };
  website: string;
  company: {
    name: string;
  };
};

export const userDataProvider: DataProvider = {
  getList: async function <RecordType extends RaRecord = UserRecord>(
    resource: string,
    params: GetListParams & QueryFunctionContext,
  ): Promise<GetListResult<RecordType>> {
    try {
      const data = await fetch(`https://jsonplaceholder.typicode.com/users`,
        { method: 'GET' }
      );
      const { pagination, sort } = params;
      //pagination
      const { page = 1, perPage = 10 } = pagination || {}; //if undefined then empty obj

      const offset = (page - 1) * perPage;
      const userData = await data.json() as UserRecord[];
      const pageNumber = Math.ceil(userData.length / perPage);

      //Sort postdata

      const { field = "id", order = "ASC" } = sort || {}; //if undefined then empty obj for sort

      userData.sort((a, b) => {
        if (a[field as keyof UserRecord] < b[field as keyof UserRecord])
          return order === "ASC" ? -1 : 1;
        if (a[field as keyof UserRecord] > b[field as keyof UserRecord])
          return order === "ASC" ? 1 : -1;
        return 0;
      });

      const result: GetListResult = {
        data: userData.slice(offset, offset + perPage) as UserRecord[],
        total: userData.length,
        pageInfo: {
          hasNextPage: page < pageNumber,
          hasPreviousPage: page !== 1, //if page 1 no previous
        }
      };
      return result;

    } catch (error) {
      throw error;
    };
  },
};