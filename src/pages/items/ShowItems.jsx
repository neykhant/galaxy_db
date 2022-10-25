import React, { useEffect, useState } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  Spin,
  message,
  Select,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { getItems, deleteItems, getItem } from '../../store/actions'
import { ExportToExcel } from '../../excel/ExportToExcel'
import { successDeleteMessage } from '../../uitls/messages'

const { Title } = Typography
const { Option } = Select

const ShowItems = ({ item, getItems, deleteItems, getItem }) => {
  const allItems = useSelector((state) => state.item.items)
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const user = useSelector((state) => state.auth.user)
  // console.log(allItems);

  const navigate = useNavigate()

  const fileName = 'Items' // here enter filename for your excel file
  const result = allItems.map((item) => ({
    Name: item.name,
    Code: item.code,
    Buy_Price: item.buy_price,
    Sale_Price: item.sale_price,
  }))

  const [showBuyMerchant, setshowBuyMerchant] = useState(null)
  const onChange = (value) => {
    if (value === undefined) {
      setshowBuyMerchant(allItems)
    } else {
      const filterBuyMerchant = allItems.filter((mer) => mer.name === value)
      setshowBuyMerchant(filterBuyMerchant)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getItems()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getItems])

  useEffect(() => {
    errors.message !== null && message.error(errors.message)

    return () => errors.message
  }, [errors.message])

  useEffect(() => {
    if (status.success) {
      message.success(successDeleteMessage)
    }

    return () => status.success
  }, [status.success])

  const handleClick = async (record) => {
    await getItem(record.id)
    navigate(`/admin/edit-items/${record.id}`)
  }

  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Deleted Your Data",
  //     description: "Your data have been deleted.",
  //     duration: 3
  //   });
  // };

  const handleDelete = async (record) => {
    await deleteItems(record.id)
    // openNotificationWithIcon("error");
  }

  const columns = [
    {
      title: 'ပစ္စည်းပုံ',
      dataIndex: 'image',
      render: (_, record) => (
        <img src={record.image} alt="ပစ္စည်းပုံ" width={80} height={80} />
      ),
    },
    {
      title: 'ပစ္စည်းကုတ်',
      dataIndex: 'code',
    },
    {
      title: 'ပစ္စည်းအမည်',
      dataIndex: 'name',
    },
    {
      title: 'ဝယ်ဈေး',
      dataIndex: 'buy_price',
    },
    {
      title: 'ရောင်းဈေး',
      dataIndex: 'sale_price',
    },

    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={() => handleClick(record)}>
            <EditOutlined />
          </Button>

          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <Title level={3}>ပစ္စည်းစာရင်း</Title>
            </Col>
            <Col span={6}>
              {/* <Space
                direction="horizontal"
                style={{
                  width: "100%",
                  marginBottom: "10px"
                }}
                size="large"
              > */}
              {/* <Text type="secondary">ပစ္စည်းအမည်ရွေးပါ</Text> */}
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ရွေးပါ"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
              >
                {allItems.map((item) => (
                  <Option key={Math.random() * 100} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              {/* </Space> */}
            </Col>
            <Col span={4}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                size="middle"
                onClick={() => navigate('/admin/create-items')}
              >
                <PlusSquareOutlined />
                အသစ်ထည့်မည်
              </Button>
            </Col>
            <Col span={4}>
              <ExportToExcel apiData={result} fileName={fileName} />
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            pagination={{ defaultPageSize: 10 }}
            // dataSource={item.items}
            dataSource={showBuyMerchant != null ? showBuyMerchant : allItems}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  item: store.item,
})

export default connect(mapStateToProps, { getItems, deleteItems, getItem })(
  ShowItems,
)
