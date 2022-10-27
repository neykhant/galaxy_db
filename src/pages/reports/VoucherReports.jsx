import React, { useEffect, useState } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  DatePicker,
  Select,
  message,
  Spin,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { DeleteOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import queryString from 'query-string'
import dayjs from 'dayjs'
import {
  getVouchers,
  deleteVouchers,
  getShops,
  getStaffs,
} from '../../store/actions'
import Text from 'antd/lib/typography/Text'
import { successDeleteMessage } from '../../uitls/messages'
import { ExportToExcel } from '../../excel/ExportToExcel'

const { Title } = Typography

const VoucherReports = ({
  voucher,
  getVouchers,
  deleteVouchers,
  getShops,
  getStaffs,
}) => {
  const navigate = useNavigate()
  const { Option } = Select
  const { RangePicker } = DatePicker
  const location = useLocation()
  const start_date = new URLSearchParams(window.location.search).get(
    'start_date',
  )
  const end_date = new URLSearchParams(window.location.search).get('end_date')
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const shops = useSelector((state) => state.shop.shops)
  const staffs = useSelector((state) => state.staff.staffs)
  const user = useSelector((state) => state.auth.user)
  const itemsUnique = []
  voucher?.vouchers?.forEach((i) => itemsUnique.push(i?.customer_name))
  let unique = [...new Set(itemsUnique)]
  // console.log("uu", unique);

  useEffect(() => {
    const fetchData = async () => {
      await getVouchers(queryString.parse(location.search))
      await getStaffs()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getVouchers, getStaffs, location.search])

  useEffect(() => {
    errors.message !== null && message.error(errors.message)

    return () => errors.message
  }, [errors.message])

  useEffect(() => {
    if (status.success) {
      // openNotificationWithIcon("error");
      message.success(successDeleteMessage)
    }

    return () => status.success
  }, [status.success])

  useEffect(() => {
    const fetchData = async () => {
      await getShops()
    }

    fetchData()
    return () => {
      fetchData()
    }
  }, [getShops])

  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Delete Your Data",
  //     description: "Your data have been deleted.",
  //     duration: 3
  //   });
  // };

  const [showBuyMerchant, setshowBuyMerchant] = useState(null)
  const onChange = (value) => {
    if (value === undefined) {
      setshowBuyMerchant(voucher?.vouchers)
    } else {
      const filterBuyMerchant = voucher?.vouchers?.filter(
        (mer) => mer?.customer_name === value,
      )
      setshowBuyMerchant(filterBuyMerchant)
    }
  }

  const onChangeShop = (value) => {
    if (value === undefined) {
      setshowBuyMerchant(voucher?.vouchers)
    } else {
      const filterBuyShop = voucher?.vouchers?.filter(
        (mer) => parseInt(mer.shop_id) === value,
      )
      setshowBuyMerchant(filterBuyShop)
    }
  }

  const onChangeStaff = (value) => {
    if (value === undefined) {
      setshowBuyMerchant(voucher?.vouchers)
    } else {
      const filterBuyShop = voucher?.vouchers?.filter(
        (mer) => parseInt(mer.staff.id) === value,
      )
      setshowBuyMerchant(filterBuyShop)
    }
  }

  const handleDelete = async (record) => {
    await deleteVouchers(record.id)
    // openNotificationWithIcon("error");
  }

  const fileName = 'Vouchers' // here enter filename for your excel file
  const result =
    showBuyMerchant != null
      ? showBuyMerchant?.map((v) => ({
          Date: v.date,
          VoucherCode: v.voucher_code,
          CustomerName: v.customer_name,
          Total: Number(v.total),
          Paid: Number(v.paid),
          Credit: Number(v.credit),
        }))
      : voucher?.vouchers?.map((v) => ({
          Date: v.date,
          VoucherCode: v.voucher_code,
          CustomerName: v.customer_name,
          Total: Number(v.total),
          Paid: Number(v.paid),
          Credit: Number(v.credit),
        }))

  let allCredit = []
  let allAmount = []
  let allPaid = []
  voucher?.vouchers?.forEach((purchase) => {
    allCredit.push(parseInt(purchase.credit))
    allAmount.push(parseInt(purchase.final_total))
    allPaid.push(parseInt(purchase.paid))
  })
  const finalCredit = allCredit.reduce((a, b) => a + b, 0)
  const finalTotal = allAmount.reduce((a, b) => a + b, 0)
  const finalPaid = allPaid.reduce((a, b) => a + b, 0)

  let allCreditGet = []
  let allAmountGet = []
  let allPaidGet = []
  showBuyMerchant?.forEach((mr) => {
    allCreditGet.push(parseInt(mr.credit))
    allAmountGet.push(parseInt(mr.final_total))
    allPaidGet.push(parseInt(mr.paid))
  })
  const finalCreditGet = allCreditGet.reduce((a, b) => a + b, 0)
  const finalAmountGet = allAmountGet.reduce((a, b) => a + b, 0)
  const finalPaidGet = allPaidGet.reduce((a, b) => a + b, 0)

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
      render: (value, record) => record.final_total - record.credit,
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
              window.location = `/admin/sale/${record.id}`
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

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <Title level={3}>ဘောင်ချာအရောင်း မှတ်တမ်းစာမျက်နှာ</Title>
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
            <Col span={5}>
              <Space direction="vertical" size={12}>
                <RangePicker
                  onChange={(val) => {
                    //alert(dayjs(val[0]).format("YYYY-MM-DD"))
                    window.location = `/admin/voucher-report?start_date=${dayjs(
                      val[0],
                    ).format('YYYY-MM-DD')}&end_date=${dayjs(val[1]).format(
                      'YYYY-MM-DD',
                    )}`
                  }}
                />
              </Space>
            </Col>
            <Col span={6}>
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                }}
                size="large"
              >
                {/* <Text type="secondary">ဝယ်သူအမည်ရွေးပါ</Text> */}
                <Select
                  showSearch
                  placeholder="ကျေးဇူးပြု၍ ဝယ်သူအမည်ရွေးပါ"
                  optionFilterProp="children"
                  onChange={onChange}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear={true}
                  size="large"
                  style={{ borderRadius: '10px' }}
                >
                  {unique.map((item) => (
                    <Option key={Math.random() * 100} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Space>
            </Col>
            <Col span={6}>
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
                  ပေးရန်ကျန်ငွေစုစုပေါင်း ={' '}
                  {showBuyMerchant != null ? finalCreditGet : finalCredit} Ks
                </Text>
              </Space>
            </Col>
            <Col span={2}></Col>
            <Col span={4}>
              <ExportToExcel apiData={result} fileName={fileName} />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col>
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                }}
                size="large"
              >
                {/* <Text type="secondary">ပစ္စည်းအမည်ရွေးပါ</Text> */}
                <Select
                  showSearch
                  placeholder="ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
                  optionFilterProp="children"
                  onChange={onChangeShop}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear={true}
                  size="large"
                  style={{ borderRadius: '10px' }}
                >
                  {shops.map((s) => (
                    <Option key={s.id} value={s.id}>
                      {s.name}
                    </Option>
                  ))}
                </Select>
              </Space>
            </Col>
            <Col>
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                }}
                size="large"
              >
                <Select
                  showSearch
                  placeholder="ကျေးဇူးပြု၍ ဝန်ထမ်းအမည်ရွေးပါ"
                  optionFilterProp="children"
                  onChange={onChangeStaff}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear={true}
                  size="large"
                  style={{ borderRadius: '10px' }}
                >
                  {staffs.map((s) => (
                    <Option key={s.id} value={s.id}>
                      {s.name}
                    </Option>
                  ))}
                </Select>
              </Space>
            </Col>
            <Col>
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
                  ဝယ်ယူသောပမာဏစုစုပေါင်း ={' '}
                  {showBuyMerchant != null ? finalAmountGet : finalTotal} Ks
                </Text>
              </Space>
            </Col>
            <Col>
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
                  ပေးချေခဲ့သောပမာဏစုစုပေါင်း ={' '}
                  {showBuyMerchant != null ? finalPaidGet : finalPaid} Ks
                </Text>
              </Space>
            </Col>
          </Row>

          {/* <Row>
          <Col span={5}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              block
            >
              SSort by ( ပမာဏ )
            </Button>
          </Col>
          <Col span={14}></Col>
          <Col span={5}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              block
            >
              ဝယ်ယူသူအမည်
            </Button>
            <Input.Group compact style={{ width: "100%" }}>
              <Select defaultValue="ဝယ်ယူသူအမည်">
                <Option value="Option1">ဝယ်ယူသူအမည်1</Option>
                <Option value="Option2">ဝယ်ယူသူအမည်2</Option>
              </Select>
            </Input.Group>
          </Col>
        </Row> */}

          <Table
            bordered
            columns={columns}
            pagination={{ defaultPageSize: 10 }}
            dataSource={
              showBuyMerchant != null ? showBuyMerchant : voucher?.vouchers
            }
          />
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  voucher: store.voucher,
})

export default connect(mapStateToProps, {
  getVouchers,
  deleteVouchers,
  getShops,
  getStaffs,
})(VoucherReports)
