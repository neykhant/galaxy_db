import React, { useEffect } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  notification,
  Spin,
  message,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getExpenses, deleteExpenses, getExpense } from '../../store/actions'
import { connect, useSelector } from 'react-redux'
import { getReadableDateDisplay } from '../../uitls/convertToHumanReadableTime'
import { ExportToExcel } from '../../excel/ExportToExcel'
import Text from 'antd/lib/typography/Text'
import { successDeleteMessage } from '../../uitls/messages'

const { Title } = Typography

const ShowExpenses = ({ getExpenses, deleteExpenses, getExpense }) => {
  const allExpenses = useSelector((state) => state.expense.expenses)
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const user = useSelector((state) => state.auth.user)

  const fileName = 'Expenses' // here enter filename for your excel file
  const result = allExpenses.map((expense) => ({
    Name: expense.name,
    Amount: expense.amount,
    Date: getReadableDateDisplay(expense?.created_at),
  }))

  let allCredit = []
  allExpenses.forEach((expense) => allCredit.push(parseInt(expense.amount)))
  const allAmount = allCredit.reduce((a, b) => a + b, 0)

  const navigate = useNavigate()
  const mountedRef = React.useRef(true)
  const getExpenseResult = async () => {
    if (!mountedRef.current) return null
    try {
      const response = await getExpenses()
      const result = response.data
      console.log(result)
      // setGetData(result);
    } catch (error) {
      // console.log(error.response);
    }
  }

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

  React.useEffect(() => {
    getExpenseResult()
    return () => {
      mountedRef.current = false
    }
  }, [])

  const handleClick = async (record) => {
    await getExpense(record.id)
    navigate(`/admin/edit-expenses/${record.id}`)
  }

  const handleDelete = async (record) => {
    await deleteExpenses(record.id)
  }

  const columns = [
    {
      title: 'ရက်စွဲ',
      dataIndex: 'created_at',
      render: (_, record) => getReadableDateDisplay(record.created_at),
    },
    {
      title: 'ကုန်ကျစရိတ်',
      dataIndex: 'name',
    },
    {
      title: 'စုစုပေါင်း',
      dataIndex: 'amount',
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
              <Title level={3}>ကုန်ကျစရိတ်စာရင်း</Title>
            </Col>
            <Col span={4}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                size="middle"
                onClick={() => navigate('/admin/create-expenses')}
              >
                <PlusSquareOutlined />
                အသစ်ထည့်မည်
              </Button>
            </Col>
            <Col span={4}>
              <ExportToExcel apiData={result} fileName={fileName} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Space
                direction="horizontal"
                style={{ width: '100%', justifyContent: 'right' }}
                size="large"
              >
                <Text
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    padding: '10px',
                    color: 'var(--white-color)',
                    borderRadius: '5px',
                  }}
                >
                  စုစုပေါင်းကုန်ကျစရိတ် = {allAmount} Ks
                </Text>
              </Space>
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={allExpenses}
            rowKey={allExpenses.key}
            pagination={{ defaultPageSize: 10 }}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  expense: store.expense,
})

export default connect(mapStateToProps, {
  getExpenses,
  deleteExpenses,
  getExpense,
})(ShowExpenses)
