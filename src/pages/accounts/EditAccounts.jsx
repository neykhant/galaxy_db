import React, { useEffect } from 'react'
import { Form, Input, Typography, Space, Button, Select, message } from 'antd'
import Layout from 'antd/lib/layout/layout'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { getAccount, getShops, editAccounts } from '../../store/actions'
import { connect, useSelector } from 'react-redux'
import { successEditMessage } from '../../uitls/messages'

const { Title } = Typography
const { Option } = Select

const EditAccounts = ({ getShops, getAccount, editAccounts }) => {
  const [form] = Form.useForm()
  const param = useParams()
  const navigate = useNavigate()
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const account = useSelector((state) => state.account.account)
  const shops = useSelector((state) => state.shop.shops)

  useEffect(() => {
    const fetchData = async () => {
      await getAccount(param?.id)
      await getShops()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getAccount, getShops])

  useEffect(() => {
    form.setFieldsValue({ name: account.name })
    form.setFieldsValue({ position: account.position })
    form.setFieldsValue({ shop_id: account.shop?.id })
  }, [account])

  useEffect(() => {
    errors.message !== null && message.error(errors.message)
    return () => errors.message
  }, [errors.message])

  useEffect(() => {
    if (status.success) {
      message.success(successEditMessage)
    }
    return () => status.success
  }, [status.success])

  const onFinish = async (values) => {
    await editAccounts(param?.id, values)
    navigate('/admin/show-accounts')
  }

  return (
    <Layout style={{ margin: '20px' }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: 'center' }} level={3}>
          အကောင့် ဖွင့်ပြင်ခြင်း စာမျက်နှာ
        </Title>
        <Form
          labelCol={{
            span: 3,
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
            name="name"
            label="အမည်"
            rules={[
              {
                required: true,
                message: 'ကျေးဇူးပြု၍ အမည်ထည့်ပါ',
              },
            ]}
          >
            <Input
              placeholder="အမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: '10px' }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="position"
            label="ရာထူး"
            rules={[
              {
                required: true,
                message: 'ကျေးဇူးပြု၍ ရာထူးရွေးပါ',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ရာထူးရွေးပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: '10px' }}
            >
              <Option value="manager">Manager</Option>
              <Option value="staff">Staff</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="shop_id"
            label="ဆိုင်"
            rules={[
              {
                required: true,
                message: 'ကျေးဇူးပြု၍ ဆိုင်ရွေးပါ',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: '10px' }}
            >
              {shops.map((shop) => (
                <Option value={shop.id} key={shop.id}>
                  {shop.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--white-color)',
                borderRadius: '10px',
              }}
              size="large"
              htmlType="submit"
            >
              <SaveOutlined />
              သိမ်းမည်
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Layout>
  )
}

export default connect(null, { getAccount, getShops, editAccounts })(
  EditAccounts,
)
