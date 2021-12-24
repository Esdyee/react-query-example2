import axios from 'axios';
import { useQuery } from 'react-query';
import { api } from './utils/api';
import { userKeys } from './utils/queryKeys';

export function useGetUsers() {
  const fetchUsers = async () => {
    const response = await axios.get(api);
    return response.data;
  };

  const usersInfo = useQuery(userKeys.all, fetchUsers, {
    retry: 1,
  });

  return usersInfo;
}

// const fetchUsers = async () => await (await fetch(api)).json()
// or
// const fetchUsers = async () => {
//   const response = await fetch(api)
//   return response.json()
// }
// are the same