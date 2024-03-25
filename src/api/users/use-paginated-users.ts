import { apiClient, userQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

type Props = {
  page: number;
  pageLimit: number;
};

type Params = {
  queryKey: [string, { status: string; page: number; }];
}

const status = 'active';

export function usePaginatedUsers({ page, pageLimit }: Props) {
  const getPaginatedUsersFn = async ({ queryKey }: Params) => {
    const [, { status, page }] = queryKey;
    const response = await apiClient.get(`?_page=${page}&_limit=${pageLimit}&status=${status}`);
    return response.data;
  };

  const params: Params = { queryKey: ['users', { status, page }] };

  useQuery(
    ['users', page, status],
    () => getPaginatedUsersFn(params),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5, // 캐시 유지 시간: 5분
    }
  );

  return useQuery(
    ['users', status, page],
    () => getPaginatedUsersFn(params),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5, // 캐시 유지 시간: 5분
    }
  );
}
