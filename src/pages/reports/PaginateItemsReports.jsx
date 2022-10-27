import React, { useEffect, useState } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Table,
  Button,
  DatePicker,
  Select,
  message,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { FilterOutlined } from '@ant-design/icons'
import queryString from 'query-string'
import { getReadableDateDisplay } from '../../uitls/convertToHumanReadableTime'
import { useLocation, useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { getPaginateBestItems, getItems } from '../../store/actions'
import ReactPaginate from 'react-paginate'
import dayjs from 'dayjs'
import Text from 'antd/lib/typography/Text'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { PaginateExportToExcel } from '../../excel/PaginateExportToExcel'
import { apiUrl } from '../../constants/url'
import axios from 'axios'

const { Title } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

const PaginateItemsReport = ({ item, getPaginateBestItems, getItems }) => {
  const [exportLoading, setExportLoading] = useState(false)
  const [dateRange, setDateRange] = useState(null)
  const [itemName, setItemName] = useState(undefined)

  const navigate = useNavigate()
  const location = useLocation()

  const items = useSelector((state) => state.item.items)
  const itemsUnique = []
  items.forEach((i) => itemsUnique.push(i?.name))
  let unique = [...new Set(itemsUnique)]

  useEffect(() => {
    const query = queryString.parse(location.search)
    if (!('page' in query)) {
      query.page = 1
    }
    getPaginateBestItems(query)
  }, [getPaginateBestItems, location.search])

  useEffect(() => {
    getItems()
  }, [getItems])

  const handlePageClick = (event) => {
    const query = queryString.parse(location.search)
    query.page = event.selected + 1
    navigate(`${location.pathname}?${queryString.stringify(query)}`)
  }

  const handleFilter = async () => {
    const query = queryString.parse(location.search)
    query.page = 1

    if (dateRange != null) {
      query.start_date = dayjs(dateRange[0]).format('YYYY-MM-DD')
      query.end_date = dayjs(dateRange[1]).format('YYYY-MM-DD')
    } else {
      delete query['start_date']
      delete query['end_date']
    }

    if (itemName !== undefined) {
      query.item_name = itemName
    } else {
      delete query['item_name']
    }

    navigate(`${location.pathname}?${queryString.stringify(query)}`)
    setDateRange(null)
    setItemName(undefined)
  }

  let columns = []
  if (!queryString.parse(location.search).best) {
    columns = [
      {
        title: 'စဉ်',
        dataIndex: 'order',
        render: (_, record) => record.id,
      },
      {
        title: 'ရက်စွဲ',
        dataIndex: 'invoice.created_at',
        render: (_, record) =>
          getReadableDateDisplay(record.invoice?.created_at),
      },
      {
        title: 'ပစ္စည်းအမည်',
        dataIndex: 'invoice.stock',
        render: (_, record) => record.item?.name,
      },
      {
        title: 'အရေအတွက်',
        dataIndex: 'quantity',
        sorter: {
          compare: (a, b) => a.quantity - b.quantity,
          multiple: 1,
        },
      },
      {
        title: 'စုစုပေါင်း',
        render: (_, record) => record.price * record.quantity,
      },
    ]
  } else {
    columns = [
      {
        title: 'စဉ်',
        dataIndex: 'order',
        render: (_, record) => record.item_id,
      },
      {
        title: 'ပစ္စည်းအမည်',
        dataIndex: 'invoice.stock',
        render: (_, record) => record.item?.name,
      },

      {
        title: 'အရေအတွက်',
        dataIndex: 'total_qty',
        sorter: {
          compare: (a, b) => a.total_qty - b.total_qty,
          multiple: 1,
        },
      },
      {
        title: 'စုစုပေါင်း',
        dataIndex: 'total_subtotal',
      },
    ]
  }

  const handleExport = async () => {
    setExportLoading(true)
    try {
      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      const fileExtension = '.xlsx'

      if (!queryString.parse(location.search).best) {
        const response = await axios.get(`${apiUrl}items/bestItem`)
        const result = response.data.data.map((v) => ({
          Date: getReadableDateDisplay(v.created_at),
          Name: v.item.name,
          Quantity: v.quantity,
          SubTotal: v.subtotal,
        }))

        if (response.status === 201) {
          const ws = XLSX.utils.json_to_sheet(result)
          const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
          const excelBuffer = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'array',
          })
          const data = new Blob([excelBuffer], { type: fileType })
          FileSaver.saveAs(data, 'Sale-Items' + fileExtension)
        }
      } else {
        const response = await axios.get(`${apiUrl}items/bestItem?best=true`)
        const result = response.data.data.map((v) => ({
          Name: v.item.name,
          Quantity: v.total_qty,
          SubTotal: v.total_subtotal,
        }))

        if (response.status === 201) {
          const ws = XLSX.utils.json_to_sheet(result)
          const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
          const excelBuffer = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'array',
          })
          const data = new Blob([excelBuffer], { type: fileType })
          FileSaver.saveAs(data, 'Best-Sale-Items' + fileExtension)
        }
      }
    } catch (error) {
      message.error('Please try again!')
    }
    setExportLoading(false)
  }

  return (
    <Layout style={{ margin: '20px' }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Title level={3}>ပစ္စည်းအရောင်း မှတ်တမ်းစာမျက်နှာ</Title>
          </Col>
          <Col span={6}>
            <PaginateExportToExcel
              status={exportLoading}
              onClick={handleExport}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xl={{ span: 8 }}>
            <RangePicker
              value={dateRange}
              onChange={(val) => setDateRange(val)}
            />
          </Col>
          <Col xl={{ span: 8 }}>
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ရွေးပါ"
              optionFilterProp="children"
              onChange={(value) => setItemName(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: '10px' }}
              value={itemName}
            >
              {unique.map((item) => (
                <Option key={Math.random() * 100} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={{ span: 4 }}>
            <Button
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--white-color)',
                borderRadius: '5px',
              }}
              size="middle"
              onClick={handleFilter}
            >
              <FilterOutlined />
              Filter
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {!queryString.parse(location.search).best ? (
            <Col span={6}>
              <Button
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                block
                onClick={() =>
                  (window.location = '/admin/paginate-item-report?best=true')
                }
              >
                အရောင်းရဆုံးပစ္စည်းများ
              </Button>
            </Col>
          ) : (
            <Col span={6}>
              <Button
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                block
                onClick={() =>
                  (window.location = '/admin/paginate-item-report')
                }
              >
                ရောင်းရသောပစ္စည်းများ
              </Button>
            </Col>
          )}
          <Col span={6}>
            <Text
              style={{
                backgroundColor: 'var(--primary-color)',
                padding: '10px',
                color: 'var(--white-color)',
                borderRadius: '5px',
              }}
            >
              Grand Total = {item.grand_total}
            </Text>
          </Col>
        </Row>
        {!queryString.parse(location.search).best ? (
          <>
            <Table
              bordered
              columns={columns}
              dataSource={item.bestItems}
              pagination={{
                defaultPageSize: 10,
                position: ['none', 'none'],
              }}
            />
            <div style={{ width: '400px', overflowX: 'scroll' }}>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={10}
                pageCount={Math.ceil(item.total / 10)}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
              />
            </div>
          </>
        ) : (
          <Table bordered columns={columns} dataSource={item.bestItems} />
        )}
      </Space>
    </Layout>
  )
}

const mapStateToProps = (store) => ({
  status: store.status,
  item: store.item,
})

export default connect(mapStateToProps, {
  getPaginateBestItems,
  getItems,
})(PaginateItemsReport)
