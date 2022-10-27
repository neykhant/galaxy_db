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
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {
  getBadItems,
  deleteBadItems,
  getBadItem,
  getShops,
} from '../../store/actions'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'
import { successDeleteMessage } from '../../uitls/messages'

const { Title } = Typography
const { Option } = Select

const ShowBadItem = ({ getBadItems, deleteBadItems, getBadItem, getShops }) => {
  const badItems = useSelector((state) => state.bad_item.bad_items)
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const user = useSelector((state) => state.auth.user)
  const shops = useSelector((state) => state.shop.shops)

  useEffect(() => {
    const fetchData = async () => {
      await getBadItems()
      await getShops()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [])

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

  const navigate = useNavigate()

  const handleDelete = async (record) => {
    await deleteBadItems(record.id)
  }

  const handleClick = async (record) => {
    await getBadItem(record.id)
    navigate(`/admin/edit-bad-item/${record.id}`)
  }

  const [showBadItemShop, setShowBadItemShop] = useState(null)
  const onChangeShop = (value) => {
    if (value === undefined) {
      setShowBadItemShop(badItems)
    } else {
      const filterBuyShop = badItems.filter(
        (bad) => parseInt(bad.shop_id) === value,
      )
      setShowBadItemShop(filterBuyShop)
    }
  }

  const columns = [
    {
      title: 'ရက်စွဲ',
      dataIndex: 'date',
    },
    {
      title: 'ပစ္စည်းအမည်',
      dataIndex: 'item_name',
      render: (_, record) => record.stock?.item?.name,
    },
    {
      title: '	ပစ္စည်းကုတ်',
      dataIndex: 'item_code',
      render: (_, record) => record.stock?.item?.code,
    },
    {
      title: '	အရေအတွက်',
      dataIndex: 'quantity',
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
            <Col span={20}>
              <Title level={3}>ချို့ယွင်းချက်ရှိပစ္စည်:များစာရင်း</Title>
            </Col>

            <Col span={4}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                size="middle"
                onClick={() => navigate('/admin/create-bad-item')}
              >
                <PlusSquareOutlined />
                အသစ်ထည့်မည်
              </Button>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={11}>
              {user?.position == 'owner' && (
                <Space
                  direction="horizontal"
                  style={{
                    width: '100%',
                    marginBottom: '10px',
                  }}
                  size="large"
                >
                  {/* <Text type="secondary">ပစ္စည်းအမည်ရွေးပါ</Text> */}
                  <Select
                    showSearch
                    placeholder="ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
                    optionFilterProp="children"
                    onChange={onChangeShop}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    allowClear={true}
                    size="large"
                    style={{ borderRadius: '10px' }}
                  >
                    {shops.map((s) => (
                      <Option key={s.id} value={s.id}>
                        {s.name}
                      </Option>
                    ))}
                  </Select>
                </Space>
              )}
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={showBadItemShop == null ? badItems : showBadItemShop}
            pagination={{ defaultPageSize: 10 }}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

export default connect(null, {
  getBadItems,
  deleteBadItems,
  getBadItem,
  getShops,
})(ShowBadItem)
