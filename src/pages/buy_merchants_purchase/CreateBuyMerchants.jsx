import React, { useEffect, useState } from 'react'
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Select,
  Table,
  Row,
  Col,
  message,
  Spin,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'
import { connect, useSelector } from 'react-redux'
import {
  getMerchants,
  getItems,
  savePurchases,
  getUnits,
} from '../../store/actions'
import { useNavigate } from 'react-router-dom'
import dateFormat from 'dateformat'
import { successCreateMessage } from '../../uitls/messages'

const { Title, Text } = Typography
const { Option } = Select

const CreateBuyMerchants = ({
  item,
  merchant,
  unit,
  getMerchants,
  getItems,
  savePurchases,
  getUnits,
}) => {
  const [buys, setBuys] = useState([])
  const [credit, setCredit] = useState(0)
  const [paid, setPaid] = useState(null)
  const [buyMerchant, setBuyMerchant] = useState(null)
  const allItems = item.items
  const allUnits = unit.units
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)

  const navigate = useNavigate()
  const [form] = Form.useForm()
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
      await getItems()
      await getUnits()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getItems, getUnits])

  useEffect(() => {
    errors.message !== null && message.error(errors.message)
    return () => errors.message
  }, [errors.message])

  useEffect(() => {
    if (status.success) {
      message.success(successCreateMessage)
    }
    return () => status.success
  }, [status.success])

  const now = new Date()
  const date = dateFormat(now, 'yyyy-mm-dd')

  const onFinish = (values) => {
    const existBuy = buys.findIndex((buy) => buy.item_id === values.item_id)

    if (existBuy === -1) {
      const findItem = allItems.find((item) => item.id === values.item_id)
      const findUnit = allUnits.find((unit) => unit.id === values.unit_id)

      setBuys([
        ...buys,
        {
          ...values,
          item_name: findItem.name,
          unit: `${findUnit.name}(${findUnit.quantity})`,
          unit_name: findUnit.name,
          unit_org_quantity: findUnit.quantity,
          quantity: values.unit_quantity * findUnit.quantity,
          subtotal: values.unit_quantity * values.price,
          key: buys.length + 1,
        },
      ])
      form.resetFields()
    } else {
      message.warning('ထည့်ထားပြီးသော ပစ္စည်းဖြစ်နေပါသည်။')
    }
  }

  const result =
    buys.length > 0
      ? buys.map((buy) => buy.subtotal).reduce((a, b) => a + b)
      : 0

  const onChange = (value) => {
    if (value === undefined) {
      setBuyMerchant(null)
    } else {
      const filterBuyMerchant = merchant.merchants.find(
        (mer) => mer.id === value,
      )
      setBuyMerchant(filterBuyMerchant)
    }
  }

  const handleDelete = (record) => {
    const filterBuys = buys.filter((buy) => buy !== record)
    const transformBuys = filterBuys.map((buy, index) => {
      return {
        ...buy,
        key: index + 1,
      }
    })
    setBuys(transformBuys)
    setCredit(0)
  }

  const handleSave = async () => {
    if (buyMerchant === null) {
      message.error('ကျေးဇူးပြု၍ ကုန်သည်အချက်အလက်ထည့်ပါ')
    } else if (buys.length === 0) {
      message.error('ကျေးဇူးပြု၍ ဝယ်ရန်ထည့်ပါ')
    } else if (paid === null) {
      message.error('ကျေးဇူးပြု၍ ပေးငွေထည့်ပါ')
    } else {
      const purchase_items = buys.map((buy) => {
        return {
          item_id: buy.item_id,
          unit_name: buy.unit_name,
          unit_org_quantity: buy.unit_org_quantity,
          unit_quantity: buy.unit_quantity,
          quantity: buy.quantity,
          price: buy.price,
          subtotal: buy.subtotal,
        }
      })

      const saveBuy = {
        purchase_items: purchase_items,
        merchant_id: buyMerchant.id,
        paid: paid,
        credit: credit,
        whole_total: result,
        date: date,
      }
      await savePurchases(saveBuy)
      navigate('/admin/show-buy-merchants')
    }
  }

  const handlePayment = (value) => {
    setCredit(result - value)
    setPaid(value)
  }

  const columns = [
    {
      title: 'ပစ္စည်းအမည်',
      dataIndex: 'item_name',
    },
    {
      title: 'ယူနစ်',
      dataIndex: 'unit',
    },
    {
      title: 'ယူနစ် အရေအတွက်',
      dataIndex: 'unit_quantity',
    },
    {
      title: 'တစ်ခုချင်း အရေအတွက်',
      dataIndex: 'quantity',
    },
    {
      title: 'တစ်ခုဈေးနှုန်း',
      dataIndex: 'price',
      render: (_, record) => (record.subtotal / record.quantity).toFixed(2),
    },
    {
      title: 'စုစုပေါင်းစျေးနှုန်း',
      dataIndex: 'price',
    },
    {
      title: 'စုစုပေါင်းပမာဏ',
      dataIndex: 'subtotal',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ]

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: 'center' }} level={3}>
            အဝယ်စာရင်းသွင်းရန်
          </Title>
          <Space
            direction="horizontal"
            style={{
              width: '100%',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
            size="large"
          >
            <Text type="secondary">ကုန်သည်အမည်ရွေးပါ</Text>
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ကုန်သည်အမည်ရွေးပါ"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
          <Space
            direction="horizontal"
            style={{ width: '100%', justifyContent: 'center' }}
            size="large"
          >
            <Title level={4}>ကုန်သည်လုပ်ငန်းအမည် - </Title>
            <Title level={4}>
              {buyMerchant === null ? '-' : buyMerchant.company_name}
            </Title>
          </Space>
          <Form
            colon={false}
            labelCol={{
              xl: {
                span: 3,
              },
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="item_id"
              label="ပစ္စည်း"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
              >
                {allItems.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="unit_id"
              label="ယူနစ်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ယူနစ် ထည့်ပါ',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ယူနစ် ထည့်ပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
              >
                {allUnits.map((unit) => (
                  <Option key={unit.id} value={unit.id}>
                    {`${unit.name}(${unit.quantity})`}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="unit_quantity"
              label="အရေအတွက်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ အရေအတွက်ထည့်ပါ',
                },
              ]}
            >
              <InputNumber
                placeholder="အရေအတွက်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="တစ်ခုဈေးနှုန်း"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ တစ်ခုဈေးနှုန်းထည့်ပါ',
                },
              ]}
            >
              <InputNumber
                placeholder="တစ်ခုဈေးနှုန်းထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
              />
            </Form.Item>

            <Form.Item style={{ textAlign: 'right' }}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '10px',
                }}
                size="large"
                htmlType="submit"
              >
                <PlusSquareOutlined />
                အသစ်ထည့်မည်
              </Button>
            </Form.Item>
          </Form>
          <Table
            bordered
            columns={columns}
            dataSource={buys}
            pagination={{ position: ['none', 'none'] }}
          />
          <Row>
            <Col span={17} style={{ textAlign: 'right' }}>
              <Title level={4}>စုစုပေါင်း</Title>
            </Col>
            <Col span={2}></Col>
            <Col span={5}>
              <Title level={4}>{result} Ks</Title>
            </Col>
          </Row>
          <Row>
            <Col span={17} style={{ textAlign: 'right' }}>
              <Title level={4}>ပေးငွေ</Title>
            </Col>
            <Col span={2}></Col>
            <Col span={5}>
              <InputNumber
                placeholder="ပေးငွေ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
                onChange={(value) => handlePayment(value)}
              />
            </Col>
          </Row>
          <Row>
            <Col span={17} style={{ textAlign: 'right' }}>
              <Title level={4}>ပေးရန်ကျန်ငွေ</Title>
            </Col>
            <Col span={2}></Col>
            <Col span={5}>
              <Title level={4}>{credit} Ks</Title>
            </Col>
          </Row>
          <Space
            direction="horizontal"
            style={{ width: '100%', justifyContent: 'right' }}
          >
            <Button
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--white-color)',
                borderRadius: '10px',
              }}
              size="large"
              onClick={handleSave}
            >
              <SaveOutlined />
              သိမ်းမည်
            </Button>
          </Space>
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  merchant: store.merchant,
  item: store.item,
  unit: store.unit,
})

export default connect(mapStateToProps, {
  getMerchants,
  getItems,
  savePurchases,
  getUnits,
})(CreateBuyMerchants)
