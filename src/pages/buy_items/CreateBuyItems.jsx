import React, { useState } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Table,
  InputNumber,
  message,
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const CreateBuyItems = () => {
  const [items, setItems] = useState([]);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setItems([...items, { ...values, key: items.length + 1 }]);
    form.resetFields();
  };

  const handleDelete = (record) => {
    const filterItems = items.filter((item) => item !== record);
    setItems(filterItems);
  };

  const handleSave = async () => {
    if (items.length === 0) {
      message.error("ကျေးဇူးပြု၍ ဝယ်ရန်ပစ္စည်းများထည့်ပါ");
    } else {
      console.log(items);
      setItems([]);
    }
  };

  const columns = [
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "item_code",
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item_name",
    },
    {
      title: "ပစ္စည်းဆိုဒ်",
      dataIndex: "item_size",
    },
    {
      title: "ကာလာ",
      dataIndex: "item_color",
    },
    {
      title: "ဝယ်ဈေး",
      dataIndex: "buy_price",
    },
    {
      title: "ရောင်းဈေး",
      dataIndex: "sale_price",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ပစ္စည်းအချက်အလက်သွင်းရန်စာမျက်နှာ
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
            name="item_code"
            label="ပစ္စည်းကုတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်းကုတ်ထည့်ပါ",
              },
            ]}
          >
            <Input
              placeholder="ပစ္စည်းကုတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="item_name"
            label="ပစ္စည်းအမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ",
              },
            ]}
          >
            <Input
              placeholder="ပစ္စည်းအမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="item_size"
            label="ပစ္စည်းဆိုဒ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်းဆိုဒ်ထည့်ပါ",
              },
            ]}
          >
            <Input
              placeholder="ပစ္စည်းဆိုဒ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="item_color"
            label="ကာလာ"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကာလာထည့်ပါ",
              },
            ]}
          >
            <Input
              placeholder="ကာလာထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="buy_price"
            label="ဝယ်ဈေး"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဝယ်ဈေးထည့်ပါ",
              },
            ]}
          >
            <InputNumber
              placeholder="ဝယ်ဈေးထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="sale_price"
            label="ရောင်းဈေး"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ရောင်းဈေးထည့်ပါ",
              },
            ]}
          >
            <InputNumber
              placeholder="ရောင်းဈေးထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "10px",
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
          dataSource={items}
          pagination={{ position: ["none", "none"] }}
        />
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "right" }}
        >
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)",
              borderRadius: "10px",
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
  );
};

export default CreateBuyItems;
