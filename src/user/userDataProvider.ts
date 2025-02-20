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
  UpdateParams,
  UpdateResult,
} from "react-admin";

type UserRecord = {
  id: Identifier;
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

const baseUrl = `https://jsonplaceholder.typicode.com/users`;

export const userDataProvider: DataProvider = {
  getList: async function <RecordType extends RaRecord = UserRecord>(
    resource: string,
    params: GetListParams & QueryFunctionContext,
  ): Promise<GetListResult<RecordType>> {
    try {
      const data = await fetch(baseUrl, { method: "GET" });
      const { pagination, sort } = params;
      //pagination
      const { page = 1, perPage = 10 } = pagination || {}; //if undefined then empty obj

      const offset = (page - 1) * perPage;
      const userData = (await data.json()) as UserRecord[];
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
        },
      };
      return result;
    } catch (error) {
      throw error;
    }
  },
  getOne: async function <RecordType extends RaRecord = UserRecord>(
    resource: string,
    params: GetOneParams<RecordType> & QueryFunctionContext,
  ): Promise<GetOneResult<RecordType>> {
    //RecordType for getting the data from db
    try {
      const { id } = params;
      const data = await fetch(`${baseUrl}/${id}`, {
        method: `GET`,
      });
      const result: GetOneResult = {
        data: (await data.json()) as UserRecord,
      };
      return result;
    } catch (error) {
      throw error;
    }
  },
  create: async function <
    RecordType extends Omit<RaRecord, "id"> = UserRecord,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier },
  >(
    resource: string,
    params: CreateParams,
  ): Promise<CreateResult<ResultRecordType>> {
    //ResultRecordType for save data
    try {
      const { data } = params;
      const createdPost = await fetch(baseUrl, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = (await createdPost.json()) as UserRecord;
      const result: CreateResult = {
        data: responseData as UserRecord,
      };
      return result;
    } catch (error) {
      throw error;
    }
  },
  update: async function <
    RecordType extends Omit<RaRecord, "id"> = UserRecord,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier },
  >( //ResultRecordType for save data
    resource: string,
    params: UpdateParams,
  ): Promise<UpdateResult<ResultRecordType>> {
    try {
      const { data, id } = params;
      const UpdateUser = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = (await UpdateUser.json()) as UserRecord;
      const result: UpdateResult = {
        data: responseData as UserRecord,
      };
      return result;
    } catch (error) {
      throw error;
    }
  },
};
