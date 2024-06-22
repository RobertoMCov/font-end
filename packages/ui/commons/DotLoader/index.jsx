import styles from './styles.module.css'

const DotLoader = ({ showAnimation = false, ...restProps }) => {
  return (
    <>
      {
        showAnimation
          ? (
            <div className={`${styles.loaderDot} flex justify-center items-center w-full`} />
            )
          : (
            <>{restProps.children}</>
            )
      }
    </>
  )
}

export default DotLoader
