import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBank } from '../../Nexus/entities/IBank';

// TODO: This interface is duplicated in krb-api as SortPagination
interface ISortPagination {
  fieldName: string;
  order: 'ASC' | 'DESC';
  pageSize: number;
  page: number;
}

const normalizeBanks = (banks: IBank[]): Record<string, IBank> =>
  banks.reduce((acc, curr) => {
    // eslint-disable-next-line no-param-reassign
    acc[curr.id] = curr;
    return acc;
  }, {} as Record<string, IBank>);

export const bankApi = createApi({
  reducerPath: 'bankApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  tagTypes: ['Banks', 'Projects', 'Project'],
  endpoints: (builder) => ({
    getBank: builder.query<IBank, string>({
      query: (id) => `/api/bank/${id}`,
    }),
    getProject: builder.query<IBank, string>({
      query: (id) => `/api/bank/${id}`,
      providesTags: [{ type: 'Project' }],
    }),
    getBanks: builder.query<Record<string, IBank>, ISortPagination>({
      query: (arg) =>
        `/api/bank/banks?pageSize=${arg.pageSize}&page=${arg.page}&fieldName=${arg.fieldName}&order=${arg.order}`,
      // this transformResponse happens before it's cached by RTK by providesTag
      transformResponse: (response: IBank[]) => normalizeBanks(response),
      providesTags: [{ type: 'Banks' }],
    }),

    getProjects: builder.query<Record<string, IBank>, ISortPagination>({
      query: (arg) =>
        `/api/bank/projects?pageSize=${arg.pageSize}&page=${arg.page}&fieldName=${arg.fieldName}&order=${arg.order}`,
      // this transformResponse happens before it's cached by RTK by providesTag
      transformResponse: (response: IBank[]) => normalizeBanks(response),
      providesTags: [{ type: 'Projects' }],
    }),
    addBank: builder.mutation<IBank, IBank>({
      query(bank) {
        return {
          url: `/api/bank`,
          method: 'POST',
          body: bank,
        };
      },
      invalidatesTags: [{ type: 'Banks' }],
    }),

    postProject: builder.mutation<IBank, IBank>({
      query: (project) => ({
        url: `/api/bank`,
        method: 'POST',
        body: project,
      }),
      invalidatesTags: [{ type: 'Projects' }],
    }),
    putProject: builder.mutation<IBank, IBank>({
      query: (project) => ({
        url: `/api/bank/${project.id}`,
        method: 'PUT',
        body: project,
      }),
      invalidatesTags: [{ type: 'Projects' }, { type: 'Project' }],
    }),
    deleteProject: builder.mutation<IBank, IBank>({
      query: (project) => ({
        url: `/api/bank/${project.id}`,
        method: 'DELETE',
        body: project,
      }),
      invalidatesTags: [{ type: 'Projects' }],
    }),
    deleteProjectById: builder.mutation<IBank, string>({
      query: (id) => ({
        url: `/api/bank/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Projects' }],
    }),
  }),
});

export const {
  useGetBankQuery,
  useGetBanksQuery,
  useAddBankMutation,
  useGetProjectQuery,
  useGetProjectsQuery,
  usePostProjectMutation,
  usePutProjectMutation,
  useDeleteProjectMutation,
  useDeleteProjectByIdMutation,
} = bankApi;
