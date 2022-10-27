import React, { useEffect } from 'react'
import { Typography, Space, Row, Col, Table, Spin, message, Select } from 'antd'
import Layout from 'antd/lib/layout/layout'
import { getChangeStockHistories, getStocks } from '../../store/actions'
import { connect, useSelector } from 'react-redux'
import { getDate } from '../../uitls/convertToDate'
import { useState } from 'react'

const { Title } = Typography
const { Option } = Select

const ShowChangeStockHistories = ({ getChangeStockHistories, getStocks }) => {
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const changeStockHistories = useSelector(
    (state) => state.changeStockHistory.change_stock_histories,
  )
  const stocks = useSelector((state) => state.stock.stocks)

  useEffect(() => {
    const fetchData = async () => {
      await getChangeStockHistories()
      await getStocks()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getChangeStockHistories])

  useEffect(() => {
    errors.message !== null && message.error(errors.message)
    return () => errors.message
  }, [errors.message])

  const [showChangeStockHistories, setShowChangeStockHistories] = useState(null)
  const onChange = (value) => {
    if (value === undefined) {
      setShowChangeStockHistories(changeStockHistories)
    } else {
      const filter = changeStockHistories.filter(
        (ch) => parseInt(ch.stock.id) === value,
      )
      setShowChangeStockHistories(filter)
    }
  }

  const columns = [
    {
      title: 'ပစ္စည်းကုတ်',
      dataIndex: 'stock.item.code',
      render: (_, record) => record.stock.item.code,
    },
    {
      title: 'ပစ္စည်းအမည်',
      dataIndex: 'stock.item.name',
      render: (_, record) => record.stock.item.name,
    },
    {
      title: 'အရေအတွက်အဟောင်း',
      dataIndex: 'old_quantity',
      render: (_, record) => record.old_quantity,
    },
    {
      title: 'အရေအတွက်အသစ်',
      dataIndex: 'new_quantity',
      render: (_, record) => record.new_quantity,
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
              <Title level={3}>Stock အပြောင်းလဲ စာရင်း</Title>
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
                    placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ရွေးပါ"
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
                    {stocks.map((s) => (
                      <Option key={s.id} value={s.id}>
                        {`${s.item.name}(${s.item.code})`}
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
              showChangeStockHistories === null
                ? changeStockHistories
                : showChangeStockHistories
            }
            pagination={{ defaultPageSize: 10 }}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

export default connect(null, { getChangeStockHistories, getStocks })(
  ShowChangeStockHistories,
)
