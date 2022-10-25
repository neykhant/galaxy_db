import React, { useEffect } from 'react'
import { Typography, Space, Row, Col, Table, Spin, message } from 'antd'
import Layout from 'antd/lib/layout/layout'
import { getUnits } from '../../store/actions'
import { connect, useSelector } from 'react-redux'
import { successDeleteMessage } from '../../uitls/messages'
import { useNavigate, useParams } from 'react-router-dom'

const { Title } = Typography

const UnitStock = ({ units, getUnits }) => {
  const param = useParams()
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)

  useEffect(() => {
    const fetchData = async () => {
      await getUnits()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getUnits])

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

  const columns = [
    {
      title: 'ယူနစ်',
      dataIndex: 'name',
      render: (_, record) => `${record.name}(${record.quantity})`,
    },
    {
      title: 'အရေအတွက်',
      dataIndex: 'quantity',
      render: (_, record) => `${Math.floor(param?.qty / record.quantity)}`,
    },
  ]

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={3}>ယူနစ်အလိုက် Stock</Title>
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={units.units}
            pagination={{ defaultPageSize: 10 }}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  units: store.unit,
})

export default connect(mapStateToProps, {
  getUnits,
})(UnitStock)
