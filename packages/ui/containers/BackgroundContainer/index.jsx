import React from 'react'
import styles from './styles.module.css'

const BackgroundContainer = ({
  classNameContainer = 'h-full',
  ...props
}) => {
  return (
    <div className={`${styles.backgroundCover} ${styles.backgroundMobile}`}>
      <div className={`w-full ${classNameContainer} flex justify-center items-center`}>
        {props.children}
      </div>
    </div>
  )
}

export default BackgroundContainer
