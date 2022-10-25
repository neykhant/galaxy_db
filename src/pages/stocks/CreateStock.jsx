import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Table,
  InputNumber,
  message,
  notification
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import InputUpload from "../../components/InputUpload";
import { connect, useSelector } from "react-redux";
import { saveItems } from "../../store/actions";
import { successCreateMessage } from "../../uitls/messages";

const { Title, Text } = Typography;

const CreateItems = ({ saveItems }) => {
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);

  const [items, setItems] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    errors.message !== null && message.error(errors.message);
    return () => errors.message;
  }, [errors.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successCreateMessage);
    }
    return () => status.success;
  }, [status.success]);


  const onFinish = (values) => {
    if (fileList.length === 0) {
      message.error("ကျေးဇူးပြု၍ပစ္စည်းပုံထည့်ပါ");
    }

    if (fileList.length > 0) {
      setItems([
        ...items,
        { ...values, image: fileList[0], key: items.length + 1 }
      ]);
      setFileList([]);
      form.resetFields();
    }
  };

  const handleDelete = (record) => {
    const filterItems = items.filter((item) => item !== record);
    setItems(filterItems);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Saved Your Data",
      description: "Your data have been saved.",
      duration: 3
    });
  };

  const handleSave = async () => {
    if (items.length === 0) {
      message.error("ကျေးဇူးပြု၍ပစ္စည်းများထည့်ပါ");
    } else {
      await saveItems(items);
      setItems([]);
    }
  };

  const columns = [
    {
      title: "ပစ္စည်းပုံ",
      dataIndex: "image_url",
      render: (_, record) => (
        <img
          src={record.image.thumbUrl}
          alt="ပစ္စည်းပုံ"
          width={100}
          height={100}
        />
      )
    },
    {
      title: "ပစ္စည်းကုတ်/အမည်",
      dataIndex: "item_code_name"
    },
    {
      title: "အရေအတွက်",
      dataIndex: "item_number"
    },
    {
      title: "ဝယ်ဈေး",
      dataIndex: "buy_price"
    },
    {
      title: "ရောင်းဈေး",
      dataIndex: "sale_price"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ပစ္စည်းအဝယ်သွင်းရန်စာမျက်နှာ
        </Title>
        <Form
          colon={false}
          labelCol={{
            xl: {
              span: 3
            }
          }}
          wrapperCol={{
            span: 24
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          form={form}
        >
          <Space
            direction="vertical"
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: "10px"
            }}
          >
            <InputUpload fileList={fileList} setFileList={setFileList} />
            <Text type="secondary">ကျေးဇူးပြု၍ပစ္စည်းပုံထည့်ပါ</Text>
          </Space>
          <Form.Item
            name="item_code_name"
            label="ပစ္စည်းကုတ်/အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်းကုတ်/အမည်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ပစ္စည်းကုတ်/အမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="item_number"
            label="အရေအတွက်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အရေအတွက်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="အရေအတွက်ထည့်ပါ"
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
                message: "ကျေးဇူးပြု၍ ဝယ်ဈေးထည့်ပါ"
              }
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
                message: "ကျေးဇူးပြု၍ ရောင်းဈေးထည့်ပါ"
              }
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
                borderRadius: "10px"
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
              borderRadius: "10px"
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

export default connect(null, { saveItems })(CreateItems);
