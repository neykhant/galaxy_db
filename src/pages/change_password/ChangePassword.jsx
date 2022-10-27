import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  notification,
  message,
  Alert
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { connect, useDispatch, useSelector } from "react-redux";
import { clearAlertAccount, changePassword } from "../../store/actions";
import store from "../../store";

const { Title } = Typography;

const ChangePassword = ({ clearAlertAccount, changePassword }) => {
  const password = useSelector((state) => state.account);

  const [form] = Form.useForm();
  useEffect(() => {
    store.dispatch(clearAlertAccount());
  }, []);

  const onFinish = async (values) => {
    await changePassword(values);
    form.resetFields();
  };

  return (
    <Layout style={{ margin: "20px" }}>
      {password.error.length == 0 ? null : (
        <Alert
          message="Errors"
          description={password.error}
          type="error"
          showIcon
          closable
        />
      )}

      {password.isSuccess && (
        <Alert
          message="Successfully Changed Password"
          type="success"
          showIcon
        />
      )}

      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          စကားဝှက်ပြောင်းရန်စာမျက်နှာ
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
          <Form.Item
            name="current_password"
            label="လက်ရှိစကားဝှက်"
            rules={[
              {
                required: true,
                message: "လက်ရှိစကားဝှက်ထည့်ပါ"
              }
            ]}
          >
            <Input.Password
              placeholder="လက်ရှိစကားဝှက်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="new_password"
            label="အသစ်စကားဝှက်ထည့်ပါ"
            rules={[
              {
                required: true,
                message: "အသစ်စကားဝှက်ထည့်ပါ"
              }
            ]}
          >
            <Input.Password
              placeholder="အသစ်စကားဝှက်ထဲ့ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="new_password_confirmation"
            label="ထပ်မံရိုက်ထည့်ပါ"
            rules={[
              {
                required: true,
                message: "အသစ်စကားဝှက်ထပ်မံရိုက်ထည့်ပါ"
              }
            ]}
          >
            <Input.Password
              placeholder="ထပ်မံရိုက်ထည့်ပါ"
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

export default connect(null, { clearAlertAccount, changePassword })(
  ChangePassword
);
