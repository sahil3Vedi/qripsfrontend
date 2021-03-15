import React, {Component} from 'react'
import { Button, Empty, Spin, Modal, Form, Input, message, Table, Space, InputNumber, Select, Upload } from 'antd'
import { PlusOutlined, DeleteOutlined, ReconciliationOutlined } from '@ant-design/icons'
import axios from 'axios'
import './inventory.css'

const { TextArea } = Input
const { Option } = Select

class Inventory extends Component{
    constructor(props){
        super(props)
        this.state = {
            products : [],
            warehouses : [],
            warehouses_loading: true,
            warehouse_modal_visible: false,
            warehouse_adding: false,
            products_loading: true,
            product_modal_visible: false,
            product_adding: false,
            productImageUploading: false,
            productImageList: [],
        }
    }

    componentDidMount(){
        const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        axios.get(`${process.env.REACT_APP_BACKEND}/warehouses`,config)
        .then(res=>{
            this.setState({
                warehouses: res.data,
                warehouses_loading: false,
            })
        })
    }

    toggleWarehouseModal = () => {
        this.setState(prevState=>({
            warehouse_modal_visible: !prevState.warehouse_modal_visible
        }))
    }

    toggleProductModal = () => {
        this.setState(prevState=>({
            product_modal_visible: !prevState.product_modal_visible
        }))
    }

    toggleProductImageUploading = () => {
        this.setState(prevState=>({
            productImageUploading: !prevState.productImageUploading
        }))
    }

    toggleWarehouseAdding = () => {
        this.setState(prevState=>({
            warehouse_adding: !prevState.warehouse_adding
        }))
    }

    addWarehouse = (values: any) => {
        this.toggleWarehouseAdding()
        const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        axios.post(`${process.env.REACT_APP_BACKEND}/warehouses`,values,config)
        .then(res=>{
            this.toggleWarehouseAdding()
            message.success("Warehouse Added")
            this.reloadWarehouses()
            this.toggleWarehouseModal()
        })
        .catch(err=>{
            console.log(err)
            this.toggleWarehouseAdding()
            message.error(err.response.data.message)
            this.reloadWarehouses()
            this.toggleWarehouseModal()
        })
    }

    reloadWarehouses = () => {
        this.setState({warehouses_loading: true},()=>{
            const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
            axios.get(`${process.env.REACT_APP_BACKEND}/warehouses`,config)
            .then(res=>{
                this.setState({
                    warehouses: res.data,
                    warehouses_loading: false,
                })
            })
        })
    }

    deleteWarehouse = (id) => {
        const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        axios.delete(`${process.env.REACT_APP_BACKEND}/warehouses/${id}`,config)
        .then(res=>{
            message.success(res.data.message)
            this.reloadWarehouses()
        })
        .catch(err=>{
            console.log(err)
            message.error(err.response.data.message)
            this.reloadWarehouses()
        })
    }

    updateFileList = (file) => {
        let temp = this.state.productImageList
        temp.push(file.name)
        this.setState({
            productImageList: temp
        })
    }

    uploadFile = (file) => {
        // const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        // axios.post(`${process.env.REACT_APP_BACKEND}/files`,{file})
        // .then(res=>{
        //     console.log(res.data)
        // })
        console.log(file)
    }

    addProduct = (values:any) => {
        console.log(values)
    }

    render(){
        // Warehouse Rendering
        const warehouse_columns = [
            {
                title:'Name',
                dataIndex:'warehouse_name',
                key:'warehouse_name'
            },
            {
                title:'Address',
                dataIndex:'warehouse_address',
                key:'warehouse_address'
            },
            {
                title:'City',
                dataIndex:'warehouse_city',
                key:'warehouse_city'
            },
            {
                title:'Pincode',
                dataIndex:'warehouse_pincode',
                key:'warehouse_pincode'
            },
            {
                title:'Product Count',
                dataIndex:'warehouse_products',
                key:'warehouse_products',
                render: text => text.length
            },
            {
                title:'',
                render: (text,record) => (
                    <Space>
                        <Button icon={<DeleteOutlined />} type="danger" onClick={()=>{this.deleteWarehouse(record._id)}}/>
                    </Space>
                )
            }
        ]
        let warehouse_display = <Table rowKey="warehouse_name" dataSource={this.state.warehouses} columns={warehouse_columns} />
        let warehouse_modal = <Modal destroyOnClose title="Add Warehouse" visible={this.state.warehouse_modal_visible} footer={null} onCancel={this.toggleWarehouseModal}>
            <Form name="add_warehouse" onFinish={this.addWarehouse}>
                <Form.Item name="warehouse_name" rules={[{ required: true, message: 'Please enter Warehouse Name' }]}>
                    <Input placeholder="Name"/>
                </Form.Item>
                <Form.Item name="warehouse_address" rules={[{ required: true, message: 'Please enter Warehouse Address' }]}>
                    <Input placeholder="Address"/>
                </Form.Item>
                <Form.Item name="warehouse_city" rules={[{ required: true, message: 'Please enter Warehouse City' }]}>
                    <Input placeholder="City"/>
                </Form.Item>
                <Form.Item name="warehouse_pincode" rules={[{ required: true, message: 'Please enter Warehouse Pincode' }]}>
                    <Input placeholder="Pincode"/>
                </Form.Item>
                <Form.Item>
                    <Button loading={this.state.warehouse_adding} type="primary" htmlType="submit">Add</Button>
                </Form.Item>
            </Form>
        </Modal>
        let warehouseSelectOptions = this.state.warehouses ? this.state.warehouses.map(x=><Option value={x.warehouse_name} key={x.warehouse_name}>{x.warehouse_name}</Option>) : []
        // Product Rendering
        let product_image_upload_props = {
            beforeUpload: file => {
                //validating file type & size
                const isPng = (file.type === 'image/png');
                if (!isPng) message.error('You can only upload PNG file')
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) message.error('Image must smaller than 2MB!')
                //uploading file
                if (isPng && isLt2M) {
                    const formData = new FormData()
                    formData.append("file",file)
                    formData.append("upload_preset","msiuxpoc")
                    axios.post("https://api.cloudinary.com/v1_1/dxti6efrg/image/upload",formData)
                    .then(res=>{
                        console.log(res.data)
                    })
                    console.log(file)
                }
                return false;
            },
            multiple: false,
            showUploadList: false,
            accept:".png"
        }
        let product_modal = <Modal destroyOnClose title="Add Product" visible={this.state.product_modal_visible} footer={null} onCancel={this.toggleProductModal}>
            <Form name="add_product" onFinish={this.addProduct}>
                <Form.Item name="name" rules={[{ required: true, message: 'Please enter Product Name' }]}>
                    <Input placeholder="Product Name"/>
                </Form.Item>
                <Form.Item>
                    <Upload {...product_image_upload_props}>
                        <Button loading={this.state.productImageUploading}>Add Product Image</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="description" rules={[{ required: true, message: 'Please enter Product Description' }]}>
                    <TextArea placeholder="Product Description" rows={4} maxLength={250}/>
                </Form.Item>
                <Form.Item name="price" rules={[{ required: true, message: 'Please enter Price' }]}>
                    <Input placeholder="Unit Price"/>
                </Form.Item>
                <Form.Item name="quantity" rules={[{ required: true, message: 'Please enter Quantity' }]}>
                    <InputNumber min={1} max={10} placeholder={"Enter Quantity"} style={{ width: '100%' }}/>
                </Form.Item>
                <Form.Item name="warehouse_name" rules={[{ required: true, message: 'Please select Warehouse' }]}>
                    <Select placeholder="Select Warehouse">
                        {warehouseSelectOptions}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button loading={this.state.product_adding} type="primary" htmlType="submit">Add</Button>
                </Form.Item>
            </Form>
        </Modal>
        return (
            <div>
                {warehouse_modal}
                {product_modal}
                <p className="workspace-title">Inventory</p>
                <div className="workspace-action">
                    <div><p className="workspace-subtitle">Products</p></div>
                    <div><Button type="primary" icon={<PlusOutlined />} onClick={this.toggleProductModal}> Add Product</Button></div>
                </div>
                {this.state.products.length ? <p>Products Available</p> : <Empty description="No Products"/>}
                <div className="workspace-action">
                    <div><p className="workspace-subtitle">Warehouses</p></div>
                    <div><Button type="primary" icon={<PlusOutlined />} onClick={this.toggleWarehouseModal}> Add Warehouse</Button></div>
                </div>
                {this.state.warehouses_loading ? <Spin/> : (this.state.warehouses.length ? warehouse_display : <Empty description="No Warehouses"/>)}
                <Button type="primary" icon={<ReconciliationOutlined />}>Run Parity Check</Button>
            </div>
        )
    }
}

export default Inventory
