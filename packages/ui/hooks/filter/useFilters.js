import { Button } from 'antd'
import { SlidersOutlined } from '@ant-design/icons'
import BuildForm from '../../BuildForm'
import useGetSize from '../useGetSize'
import useFilterService from './useFiltersService'
import useDrawer from '../useDrawer'
import { useLocalStorage } from '..'
import { useMemo } from 'react'

const useFilters = (params = {}) => {
  const permission = useLocalStorage({ key: 'permission' })

  const { filters = [] } = params
  const filtersService = useFilterService(params)
  const sizeWindow = useGetSize()

  const arrayData = useMemo(() => filters.filter(item => !permission.storedValue?.filters?.includes(item.resource))?.map(filtersService.onCallCapture) || [], [permission.storedValue?.filters])
  const filtersDashboard = (
    <div className='columns is-mobile is-multiline'>
      <BuildForm
        arrayData={arrayData}
      />
    </div>
  )
  const cdrawer = useDrawer({ title: 'Filtros', children: filtersDashboard, width: sizeWindow.width <= 550 ? sizeWindow.width : sizeWindow.width * 0.45 })

  const trigger = (
    <>
      {filtersService.modalHelpCapture}
      <Button className='is-cickable' ghost type='text' onClick={() => { cdrawer.onVisibleDrawer() }} icon={<SlidersOutlined />}>
        Filtros
      </Button>
      {cdrawer.drawer}
    </>
  )

  return {
    ...filtersService,
    trigger
  }
}

export default useFilters
