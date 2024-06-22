'use client'

import React, { useEffect, useState, useContext } from 'react'
import { Layout } from 'antd'

import { GeneralContext } from '../../context/GeneralContext'
import { useLocalStorage } from '@repo/ui/hooks'
import { useRouter } from 'next/navigation'
import ResponsiveMenu from './ResponsiveMenu'

const CustomMenu = (props) => {
  const { collapsed = false, setCollapsed = () => { }, menuOptions = [] } = useContext(GeneralContext)
  const [isClient, setIsClient] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState([])
  const [allOptionsMenu, setAllOptionsMenu] = useState([])
  const router = useRouter()
  const menuLS = useLocalStorage({ key: 'menuOptions' }).storedValue
  const optionMenu = useLocalStorage({ key: 'optionMenu' })
  const expandedMenu = useLocalStorage({ key: 'expandedMenu' })

  const chooseOption = (menuSelected) => {
    const { key = '' } = menuSelected

    const optionSelected = menuOptions.find(option => option.key === key)
    setSelectedKeys([optionSelected.key])
    router.push(optionSelected.pathMenu)
  }

  useEffect(() => {
    if (menuLS.length && menuOptions.length) {
      let modulesMenu = menuLS.map((item) => item.modulo)
      modulesMenu = ['perfil', ...modulesMenu]

      const menuToShow = menuOptions.reduce((acum, item) => {
        const { key, pathMenu, ...restItems } = item
        if (modulesMenu.includes(key)) {
          acum = [...acum, { ...restItems, key }]
        }
        return acum
      }, [])

      setAllOptionsMenu(menuToShow)
    }
  }, [menuLS, menuOptions])

  useEffect(() => {
    if (optionMenu.storedValue) {
      setSelectedKeys([optionMenu.storedValue])
    }
  }, [optionMenu.storedValue])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const menu = isClient
    ? (
      <Layout>
        <ResponsiveMenu chooseOption={chooseOption} allOptionsMenu={allOptionsMenu} collapsed={collapsed} selectedKeys={selectedKeys} expandedMenu={expandedMenu} setCollapsed={setCollapsed} />
        {props.children}
      </Layout>
      )
    : null

  return (
    <>
      {menu}
    </>
  )
}

export default React.memo(CustomMenu)
