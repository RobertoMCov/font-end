'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ProviderError } from '../context/ErrorContext'
import { ProviderGeneralContext } from '../context/GeneralContext'
import { App, ConfigProvider } from 'antd'
import locale from 'antd/lib/locale/es_ES'
import dayjs from 'dayjs'

import 'dayjs/locale/es-us'
import '../styles/index.css'

dayjs.locale('es-us')

const mainColor = '#6b5594'
const bgMenu = 'rgb(37, 172, 219)'

const defaultThemLayout = {
  colorPrimary: mainColor
}

const defaultConfigComponent = {
  Layout: {
    siderBg: bgMenu,
    bodyBg: '#f6f4f5'
  },
  Menu: {
    darkItemBg: bgMenu,
    darkItemSelectedBg: 'rgba(255, 255, 255, 0.2274509804)'
  },
  Table: {
    cellFontSize: 12,
    cellFontSizeMD: 12,
    cellFontSizeSM: 12,
    cellPaddingBlock: 1,
    cellPaddingBlockMD: 1,
    cellPaddingBlockSM: 1,
    cellPaddingInline: 1,
    cellPaddingInlineMD: 1,
    cellPaddingInlineSM: 1
  },
  Form: {
    itemMarginBottom: 0,
    verticalLabelPadding: 0
  }
}

const WrapperProvider = (props) => {
  const { menuToRender = [], configTheme = defaultThemLayout, configComponents = defaultConfigComponent } = props
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={locale}
        theme={{
          token: {
            ...configTheme
          },
          components: {
            ...configComponents
          }
        }}
      >
        <App>
          <ProviderGeneralContext menuToRender={menuToRender}>
            <ProviderError>{props.children}</ProviderError>
          </ProviderGeneralContext>
        </App>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default WrapperProvider
