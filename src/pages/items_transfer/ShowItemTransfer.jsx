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
  ExportOutlined,
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import {
  getItemTransfers,
  deleteItemTransfers,
  getItemTransfer,
} from '../../store/actions'
import { getReadableDateDisplay } from '../../uitls/convertToHumanReadableTime'
import { ExportToExcel } from '../../excel/ExportToExcel'
import { successDeleteMessage } from '../../uitls/messages'

const { Title } = Typography

const ShowItemTransfer = ({
  item_transfer,
  getItemTransfers,
  deleteItemTransfers,
  getItemTransfer,
}) => {
  const allItemTransfer = useSelector(
    (state) => state.item_transfer.itemTransfers,
  )
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const user = useSelector((state) => state.auth.user)

  // console.log(status)
  const fileName = 'ItemTransfers' // here enter filename for your excel file
  const result = allItemTransfer.map((transfer) => ({
    Quantity: transfer.quantity,
    From_Shop: transfer.shop.name,
    To_Shop: transfer.to_shop.name,
    Code: transfer.stock.item.code,
    Date: getReadableDateDisplay(transfer.created_at),
  }))

  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      await getItemTransfers()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getItemTransfers])

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

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Deleted Your Data',
      description: 'Your data have been deleted.',
      duration: 3,
    })
  }

  const handleDelete = async (record) => {
    console.log(record.id)
    await deleteItemTransfers(record.id)
    openNotificationWithIcon('error')
  }

  const columns = [
    {
      title: 'ရက်စွဲ',
      dataIndex: 'created_at',
      render: (_, record) => getReadableDateDisplay(record.created_at),
    },
    {
      title: 'ပစ္စည်းကုတ်',
      render: (_, record) => record.stock.item.code,
    },
    {
      title: 'ပစ္စည်းအမည်',
      render: (_, record) => record.stock.item.name,
    },
    {
      title: 'From ဆိုင်အမည်',
      dataIndex: 'shop.name',
      render: (_, record) => record.shop.name,
    },
    {
      title: 'To ဆိုင်အမည်',
      dataIndex: 'to_shop.name',
      render: (_, record) => record.to_shop.name,
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
            <Col span={18}>
              <Title level={3}>လွှဲပြောင်းခဲ့သောပစ္စည်းများ</Title>
            </Col>
            <Col span={3}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                size="middle"
                onClick={() => navigate('/admin/create-item-transfer')}
              >
                <PlusSquareOutlined />
                လွှဲပြောင်းရန်
              </Button>
            </Col>
            <Col span={3}>
              <ExportToExcel apiData={result} fileName={fileName} />
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={item_transfer.itemTransfers}
            pagination={{ defaultPageSize: 10 }}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  item_transfer: store.item_transfer,
})

export default connect(mapStateToProps, {
  getItemTransfers,
  deleteItemTransfers,
  getItemTransfer,
})(ShowItemTransfer)
