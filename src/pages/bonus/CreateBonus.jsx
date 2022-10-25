import React, { useEffect, useState } from 'react'
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Row,
  Col,
  Select,
  Input,
  Spin,
  message,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { EditOutlined } from '@ant-design/icons'
import { connect, useSelector } from 'react-redux'
import { getStaff, saveBonus, getStaffs } from '../../store/actions'
import { successCreateMessage } from '../../uitls/messages'
import { call } from '../../services/api'

const { Option } = Select
const { Title } = Typography

const CreateBonus = ({ saveBonus, getStaffs }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const staffs = useSelector((state) => state.staff.staffs)
  const status = useSelector((state) => state.status)
  const errors = useSelector((state) => state.error)

  useEffect(() => {
    const fetchData = async () => {
      await getStaffs()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getStaffs])

  useEffect(() => {
    errors.message !== null && message.error(errors.message)

    return () => errors.message
  }, [errors.message])

  useEffect(() => {
    if (status.success) {
      form.resetFields()
      message.success(successCreateMessage)
    }

    return () => status.success
  }, [status.success])

  const onFinish = async (values) => {
    await saveBonus(values)
  }

  const handleGenerateSaleRate = async () => {
    const staff_id = form.getFieldValue('staff_id')

    if (staff_id === undefined) {
      message.error('ကျေးဇူးပြု၍ ဝန်ထမ်းအမည်ထည့်ပါ')
    } else {
      setLoading(true)
      try {
        const result = await call('get', `staff-sale-rate/${Number(staff_id)}`)

        form.setFieldsValue({ sale: result })
      } catch (e) {
        console.log(e)
      }

      setLoading(false)
    }
  }

  return (
    <Spin spinning={loading || status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: 'center' }} level={3}>
            ဘောနပ်စ်ပေးရန်စာမျက်နှာ
          </Title>
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
              name="staff_id"
              label="ဝန်ထမ်းအမည်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ဝန်ထမ်းအမည်ထည့်ပါ',
                },
              ]}
            >
              <Select
                name="name"
                showSearch
                placeholder="ကျေးဇူးပြု၍ ဝန်ထမ်းအမည်ထည့်ပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
              >
                {staffs.map((staff) => (
                  <Option key={staff.id} value={staff.id}>
                    {staff.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="month"
              label="လ"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ လထည့်ပါ',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="လထည့်ပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
              >
                <Option value="01">1</Option>
                <Option value="02">2</Option>
                <Option value="03">3</Option>
                <Option value="04">4</Option>
                <Option value="05">5</Option>
                <Option value="06">6</Option>
                <Option value="07">7</Option>
                <Option value="08">8</Option>
                <Option value="09">9</Option>
                <Option value="10">10</Option>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="year"
              label="ခုနှစ်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ခုနှစ်ထည့်ပါ',
                },
              ]}
            >
              <InputNumber
                placeholder="ခုနှစ်ထည့်ပါ  ဥပမာ(2022)"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
              />
            </Form.Item>
            <Button
              style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--white-color)',
                borderRadius: '5px',
                margin: '18px 18px 18px 50px',
              }}
              size="middle"
              onClick={handleGenerateSaleRate}
            >
              ရောင်းအားဖန်တီးမည်
            </Button>
            <Form.Item
              name="sale"
              label="ရောင်းအား"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ရောင်းအားပမာဏထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="ရောင်းအားပမာဏထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
                disabled={true}
              />
            </Form.Item>
            <Form.Item
              name="commission"
              label="ကော်မရှင်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ကော်မရှင်ထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="ကော်မရှင်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="bonus"
              label="ဘောနပ်စ်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ဘောနပ်စ်ထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="ဘောနပ်စ်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="food_expense"
              label="စားစရိတ်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍  စားစရိတ်ထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="စားစရိတ်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="travel_expense"
              label="သွားလာစရိတ်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍  သွားလာစရိတ်ထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="သွားလာစရိတ်ထည့်ပါ"
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
                သိမ်းမည်
              </Button>
            </Form.Item>
          </Form>
          <Row>
            <Col span={24}>
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  justifyContent: 'right',
                  marginBottom: '10px',
                }}
                size="large"
              ></Space>
            </Col>
          </Row>
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  purchase: store.purchase,
})

export default connect(mapStateToProps, {
  getStaff,
  saveBonus,
  getStaffs,
})(CreateBonus)
