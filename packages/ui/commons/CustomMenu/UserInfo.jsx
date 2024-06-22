import { Avatar, Dropdown } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

const UserInfo = ({ firstName = '' }) => {
  const router = useRouter()
  const firstLetter = firstName.charAt(0).toUpperCase()

  const goMyProfile = () => router.push('/gmc/perfil')

  const closeSession = () => {
    router.push('/')
  }

  const userMenu = {
    items: [
      {
        key: '1',
        label: <a onClick={goMyProfile}>{firstName}</a>,
        icon: <UserOutlined />
      },
      {
        key: '2',
        danger: true,
        label: <a onClick={closeSession}>Salir</a>,
        icon: <LogoutOutlined onClick={closeSession} />
      }
    ]
  }

  return (
    <Dropdown menu={userMenu} placement='bottomRight' arrow>
      <Avatar
        style={{ backgroundColor: '#f56a00' }}
        className='cursor-pointer'
      >
        {firstLetter}
      </Avatar>
    </Dropdown>
  )
}

export default UserInfo
