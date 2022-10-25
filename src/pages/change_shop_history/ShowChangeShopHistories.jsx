import React, { useEffect } from 'react'
import { Typography, Space, Row, Col, Table, Spin, message, Select } from 'antd'
import Layout from 'antd/lib/layout/layout'
import { getChangeShopHistories, getAccounts } from '../../store/actions'
import { connect, useSelector } from 'react-redux'
import { getDate } from '../../uitls/convertToDate'
import { useState } from 'react'

const { Title } = Typography
const { Option } = Select

const ShowChangeShopHistories = ({ getChangeShopHistories, getAccounts }) => {
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const changeShopHistories = useSelector(
    (state) => state.changeShopHistory.change_shop_histories,
  )
  const accounts = useSelector((state) => state.account.accounts)

  useEffect(() => {
    const fetchData = async () => {
      await getChangeShopHistories()
      await getAccounts()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getChangeShopHistories])

  useEffect(() => {
    errors.message !== null && message.error(errors.message)
    return () => errors.message
  }, [errors.message])

  const [showChangeShopHistories, setShowChangeShopHistories] = useState(null)
  const onChange = (value) => {
    if (value === undefined) {
      setShowChangeShopHistories(changeShopHistories)
    } else {
      const filter = changeShopHistories.filter(
        (ch) => parseInt(ch.user.id) === value,
      )
      setShowChangeShopHistories(filter)
    }
  }

  const columns = [
    {
      title: 'အမည်',
      dataIndex: 'user.name',
      render: (_, record) => record.user.name,
    },
    {
      title: 'ဆိုင်အမည်(မှ)',
      dataIndex: 'from_shop.name',
      render: (_, record) => record.from_shop.name,
    },
    {
      title: 'ဆိုင်အမည်(သို့)',
      dataIndex: 'to_shop.name',
      render: (_, record) => record.to_shop.name,
    },
    {
      title: 'ရက်စွဲ',
      dataIndex: 'created_at',
      render: (row) => getDate(row),
    },
  ]

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Title level={3}>ဆိုင်ပြောင်းစာရင်း</Title>
            </Col>
            <Col span={12}>
              <Col span={6}>
                <Space
                  direction="horizontal"
                  style={{
                    width: '100%',
                    marginBottom: '10px',
                  }}
                  size="large"
                >
                  <Select
                    showSearch
                    placeholder="ကျေးဇူးပြု၍ အမည်ရွေးပါ"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    allowClear={true}
                    size="large"
                    style={{ borderRadius: '10px' }}
                  >
                    {accounts.map((s) => (
                      <Option key={s.id} value={s.id}>
                        {s.name}
                      </Option>
                    ))}
                  </Select>
                </Space>
              </Col>
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={
              showChangeShopHistories === null
                ? changeShopHistories
                : showChangeShopHistories
            }
            pagination={{ defaultPageSize: 10 }}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

export default connect(null, { getChangeShopHistories, getAccounts })(
  ShowChangeShopHistories,
)
