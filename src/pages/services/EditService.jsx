import React, { useState, useEffect } from "react";
import { Form, Input, Typography, Space, Button } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { editServices, getService } from "../../store/actions";
const { Title } = Typography;

const EditService = ({ editServices, getService }) => {
  const param = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const service = useSelector((state) => state.service.service);

  useEffect(() => {
    const fetchData = async () => {
      await getService(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getService]);

  
  useEffect(() => {
    form.setFieldsValue({ code: service?.code });
    form.setFieldsValue({ commercial: service?.commercial });
    form.setFieldsValue({ percentage: service?.percentage });
    form.setFieldsValue({ price: service?.price });
    form.setFieldsValue({ category: service?.category });
  }, [service]);

  const onFinish = async (values) => {
    await editServices(param?.id, values);
    navigate("/admin/show-service");
  };

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ဝန်ဆောင်မှုအချက်အလက်ပြုပြင်ရန်စာမျက်နှာ
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
          ></Space>
          <Form.Item
            name="code"
            label="ကုတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကုတ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ကုတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="အမျိုးအစား"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အမျိုးအစားထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="အမျိုးအစားထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="ကျသင့်ငွေ"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကျသင့်ငွေထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ကျသင့်ငွေထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="percentage"
            label="ရာခိုင်နှုန်း"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ရာခိုင်နှုန်းထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ရာခိုင်နှုန်းထည့်ပါ"
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
  );
};

export default connect(null, { editServices, getService })(EditService);
