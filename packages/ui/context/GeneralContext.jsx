import React, { createContext, useEffect, useState } from 'react'

export const GeneralContext = createContext()

export const ProviderGeneralContext = (props) => {
  const { menuToRender = [] } = props
  const [lsData, setLSData] = useState({})
  const [menuOptions, setMenuOptions] = useState([])
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (menuToRender.length) setMenuOptions(menuToRender)
  }, [menuToRender])

  return (
    <GeneralContext.Provider
      value={{
        lsData,
        setLSData,
        menuOptions,
        setMenuOptions,
        collapsed,
        setCollapsed
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  )
}

export default ProviderGeneralContext
