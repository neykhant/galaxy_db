import React, { useEffect, useState } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Table,
  DatePicker,
  Select,
  Input,
  Button,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { ExportOutlined } from '@ant-design/icons'
import queryString from 'query-string'
import { getDailyReport } from '../../store/actions'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'

const { Title } = Typography
const DailyReportScreen = () => {
  const [reportType, setReportType] = useState('1')
  const { Option } = Select
  const { RangePicker } = DatePicker
  const dispatch = useDispatch()
  const location = useLocation()
  const report = useSelector((state) => state.report.report)
  const start_date = new URLSearchParams(window.location.search).get(
    'start_date',
  )
  const end_date = new URLSearchParams(window.location.search).get('end_date')

  useEffect(() => {
    const fetchData = () => {
      dispatch(getDailyReport(queryString.parse(location.search)))
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [dispatch, location.search])

  let columns = []

  if (reportType === '1') {
    columns = [
      {
        title: 'ပစ္စည်းရောင်းရငွေစုစုပေါင်း',
        dataIndex: 'item_total',
      },
      {
        title: 'ဝင်ငွေစုစုပေါင်း',
        dataIndex: 'sale_total',
      },
    ]
  } else {
    columns = [
      {
        title: 'ပစ္စည်းရောင်းရငွေစုစုပေါင်း',
        dataIndex: 'item_total',
      },
      {
        title: 'ဝင်ငွေစုစုပေါင်း',
        dataIndex: 'sale_total',
      },
      {
        title: 'ပစ္စည်းအရင်းစုစုပေါင်း',
        dataIndex: 'item_buy_total',
        render: (_, record) => (
          <span style={{ color: 'red' }}>{record.item_buy_total}</span>
        ),
      },
      {
        title: 'ကော်မရှင်စုစုပေါင်း',
        dataIndex: 'totalCommision',
        render: (_, record) => (
          <span style={{ color: 'red' }}>{record.totalCommision}</span>
        ),
      },
      {
        title: 'အထွေထွေကုန်ကျငွေစုစုပေါင်း',
        dataIndex: 'expenseTotal',
        render: (_, record) => (
          <span style={{ color: 'red' }}>{record.expenseTotal}</span>
        ),
      },
      {
        title: 'အမြတ်စုစုပေါင်း',
        dataIndex: 'profit',
      },
    ]
  }

  return (
    <Layout style={{ margin: '20px' }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Title level={3}>Daily Report Screen</Title>
          </Col>
          <Col span={5}>
            <p
              style={{
                backgroundColor: 'var(--primary-color)',
                padding: '10px',
                color: 'var(--white-color)',
              }}
            >
              Start Date= {start_date}
            </p>
          </Col>

          <Col span={5}>
            <p
              style={{
                backgroundColor: 'var(--primary-color)',
                padding: '10px',
                color: 'var(--white-color)',
              }}
            >
              End Date= {end_date}
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Space direction="vertical" size={12}>
              <RangePicker
                onChange={(val) => {
                  window.location = `/admin/report-screem?start_date=${dayjs(
                    val[0],
                  ).format('YYYY-MM-DD')}&end_date=${dayjs(val[1]).format(
                    'YYYY-MM-DD',
                  )}`
                }}
              />
            </Space>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Input.Group compact style={{ width: '100%' }}>
              <Select
                showSearch
                placeholder="report အမျိုးအစားရွေးပါ"
                optionFilterProp="children"
                allowClear={true}
                onChange={(value) => setReportType(value)}
                size="large"
                style={{ borderRadius: '10px' }}
              >
                <Option value="1">အရောင်းစာရင်းချုပ်</Option>
                <Option value="2">အရှံးအမြတ်စာရင်း</Option>
              </Select>
            </Input.Group>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
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
          pagination={{ position: ['none', 'none'] }}
          dataSource={report}
        />
      </Space>
    </Layout>
  )
}

export default DailyReportScreen
