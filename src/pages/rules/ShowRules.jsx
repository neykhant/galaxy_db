import React, { useEffect } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  message,
  Popconfirm,
  Spin,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { PlusSquareOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { getRules, deleteRule } from '../../store/actions'
import { successDeleteMessage } from '../../uitls/messages'

const { Title } = Typography

const ShowRules = ({ status, error, rule, getRules, deleteRule }) => {
  const navigate = useNavigate()

  useEffect(() => {
    getRules()

    return () => getRules()
  }, [getRules])

  useEffect(() => {
    error.message !== null && message.error(error.message)

    return () => error.message
  }, [error.message])

  useEffect(() => {
    if (status.success) {
      message.success(successDeleteMessage)
    }

    return () => status.success
  }, [status.success])

  const handleDelete = async (id) => {
    await deleteRule(id)
  }

  const columns = [
    {
      title: 'စည်းကမ်းအမည်',
      dataIndex: 'name',
    },
    {
      title: 'စျေးနှုန်း',
      dataIndex: 'price',
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (id) => (
        <Space direction="horizontal">
          <Button
            type="primary"
            onClick={() => navigate(`/admin/edit-rules/${id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="ဖျက်မှာ သေချာပြီလား"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 18 }}>
              <Title level={3}>စည်းကမ်း စာရင်း</Title>
            </Col>
            <Col xl={{ span: 3 }}>
              <Button
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                size="middle"
                onClick={() => navigate('/admin/create-rules')}
              >
                <PlusSquareOutlined />
                New
              </Button>
            </Col>
            <Col xl={{ span: 3 }}>
              {/* <Button
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--white-color)",
                  borderRadius: "5px",
                }}
                size="middle"
              >
                <ExportOutlined />
                Export
              </Button> */}
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            pagination={{ defaultPageSize: 10 }}
            dataSource={rule.rules}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  status: store.status,
  error: store.error,
  rule: store.rule,
})

export default connect(mapStateToProps, { getRules, deleteRule })(ShowRules)
