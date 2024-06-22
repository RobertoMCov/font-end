'use client'

import { Input } from 'antd'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
const { Search } = Input

const SearchBar = (props) => {
  const { classNameSearch = '', externalOnChange = null, ...restProps } = props
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  const WAIT_BETWEEN_CHANGES = 300

  const onChangeSearch = useDebouncedCallback((textToSearch) => {
    const params = new URLSearchParams(searchParams)
    if (textToSearch) params.set('wordToSearch', textToSearch)
    else params.delete('wordToSearch')

    params.set('page', '1')
    replace(`${pathName}?${params.toString()}`)
  }, WAIT_BETWEEN_CHANGES)

  return (
    <Search
      className={classNameSearch}
      allowClear
      placeholder='Buscar'
      onChange={externalOnChange ? (e) => externalOnChange(e.target.value) : (e) => onChangeSearch(e.target.value)}
      defaultValue={searchParams.get('wordToSearch')?.toString()}
      {...restProps}
    />
  )
}
export default SearchBar
