import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBank } from '../../Nexus/entities/IBank';

const normalizeBanks = (banks: IBank[]): Record<string, IBank> =>
  banks.reduce((acc, curr) => {
    // eslint-disable-next-line no-param-reassign
    acc[curr.id] = curr;
    return acc;
  }, {} as Record<string, IBank>);

// TODO: rename to just 'api' sinc
export const bankApi = createApi({
  reducerPath: 'bankApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
  }),
  tagTypes: ['Banks', 'Projects', 'Project'],
  endpoints: (builder) => ({
    getBank: builder.query<IBank, string>({
      query: (id) => `/api/bank/${id}`
    }),
    getAllBanks: builder.query<Record<string, IBank>, void>({
      query: () => `/api/bank/banks`,
      // this transformResponse happens before it's cached by RTK by providesTag
      transformResponse: (response: IBank[]) => normalizeBanks(response),
      providesTags: [{ type: 'Banks' }]
    }),
    getAlbefaticalSortedBanks: builder.query<IBank[], void>({
      query: () =>
        `/api/bank/sorted?fieldName=${'title'}&limit=${5}&order=${'ASC'}`,
      providesTags: [{ type: 'Banks' }]
    }),
    getDateSortedBanks: builder.query<IBank[], void>({
      query: () =>
        `/api/bank/sorted?fieldName=${'publishedDate'}&limit=${5}&order=${'DESC'}`,
      providesTags: [{ type: 'Banks' }]
    }),
    addBank: builder.mutation<IBank, IBank>({
      query(bank) {
        return {
          url: `/api/bank`,
          method: 'POST',
          body: bank
        };
      },
      invalidatesTags: [{ type: 'Banks' }]
    }),
    getProject: builder.query<IBank, string>({
      query: (id) => `/api/bank/${id}`,
      providesTags: [{ type: 'Project' }]
    }),
    getAllProjects: builder.query<Record<string, IBank>, void>({
      // TODO: should support Pagination to get page count etc
      query: () => `/api/bank/projects`,
      // this transformResponse happens before it's cached by RTK by providesTag
      transformResponse: (response: IBank[]) => normalizeBanks(response),
      providesTags: [{ type: 'Projects' }]
    }),
    postProject: builder.mutation<IBank, IBank>({
      query: (project) => ({
        url: `/api/bank`,
        method: 'POST',
        body: project
      }),
      invalidatesTags: [{ type: 'Projects' }]
    }),
    putProject: builder.mutation<IBank, Partial<IBank> & Pick<IBank, 'id'>>({
      query: (project) => ({
        url: `/api/bank/${project.id}`,
        method: 'PUT',
        body: project
      }),
      invalidatesTags: [{ type: 'Projects' }, { type: 'Project' }]
    }),
    deleteProject: builder.mutation<IBank, IBank>({
      query: (project) => ({
        url: `/api/bank/${project.id}`,
        method: 'DELETE',
        body: project
      }),
      invalidatesTags: [{ type: 'Projects' }]
    }),
    deleteProjectById: builder.mutation<IBank, string>({
      query: (id) => ({
        url: `/api/bank/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Projects' }]
    })
  })
});

export const {
  useGetBankQuery,
  useGetAllBanksQuery,
  useGetAlbefaticalSortedBanksQuery,
  useGetDateSortedBanksQuery,
  useAddBankMutation,
  useGetProjectQuery,
  useGetAllProjectsQuery,
  usePostProjectMutation,
  usePutProjectMutation,
  useDeleteProjectMutation,
  useDeleteProjectByIdMutation
} = bankApi;
