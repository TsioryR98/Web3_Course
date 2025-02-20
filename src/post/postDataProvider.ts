import {
  CreateParams,
  CreateResult,
  DataProvider,
  GetListParams,
  GetListResult,
  GetOneParams,
  UpdateParams,
  UpdateResult,
  GetOneResult,
  Identifier,
  RaRecord,
  QueryFunctionContext,
} from "react-admin";

type PostRecord = {
  userId: number;
  id: Identifier;
  title: string;
  body: string;
};

const baseUrl = `https://jsonplaceholder.typicode.com/posts`;

export const postDataProvider: DataProvider = {
  getList: async function <RecordType extends RaRecord = PostRecord>(
    resource: string,
    params: GetListParams & QueryFunctionContext,
  ): Promise<GetListResult<RecordType>> {
    try {
      const data = await fetch(baseUrl, {
        method: "GET",
      });
      const { pagination, sort } = params;
      //Pagination
      const { page = 1, perPage = 10 } = pagination || {}; //if undefined then empty obj
      const offset = (page - 1) * perPage; //page 2 then 11-20 offset 10

      const postData = (await data.json()) as PostRecord[];
      const pageNumber = Math.ceil(postData.length / perPage);

      //Sort postdata

      const { field = "id", order = "ASC" } = sort || {}; //if undefined then empty obj for sort

      postData.sort((a, b) => {
        if (a[field as keyof PostRecord] < b[field as keyof PostRecord])
          return order === "ASC" ? -1 : 1;
        if (a[field as keyof PostRecord] > b[field as keyof PostRecord])
          return order === "ASC" ? 1 : -1;
        return 0;
      });

      const result: GetListResult = {
        data: postData.slice(offset, offset + perPage) as PostRecord[], // an array of obj for getList
        total: postData.length,
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

  getOne: async function <RecordType extends RaRecord = PostRecord>(
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
        data: (await data.json()) as PostRecord,
      };
      return result;
    } catch (error) {
      throw error;
    }
  },
  create: async function <
    RecordType extends Omit<RaRecord, "id"> = PostRecord,
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
      const responseData = (await createdPost.json()) as PostRecord;
      const result: CreateResult = {
        data: responseData as PostRecord,
      };
      return result;
    } catch (error) {
      throw error;
    }
  },
  update: async function <
    RecordType extends Omit<RaRecord, "id"> = PostRecord,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier },
  >(
    resource: string,
    params: UpdateParams,
  ): Promise<UpdateResult<ResultRecordType>> {
    try {
      const { data, id } = params;
      const updatePost = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = (await updatePost.json()) as PostRecord;
      const result: UpdateResult = {
        data: responseData as PostRecord,
      };
      return result;
    } catch (error) {
      throw error;
    }
  },
};
