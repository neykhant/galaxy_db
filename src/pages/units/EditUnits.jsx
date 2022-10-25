import React, { useEffect } from 'react'
import { Form, Input, Typography, Space, Button, message, Spin, InputNumber, } from 'antd'
import Layout from 'antd/lib/layout/layout'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { editUnit, getUnit } from '../../store/actions'
import { connect, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { successEditMessage } from '../../uitls/messages'

const { Title } = Typography

const EditUnits = ({ editUnit, getUnit }) => {
  const param = useParams()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)
  const unit = useSelector((state) => state.unit.unit)

  useEffect(() => {
    const fetchData = async () => {
      await getUnit(param?.id)
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getUnit])

  useEffect(() => {
    form.setFieldsValue({ name: unit.name })
    form.setFieldsValue({ quantity: unit.quantity })
  }, [unit])

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
    await editUnit(param?.id, values)
    navigate('/admin/show-units')
  }

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: 'center' }} level={3}>
          ယူနစ် ပြုပြင်ရန်စာမျက်နှာ
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

export default connect(null, { editUnit, getUnit })(EditUnits)
