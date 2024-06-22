import dayjs from 'dayjs'

const dayFormat = ({ date = '', format = 'YYYY-MM-DD', type = 'text' }) => type === 'type' ? dayjs(date).format(format) : dayjs(date, format)

export {
  dayFormat
}
