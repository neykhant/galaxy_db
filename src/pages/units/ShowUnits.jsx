import React, { useEffect } from 'react'
import { Typography, Space, Row, Col, Button, Table, Spin, message } from 'antd'
import Layout from 'antd/lib/layout/layout'
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getUnits, deleteUnit, getUnit } from '../../store/actions'
import { connect, useSelector } from 'react-redux'
import { ExportToExcel } from '../../excel/ExportToExcel'
import { successDeleteMessage } from '../../uitls/messages'

const { Title } = Typography

const ShowUnits = ({ units, getUnits, deleteUnit, getUnit }) => {
  const allUnit = useSelector((state) => state.unit.units)
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const user = useSelector((state) => state.auth.user)

  const fileName = 'Units' // here enter filename for your excel file
  const result = allUnit.map((expense) => ({
    Name: expense.name,
    Quantity: expense.quantity,
  }))

  const navigate = useNavigate()
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

  const handleClick = async (record) => {
    await getUnit(record.id)
    navigate(`/admin/edit-units/${record.id}`)
  }

  const handleDelete = async (record) => {
    await deleteUnit(record.id)
  }

  const columns = [
    {
      title: 'ယူနစ်',
      dataIndex: 'name',
    },
    {
      title: 'အရေအတွက်',
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
            <Col span={16}>
              <Title level={3}>ယူနစ်စာရင်း</Title>
            </Col>
            <Col span={4}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                size="middle"
                onClick={() => navigate('/admin/create-units')}
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
  deleteUnit,
  getUnit,
})(ShowUnits)
