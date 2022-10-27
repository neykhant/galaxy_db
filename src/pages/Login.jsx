import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Typography, Space, Button, Alert } from "antd";
import Layout from "antd/lib/layout/layout";
import { connect, useSelector } from "react-redux";
import { authUser } from "../store/actions";
const { Title } = Typography;

const Login = ({ auth, authUser }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const error = useSelector((state) => state.error);
  // const stautss = useSelector((state) => state.status);

  const onFinish = async (values) => {
    setLoading(true);
    await authUser("io-login", values);
    setLoading(false);
    if (auth.isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  };

  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh"
      }}
    >
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }}>Galaxy Liquor Shop</Title>

        {error.message !== null && (
          <Alert message={error.message} type="error" />
        )}

        <Form onFinish={onFinish} form={form} className="login-form">
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please insert your phone!"
              }
            ]}
          >
            <Input
              name="phone"
              placeholder="Enter your phone!"
              size="large"
              style={{ borderRadius: "10px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Input.Password
              name="password"
              placeholder="Enter your password!"
              size="large"
              style={{ borderRadius: "10px" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={loading}
              htmlType="submit"
              size="large"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "10px",
                width: "100%"
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Layout>
  );
};
const mapStateToProps = (store) => ({
  auth: store.auth
});
export default connect(mapStateToProps, { authUser })(Login);
