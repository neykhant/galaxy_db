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
  ExportOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getStaffs, deleteStaffs, getStaff } from '../../store/actions'
import { connect } from 'react-redux'
import { ExportToExcel } from '../../excel/ExportToExcel'
import { successDeleteMessage } from '../../uitls/messages'

const { Title } = Typography

const ShowStaff = ({ getStaffs, deleteStaffs, getStaff }) => {
  const navigate = useNavigate()
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const user = useSelector((state) => state.auth.user)

  const staffs = useSelector((state) => state.staff.staffs)
  console.log(staffs)

  const fileName = 'Staffs' // here enter filename for your excel file
  const result = staffs.map((staff) => ({
    Date_Of_Birth: staff.dob,
    Bank_Account: staff.bank_account,
    Name: staff.name,
    Phone: staff.phone,
    Salary: staff.salary,
    Start_Work: staff.start_work,
  }))

  useEffect(() => {
    const fetchData = async () => {
      await getStaffs()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getStaffs])

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
    await getStaff(record.id)
    navigate(`/admin/edit-staff/${record.id}`)
  }

  const handleDelete = async (record) => {
    await deleteStaffs(record.id)
  }

  const columns = [
    {
      title: 'ဓါတ်ပုံ',
      dataIndex: 'image',
      render: (_, record) => (
        <img src={`${record.image}`} width={70} height={70} />
      ),
    },
    {
      title: 'အမည်',
      dataIndex: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'အလုပ်စဝင်သောနေ့',
      dataIndex: 'start_work',
    },
    {
      title: 'ရာထူး',
      dataIndex: 'position',
      // render: (_, record) => console.log(record)
    },
    {
      title: 'လခ',
      dataIndex: 'salary',
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
              <Title level={3}>ဝန်ထမ်းစာရင်း</Title>
            </Col>
            <Col span={4}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                size="middle"
                onClick={() => navigate('/admin/create-staff')}
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
            dataSource={staffs}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

export default connect(null, { getStaffs, deleteStaffs, getStaff })(ShowStaff)
