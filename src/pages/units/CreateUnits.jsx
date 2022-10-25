import React, { useEffect } from 'react'
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  notification,
  message,
  Spin,
  InputNumber,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { createUnit } from '../../store/actions'
import { connect, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { successCreateMessage } from '../../uitls/messages'

const { Title } = Typography

const CreateUnits = ({ createUnit }) => {
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)

  const [form] = Form.useForm()
  const navigate = useNavigate()

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

  const onFinish = async (values) => {
    await createUnit(values)
    form.resetFields()
    navigate('/admin/show-units')
  }

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: 'center' }} level={3}>
          ယူနစ်သွင်းခြင်း စာမျက်နှာ
          </Title>
          <Form
            colon={false}
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
              label="ယူနစ်အမည်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ယူနစ်အမည်ထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="ယူနစ်အမည်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px' }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="quantity"
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
    </Spin>
  )
}

export default connect(null, { createUnit })(CreateUnits)
