'use client'

import React, { useRef } from 'react'
import { Layout } from 'antd'
import { DotLoader, CustomTable } from '../commons'
import { useGetSize } from '../hooks'
const { Content } = Layout

const ResponsiveTable = ({
  showSpin = false,
  topComponent = null,
  ...restProps
}) => {
  const refTopComponent = useRef()
  const screenSize = useGetSize()
  const paginationSize = 64
  const customHeight =
    screenSize.height -
      64 - // Header
      30 - // padding azul
      30 - // padding blanco
      55 - // header tabla
      20 -
      refTopComponent.current?.clientHeight || 0

  return (
    <Content>
      <div ref={refTopComponent}>{topComponent}</div>
      <DotLoader showAnimation={showSpin}>
        <CustomTable
          scroll={{
            x: '400 px',
            y: customHeight - (restProps.pagination ? paginationSize : 0)
          }}
          pagination={restProps.pagination}
          {...restProps}
        />
      </DotLoader>
    </Content>
  )
}

export default ResponsiveTable
