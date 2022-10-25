import React, { useState } from "react";
import { Form, Input, Typography, Space, Button, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { connect, useSelector, useDispatch } from "react-redux";
import { saveSuppliers } from "../../store/actions";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const CreateSupplier = () => {
  const suppliers = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [phone, setPhone] = useState("");
  const [other, setOther] = useState("");

  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
    const data = {
      id: suppliers[suppliers.length - 1].id + 1,
      ...values,
    };
    dispatch({ type: "ADD_SUPPLIERS", payload: data });
    form.resetFields();
    navigate('/admin/show-supplier')
  };

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          Supplier အချက်အလက်များသွင်းရန်စာမျက်နှာ
        </Title>
        <Form
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
            name="code"
            
            label="ကုတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကုတ်ထည့်ပါ",
              },
            ]}
          >
            <Input
              placeholder="ကုတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="name"
            
            label="အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အမည်ထည့်ပါ",
              },
            ]}
          >
            <Input
              placeholder="အမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="company_name"
            label="ကုမ္ပဏီအမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကုမ္ပဏီအမည်ထည့်ပါ",
              },
            ]}
          >
            <Input
              placeholder="ကုမ္ပဏီအမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            
            label="ဖုန်းနံပါတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဖုန်းနံပါတ်ထည့်ပါ",
              },
            ]}
          >
            <Input
              placeholder="ဖုန်းနံပါတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="other"
            
            label="အခြား"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အခြားထည့်ပါ",
              },
            ]}
          >
            <Input
              placeholder="အခြား"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "10px",
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
  );
};

export default connect(null, { saveSuppliers })(CreateSupplier);
