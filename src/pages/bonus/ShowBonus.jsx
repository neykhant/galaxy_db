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
  getBonus,
  deleteMerchants,
  getBonu,
  getMerchant,
  deleteBonus,
  clearAlertMerchant,
} from '../../store/actions'
import { successDeleteMessage } from '../../uitls/messages'

const { Title } = Typography

const ShowBonus = ({ getBonus, deleteBonus, getBonu }) => {
  const navigate = useNavigate()
  const allMerchants = useSelector((state) => state.merchant.merchants)
  const Bonus = useSelector((state) => state.bonus.bonus)
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const user = useSelector((state) => state.auth.user)

  //   const fileName = "Merchants"; // here enter filename for your excel file
  //   const result = allMerchants.map((merchant) => ({
  //     Name: merchant.name,
  //     Code: merchant.code,
  //     CompanyName: merchant.company_name,
  //     Other: merchant.other
  //   }));

  useEffect(() => {
    const fetchData = async () => {
      await getBonus()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getBonus])

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
    // console.log(record.id)
    await getBonu(record.id)
    navigate(`/admin/edit-bonus/${record.id}`)
  }

  const handleDelete = async (record) => {
    await deleteBonus(record.id)
  }

  const columns = [
    {
      title: 'နှစ်',
      dataIndex: 'year',
    },
    {
      title: 'လ',
      dataIndex: 'month',
    },
    {
      title: 'ဝန်ထမ်းအမည်',
      dataIndex: 'staff_name',
      render: (_, record) => record?.staff?.name,
    },
    {
      title: 'ကော်မရှင်',
      dataIndex: 'commission',
    },
    {
      title: 'ဘောနပ်စ်',
      dataIndex: 'bonus',
    },
    {
      title: 'စားစရိတ်',
      dataIndex: 'food_expense',
    },
    {
      title: 'သွားလာစရိတ်',
      dataIndex: 'travel_expense',
    },
    {
      title: 'ရောင်းအား ဘောနပ်စ်',
      dataIndex: 'sale',
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
              <Title level={3}>ဘောနပ်စ်စာရင်း</Title>
            </Col>
            <Col span={4}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                size="middle"
                onClick={() => navigate('/admin/create-bonus')}
              >
                <PlusSquareOutlined />
                အသစ်ထည့်မည်
              </Button>
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            pagination={{ defaultPageSize: 10 }}
            dataSource={Bonus}
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
  getBonus,
  deleteBonus,
  getBonu,
  deleteMerchants,
  getMerchant,
  clearAlertMerchant,
})(ShowBonus)
