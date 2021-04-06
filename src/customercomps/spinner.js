import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Spinner = (props) => {
    return(
        <div className="spinner">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "green" }} spin/>} tip={props.tip}/>
        </div>
    )
}

export default Spinner
