import React, { useEffect, useState } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Table,
  Spin,
  Button,
  DatePicker,
  Select,
  message,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { DeleteOutlined, FilterOutlined } from '@ant-design/icons'
import { connect, useSelector } from 'react-redux'
import {
  getPaginateVouchers,
  deleteVouchers,
  getShops,
  getStaffs,
} from '../../store/actions'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
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

const PaginateVoucherReports = ({
  status,
  voucher,
  getPaginateVouchers,
  deleteVouchers,
  getShops,
  getStaffs,
}) => {
  const [exportLoading, setExportLoading] = useState(false)
  const [dateRange, setDateRange] = useState(null)
  const [shopId, setShopId] = useState(undefined)
  const [staffId, setStaffId] = useState(undefined)
  const [customerName, setCustomerName] = useState(undefined)
  const navigate = useNavigate()
  const location = useLocation()

  const user = useSelector((state) => state.auth.user)
  const shops = useSelector((state) => state.shop.shops)
  const staffs = useSelector((state) => state.staff.staffs)

  const itemsUnique = []
  voucher?.vouchers?.forEach((i) => itemsUnique.push(i?.customer_name))
  let unique = [...new Set(itemsUnique)]

  useEffect(() => {
    const query = queryString.parse(location.search)
    if (!('page' in query)) {
      query.page = 1
    }
    getPaginateVouchers(query)
  }, [getPaginateVouchers, location.search])

  useEffect(() => {
    const fetchData = async () => {
      await getShops()
      await getStaffs()
    }

    fetchData()
    return () => {
      fetchData()
    }
  }, [getShops, getStaffs])

  const handlePageClick = (event) => {
    const query = queryString.parse(location.search)
    query.page = event.selected + 1
    navigate(`${location.pathname}?${queryString.stringify(query)}`)
  }

  const handleDelete = async (record) => {
    await deleteVouchers(record.id)
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

    if (shopId !== undefined) {
      query.shop_id = shopId
    } else {
      delete query['shop_id']
    }

    if (staffId !== undefined) {
      query.staff_id = staffId
    } else {
      delete query['staff_id']
    }

    if (customerName !== undefined) {
      query.customer_name = customerName
    } else {
      delete query['customer_name']
    }

    navigate(`${location.pathname}?${queryString.stringify(query)}`)
    setDateRange(null)
    setShopId(undefined)
    setStaffId(undefined)
    setCustomerName(undefined)
  }

  const columns = [
    {
      title: 'ရက်စွဲ',
      dataIndex: 'date',
    },
    {
      title: 'ဘောင်ချာကုတ်',
      dataIndex: 'voucher_code',
    },
    {
      title: 'ဝန်ထမ်းအမည်',
      dataIndex: 'staff.name',
      render: (_, record) => record?.staff?.name,
    },

    {
      title: 'ဝယ်သူအမည်',
      dataIndex: 'customer_name',
    },
    {
      title: 'ဝယ်ယူသောပမာဏ',
      dataIndex: 'final_total',
      sorter: {
        compare: (a, b) => a.total - b.total,
        multiple: 1,
      },
    },

    {
      title: 'ပေးချေခဲ့သောပမာဏ',
      dataIndex: 'paid',
      render: (_, record) => record.final_total - record.credit,
    },
    {
      title: 'ပေးရန်ကျန်ငွေ',
      dataIndex: 'credit',
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'အကြွေးဆပ်ခြင်း',
      dataIndex: 'id',
      render: (id) => (
        <Button
          type="primary"
          style={{ backgroundColor: '#ad6800', borderColor: '#ad6800' }}
          onClick={() => navigate(`/admin/create-sale-credits/${id}`)}
        >
          အကြွေးပေးရန်
        </Button>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => (
        <Space direction="horizontal">
          <Button
            type="primary"
            onClick={() => {
              navigate(`/admin/sale/${record.id}`)
            }}
          >
            Detail
          </Button>
          {user?.position !== 'staff' && (
            <Button type="primary" danger onClick={() => handleDelete(record)}>
              <DeleteOutlined />
            </Button>
          )}
        </Space>
      ),
    },
  ]

  const handleExport = async () => {
    setExportLoading(true)
    try {
      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      const fileExtension = '.xlsx'

      const response = await axios.get(`${apiUrl}invoices`)
      const result = response.data.data.map((v) => ({
        Date: v.date,
        VoucherCode: v.voucher_code,
        CustomerName: v.customer_name,
        Total: Number(v.total),
        Paid: Number(v.paid),
        Credit: Number(v.credit),
      }))

      if (response.status === 200) {
        const ws = XLSX.utils.json_to_sheet(result)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'Vouchers' + fileExtension)
      }
    } catch (error) {
      message.error('Please try again!')
    }
    setExportLoading(false)
  }

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <Title level={3}>ဘောင်ချာအရောင်း မှတ်တမ်းစာမျက်နှာ</Title>
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
                placeholder="ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
                onChange={(value) => setShopId(value)}
                value={shopId}
              >
                {shops.map((shop) => (
                  <Option value={shop.id} key={shop.id}>
                    {shop.name}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 8 }}>
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ဝန်ထမ်းအမည်ရွေးပါ"
                optionFilterProp="children"
                onChange={(value) => setStaffId(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
                value={staffId}
              >
                {staffs.map((staff) => (
                  <Option key={staff.id} value={staff.id}>
                    {staff.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xl={{ span: 8 }}>
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ဝယ်သူအမည်ရွေးပါ"
                optionFilterProp="children"
                onChange={(value) => setCustomerName(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
                value={customerName}
              >
                {unique.map((item) => (
                  <Option key={Math.random() * 100} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
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
            <Col>
              <Text
                style={{
                  backgroundColor: 'var(--primary-color)',
                  padding: '10px',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
              >
                ပေးရန်ကျန်ငွေစုစုပေါင်း = {voucher.total_credit} Ks
              </Text>
            </Col>
            <Col>
              <Text
                style={{
                  backgroundColor: 'var(--primary-color)',
                  padding: '10px',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
              >
                ဝယ်ယူသောပမာဏစုစုပေါင်း = {voucher.total_final_total} Ks
              </Text>
            </Col>
            <Col>
              <Text
                style={{
                  backgroundColor: 'var(--primary-color)',
                  padding: '10px',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
              >
                ပေးချေခဲ့သောပမာဏစုစုပေါင်း = {voucher.total_paid} Ks
              </Text>
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={voucher.vouchers}
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
              pageCount={Math.ceil(voucher.total / 10)}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
            />
          </div>
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  status: store.status,
  voucher: store.voucher,
})

export default connect(mapStateToProps, {
  getPaginateVouchers,
  deleteVouchers,
  getShops,
  getStaffs,
})(PaginateVoucherReports)
