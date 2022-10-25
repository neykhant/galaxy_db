import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Table,
  message,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import InputUpload from "../../components/InputUpload";
import { connect, useSelector } from "react-redux";
import { saveItems, clearAlertItems } from "../../store/actions";
import { successCreateMessage } from "../../uitls/messages";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CreateItems = ({ saveItems }) => {
  const errors = useSelector((state) => state.error);
  const stautss = useSelector((state) => state.status);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    errors.message !== null && message.error(errors.message);
    return () => errors.message;
  }, [errors.message]);

  useEffect(() => {
    if (stautss.success) {
      setItems([]);
      message.success(successCreateMessage);
    }
    return () => stautss.success;
  }, [stautss.success]);

  const onFinish = (values) => {
    if (fileList.length === 0) {
      message.error("ကျေးဇူးပြု၍ပစ္စည်းပုံထည့်ပါ");
    }
    if (fileList.length > 0) {
      setItems([
        ...items,
        {
          ...values,
          image: fileList[0],
          key: Math.random() * 100
        }
      ]);
      setFileList([]);
      form.resetFields();
    }
  };

  const handleDelete = (record) => {
    const filterItems = items.filter((item) => item !== record);
    setItems(filterItems);
  };

  const handleSave = async () => {
    if (items.length === 0) {
      message.error("ကျေးဇူးပြု၍ပစ္စည်းများထည့်ပါ");
    } else {
      const formData = new FormData();
      items.forEach((item, index) => {
        formData.append(`items[${index}][code]`, item.code);
        formData.append(`items[${index}][name]`, item.name);
        formData.append(`items[${index}][buy_price]`, item.buy_price);
        formData.append(`items[${index}][sale_price]`, item.sale_price);
        formData.append(`images[${index}]`, item.image.originFileObj);
        formData.append(`images[${index}][key]`, item.key);
      });
      await saveItems(formData);
      // setItems([]);
      // navigate("/admin/show-items");
    }
  };

  //for barcode
  const [barcodeInputValue, updateBarcodeInputValue] = useState("");
  const onChangeBarcode = (event) => {
    updateBarcodeInputValue(event.target.value);
  };

  const columns = [
    {
      title: "ပစ္စည်းပုံ",
      dataIndex: "image_url",
      render: (_, record) => (
        <img
          src={record?.image?.thumbUrl}
          alt="ပစ္စည်းပုံ"
          width={80}
          height={80}
        />
      )
    },
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "code"
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "name"
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
          <DeleteOutlined />
        </Button>
      )
    }
  ];

  return (
    <Spin spinning={stautss.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: "center" }} level={3}>
            ပစ္စည်းအချက်အလက်သွင်းရန်စာမျက်နှာ
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
              <InputUpload
                name="image"
                fileList={fileList}
                setFileList={setFileList}
              />
              <Text type="secondary">ကျေးဇူးပြု၍ပစ္စည်းပုံထည့်ပါ</Text>
            </Space>

            <Form.Item
              name="code"
              label="ပစ္စည်းကုတ်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ပစ္စည်းကုတ်ထည့်ပါ"
                }
              ]}
              labelwidth={100}
            >
              <Input
                id="SearchbyScanning"
                className="SearchInput"
                value={barcodeInputValue}
                onChange={onChangeBarcode}
                placeholder="ပစ္စည်းကုတ်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px" }}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="name"
              label="ပစ္စည်းအမည်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ"
                }
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
              name="buy_price"
              label="ဝယ်ဈေး"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ဝယ်ဈေးထည့်ပါ"
                }
              ]}
            >
              <Input
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
              <Input
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
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  error: store.error
});

export default connect(mapStateToProps, { saveItems, clearAlertItems })(
  CreateItems
);
