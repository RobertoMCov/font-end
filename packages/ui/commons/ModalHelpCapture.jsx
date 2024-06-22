import { Modal } from 'antd'
import SearchBar from './SearchBar'
import ResponsiveTable from '../containers/ResponsiveTable'

const ModalHelpCapture = ({ dataSelected, onRow, setKeyWordCatalog, reqCatalog, title = 'Filtrar', open, onCloseModal, onHideModal, dataSource, columns, filterSelected, autoClose, rowSelection, totalRecords = 0, modalStyle = {} }) => {
  return (
    <Modal
      title={title}
      centered
      open={open}
      onOk={onCloseModal}
      onCancel={onHideModal}
      style={{ height: '90vh', ...modalStyle }}
      // destroyOnClose
    >
      {dataSelected}
      <SearchBar onClickSearch={(keyWord) => {
        keyWord ? setKeyWordCatalog({ keyWord }) : setKeyWordCatalog({})
        reqCatalog.remove && reqCatalog.remove()
      }}
      />
      {
        open &&
          <ResponsiveTable
            showSpin={!reqCatalog.isLoading}
            className='text-xs custom-table mt-3'
            dataSource={dataSource}
            columns={columns}
          // rowSelection={rowSelection}
            size='small'
            keyValue={filterSelected.keyValue}
            scroll={{ y: '63vh', w: '100vw' }}
            onRow={onRow}
            pagination={{ total: totalRecords, showTotal: total => `Total ${total} registros`, pageSize: 80 }}
          />
      }
    </Modal>
  )
}

export default ModalHelpCapture
