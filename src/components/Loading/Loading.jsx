import { useContext } from 'react'

import { LoadingContext } from '../../utils/ContextLoading'
import './Loading.css'

export default function Loading() {
  const { loading } = useContext(LoadingContext)
  return loading && <div className="custom-loader" />
}
