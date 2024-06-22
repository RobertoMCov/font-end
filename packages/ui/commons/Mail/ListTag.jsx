import { PlusOutlined } from '@ant-design/icons'
import { Input, Space, Tag, Tooltip, Form } from 'antd'
import { useEffect, useRef, useState } from 'react'

const ListTag = ({ value = [], onChange }) => {
  const [tags, setTags] = useState(value || [])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState('')
  const inputRef = useRef(null)
  const editInputRef = useRef(null)

  const handleSetValues = (values) => {
    setTags(values)
    onChange(values)
  }

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [inputValue])

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    handleSetValues(newTags)
  }
  const showInput = () => {
    setInputVisible(true)
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      handleSetValues([...tags, inputValue])
    }
    setInputVisible(false)
    setInputValue('')
  }
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value)
  }
  const handleEditInputConfirm = () => {
    const newTags = [...tags]
    newTags[editInputIndex] = editInputValue
    handleSetValues(newTags)
    setEditInputIndex(-1)
    setInputValue('')
  }
  const tagInputStyle = {
    width: 'auto',
    verticalAlign: 'top'
  }
  const tagPlusStyle = {
    borderStyle: 'dashed'
  }

  return (
    <Space size={[0, 8]} wrap>
      <Space size={[0, 8]} wrap>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size='small'
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            )
          }
          const isLongTag = tag.length > 20
          const tagElem = (
            <Tag
              key={tag}
              closable
              style={{
                userSelect: 'none',
                border: '1px solid green'
              }}
              onClose={() => handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index)
                    setEditInputValue(tag)
                    e.preventDefault()
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          )
          return isLongTag
            ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
              )
            : (
                tagElem
              )
        })}
      </Space>
      {inputVisible
        ? (
          <Input
            ref={inputRef}
            type='text'
            size='small'
            style={tagInputStyle}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
          )
        : (
          <Tag style={tagPlusStyle} onClick={showInput}>
            <PlusOutlined /> Agregar
          </Tag>
          )}
    </Space>
  )
}

const ListTagC = (props) => {
  const {
    ariaDescribedBy,
    rules = [],
    classNameFormItem = '',
    ...restProps
  } = props

  return (
    <Form.Item
      rules={rules}
      aria-describedby={ariaDescribedBy}
      className={classNameFormItem}
      {...restProps}
    ><ListTag />
    </Form.Item>
  )
}

export default ListTagC
