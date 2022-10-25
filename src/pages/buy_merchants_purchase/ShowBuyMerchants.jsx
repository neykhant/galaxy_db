import React, { useState, useEffect } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  Select,
  Spin,
  message,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import {
  PlusSquareOutlined,
  DeleteOutlined,
  ReadOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import {
  getMerchants,
  getPurchases,
  deletePurchases,
  getPurchase,
} from '../../store/actions'
import { getReadableDateDisplay } from '../../uitls/convertToHumanReadableTime'
import { ExportToExcel } from '../../excel/ExportToExcel'
import { successDeleteMessage } from '../../uitls/messages'

const { Title, Text } = Typography
const { Option } = Select

const ShowBuyMerchants = ({
  merchant,
  getMerchants,
  getPurchases,
  deletePurchases,
  getPurchase,
}) => {
  const navigate = useNavigate()
  const allPurchases = useSelector((state) => state.purchase.purchases)
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const user = useSelector((state) => state.auth.user)

  const fileName = 'Purchases' // here enter filename for your excel file
  const result = allPurchases.map((purchase) => ({
    Date: purchase.date,
    Company_Name: purchase.merchant.company_name,
    Whole_Total: purchase.whole_total,
    Credit: purchase.credit,
    Paid: purchase.paid,
  }))

  const [myPurchase, setMyPurchase] = useState([])
  useEffect(() => {
    setMyPurchase([...myPurchase, ...allPurchases])
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await getMerchants()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getMerchants])

  useEffect(() => {
    const fetchData = async () => {
      await getPurchases()
    }
    fetchData()

    return () => {
      fetchData()
    }
  }, [getPurchases])

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

  const [showBuyMerchant, setshowBuyMerchant] = useState(null)
  const onChange = (value) => {
    if (value === undefined) {
      setshowBuyMerchant(allPurchases)
    } else {
      const filterBuyMerchant = allPurchases.filter(
        (mer) => mer.merchant.id === value,
      )
      setshowBuyMerchant(filterBuyMerchant)
    }
  }

  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Deleted Your Data",
  //     description: "Your data have been deleted.",
  //     duration: 3
  //   });
  // };

  let allCredit = []
  allPurchases.forEach((purchase) => allCredit.push(parseInt(purchase.credit)))
  const finalCredit = allCredit.reduce((a, b) => a + b, 0)

  let allCreditGet = []
  showBuyMerchant?.forEach((mr) => allCreditGet.push(parseInt(mr.credit)))
  const finalCreditGet = allCreditGet.reduce((a, b) => a + b, 0)

  const handleDelete = async (record) => {
    const filterMyPurchase = myPurchase.filter(
      (purchase) => purchase.id !== record.id,
    )
    setMyPurchase(filterMyPurchase)
    await deletePurchases(record.id)
    // openNotificationWithIcon("error");
  }

  const handleClick = async (record) => {
    await getPurchase(record.id)
    navigate(`/admin/edit-buy-merchants/${record.id}`)
  }

  const handleDetail = async (record) => {
    // await getPurchase(record.id);
    navigate(`/admin/show-purchase/${record.id}`)
  }

  const handleDetailShow = (record) => {
    navigate(`/admin/detail-buy-merchants/${record.id}`)
  }

  const columns = [
    {
      title: 'ရက်စွဲ',
      dataIndex: `created_at`,
      render: (_, record) => getReadableDateDisplay(record.created_at),
    },
    {
      title: 'ကုန်သည်လုပ်ငန်းအမည်',
      dataIndex: 'company_name',
      render: (_, record) =>
        showBuyMerchant === null
          ? record?.merchant?.company_name
          : record?.merchant?.company_name,
    },
    {
      title: 'ကနဦးပေးချေခဲ့သည့်ပမာဏ',
      dataIndex: 'paid',
    },
    {
      title: 'ပေးရန်ကျန်ငွေ',
      dataIndex: 'credit',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
          <Button
            style={{ background: '#5b8c00', borderColor: 'yellow' }}
            type="primary"
            danger
            onClick={() => handleDetailShow(record)}
          >
            <ReadOutlined />
          </Button>
          {record.credit != 0 ? (
            <Button
              type="primary"
              style={{ backgroundColor: '#ad6800' }}
              danger
              onClick={() => handleDetail(record)}
            >
              အကြွေးပေးရန်
            </Button>
          ) : null}
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
              <Title level={3}>အဝယ်စာရင်း</Title>
            </Col>
            <Col span={4}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                size="middle"
                onClick={() => navigate('/admin/create-buy-merchants')}
              >
                <PlusSquareOutlined />
                အသစ်ထည့်မည်
              </Button>
            </Col>
            <Col span={4}>
              <ExportToExcel apiData={result} fileName={fileName} />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={15}>
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                }}
                size="large"
              >
                <Text type="secondary">ကုန်သည်လုပ်ငန်းအမည်ရွေးပါ</Text>
                <Select
                  showSearch
                  placeholder="ကျေးဇူးပြု၍ ကုန်သည်လုပ်ငန်းအမည်ရွေးပါ"
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
                  {merchant.merchants.map((mer) => (
                    <Option key={mer.id} value={mer.id}>
                      {mer.name}
                    </Option>
                  ))}
                </Select>
              </Space>
            </Col>

            <Col span={9}>
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
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={
              showBuyMerchant != null ? showBuyMerchant : allPurchases
            }
            pagination={{ defaultPageSize: 10 }}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  merchant: store.merchant,
  purchase: store.purchase,
})

export default connect(mapStateToProps, {
  getMerchants,
  getPurchases,
  deletePurchases,
  getPurchase,
})(ShowBuyMerchants)
