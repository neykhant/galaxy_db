import React, { useEffect } from 'react'
import { Typography, Space, Row, Col, Button, Table, Spin, message } from 'antd'
import Layout from 'antd/lib/layout/layout'
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import {
  getMerchants,
  deleteMerchants,
  getMerchant,
  clearAlertMerchant,
} from '../../store/actions'
import { ExportToExcel } from '../../excel/ExportToExcel'
import { successDeleteMessage } from '../../uitls/messages'
import { Icon } from '@iconify/react'

const { Title } = Typography

const ShowMerchants = ({
  merchant,
  getMerchants,
  deleteMerchants,
  getMerchant,
}) => {
  const allMerchants = useSelector((state) => state.merchant.merchants)
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const user = useSelector((state) => state.auth.user)

  const fileName = 'Merchants' // here enter filename for your excel file
  const result = allMerchants.map((merchant) => ({
    Name: merchant.name,
    Code: merchant.code,
    CompanyName: merchant.company_name,
    Other: merchant.other,
  }))

  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      await getMerchants()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getMerchants])

  // useEffect(() => {
  //   store.dispatch(clearAlertMerchant());
  // }, []);

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
    await getMerchant(record.id)
    navigate(`/admin/edit-merchants/${record.id}`)
  }

  const handleDelete = async (record) => {
    await deleteMerchants(record.id)
  }

  const columns = [
    {
      title: 'ကုတ်',
      dataIndex: 'code',
    },
    {
      title: 'အမည်',
      dataIndex: 'name',
    },
    {
      title: 'ဖုန်းနံပါတ်',
      dataIndex: 'phone',
    },
    {
      title: 'ကုမ္ပဏီအမည်',
      dataIndex: 'company_name',
    },
    {
      title: 'အခြားအချက်အလက်',
      dataIndex: 'other',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => (
        <Space direction="horizontal">
          <Button onClick={() => handleClick(record)}>
            {/* <EditOutlined /> */}
            <Icon icon="el:file-edit" width={20} height={20} />
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            {/* <DeleteOutlined /> */}

            <Icon icon="ant-design:delete-outlined" width={20} height={20} />
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
              <Title level={3}>ကုန်သည်စာရင်း</Title>
            </Col>
            <Col span={4}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                size="middle"
                onClick={() => navigate('/admin/create-merchants')}
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
            dataSource={merchant.merchants}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  merchant: store.merchant,
})

export default connect(mapStateToProps, {
  getMerchants,
  deleteMerchants,
  getMerchant,
  clearAlertMerchant,
})(ShowMerchants)
