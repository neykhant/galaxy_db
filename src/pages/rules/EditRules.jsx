import React, { useEffect } from 'react'
import { Form, Input, Typography, Space, Button, message, Spin } from 'antd'
import Layout from 'antd/lib/layout/layout'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { successEditMessage } from '../../uitls/messages'
import { getRule, editRule } from '../../store/actions'
import { useParams } from 'react-router-dom'

const { Title } = Typography

const EditRules = ({ status, error, rule, getRule, editRule }) => {
  const param = useParams()
  const [form] = Form.useForm()

  useEffect(() => {
    getRule(param.id)
  }, [getRule, param.id])

  useEffect(() => {
    error.message !== null && message.error(error.message)

    return () => error.message
  }, [error.message])

  useEffect(() => {
    if (status.success) {
      message.success(successEditMessage)
    }

    return () => status.success
  }, [form, status.success])

  useEffect(() => {
    form.setFieldsValue({ name: rule.rule.name })
    form.setFieldsValue({ price: rule.rule.price })
  }, [form, rule.rule])

  const onFinish = async (values) => {
    await editRule(param.id, values)
  }

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: 'center' }} level={3}>
            စည်းကမ်း ပြင်ဆင်ခြင်း စာမျက်နှာ
          </Title>
          <Form
            labelCol={{
              xl: {
                span: 3,
              },
            }}
            wrapperCol={{
              xl: {
                span: 24,
              },
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="name"
              label="စည်းကမ်းအမည်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ စည်းကမ်းအမည်ထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="စည်းကမ်းအမည်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px' }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="စျေးနှုန်း"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ စျေးနှုန်းထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="စျေးနှုန်းထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px' }}
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

const mapStateToProps = (store) => ({
  status: store.status,
  error: store.error,
  rule: store.rule,
})

export default connect(mapStateToProps, { getRule, editRule })(EditRules)
