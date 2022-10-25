import React, { useState, useEffect } from "react";
import { Form, Input, Typography, Space, Button, Spin, message } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import InputUpload from "../../components/InputUpload";
import { connect, useSelector } from "react-redux";
import { editItems, getItem } from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import { successEditMessage } from "../../uitls/messages";

const { Title, Text } = Typography;

const EditItems = ({ editItems, getItem }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const param = useParams();
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);
  const item = useSelector((state) => state.item.item);

  useEffect(() => {
    const fetchData = async () => {
      await getItem(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getItem]);

  useEffect(() => {
    form.setFieldsValue({ code: item?.code });
    form.setFieldsValue({ name: item?.name });
    form.setFieldsValue({ buy_price: item?.buy_price });
    form.setFieldsValue({ sale_price: item?.sale_price });
    setFileList([
      {
        uid: item?.uid,
        name: item?.name,
        status: "done",
        url: item?.image
      }
    ]);
  }, [item]);

  
  useEffect(() => {
    errors.message !== null && message.error(errors.message);

    return () => errors.message;
  }, [errors.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successEditMessage);
    }

    return () => status.success;
  }, [status.success]);


  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("code", values.code);
    formData.append("name", values.name);
    formData.append("buy_price", values.buy_price);
    formData.append("sale_price", values.sale_price);
    if (fileList[0].status !== "done") {
      formData.append("image", fileList[0].originFileObj);
    }
    await editItems(param?.id, formData);
    // form.resetFields();
    // setFileList([]);
    navigate("/admin/show-items");
  };

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: "center" }} level={3}>
            ပစ္စည်းအချက်အလက်ပြုပြင်ရန်စာမျက်နှာ
          </Title>
          <Form
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
                src={fileList}
                fileList={fileList}
                setFileList={setFileList}
              />
              <Text type="secondary">ကျေးဇူးပြု၍ပစ္စည်းပုံထည့်ပါ</Text>
              {/* <Image
              width={200}
              src={fileList}
            /> */}
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
            >
              <Input
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
                  backgroundColor: "var(--primary-color)",
                  color: "var(--white-color)",
                  borderRadius: "10px"
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
  );
};

export default connect(null, { editItems, getItem })(EditItems);
