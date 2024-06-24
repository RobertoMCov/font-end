import { Flex, Image } from 'antd'
import React from 'react'
const Icons = () => {
    return (
        <Flex>
            <div className='bg-[#0291D4]'>
                <Image preview={false} width={40} src='../img/icons/iconFacebook.svg' />
            </div>
            <div className='bg-[#0291D4]'>
                <Image preview={false} src='/confit/icon/iconFacebook.svg' />
            </div>
            <div className='bg-[#0291D4]'>
                <Image preview={false} src='/confit/icon/iconFacebook.svg' />
            </div>
            <div className='bg-[#0291D4]'>
                <Image preview={false} src='/confit/icon/iconFacebook.svg' />
            </div>
        </Flex>
    )
}

export default Icons