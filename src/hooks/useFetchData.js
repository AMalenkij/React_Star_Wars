import { useQuery } from 'react-query'

import { getApi } from '../utils/api'

export function useFetchData(url, id) {
  return useQuery({
    queryKey: [url, id],
    queryFn: () => getApi(url),
    keepPreviousData: true,
  })
}

export default useFetchData
