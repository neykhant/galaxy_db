import React, { useEffect } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Alert,
  message,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editShops, getShop, clearAlert } from "../../store/actions";
import store from "../../store";
import { connect } from "react-redux";
import { successEditMessage } from "../../uitls/messages";

const { Title } = Typography;
const EditShops = ({ editShops, getShop, clearAlert }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const param = useParams();
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);
  const shop = useSelector((state) => state.shop.shop);
  const error = useSelector((state) => state.shop.error);

  useEffect(() => {
    const fetchData = async () => {
      await getShop(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getShop]);

  useEffect(() => {
    form.setFieldsValue({ name: shop.name });
  }, [shop]);

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
    const data = {
      id: parseInt(param?.id),
      key: parseInt(param?.id),
      ...values
    };
    await editShops(param?.id, data);
    // form.resetFields();
    navigate("/admin/show-shops");
  };

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        {error.length > 0 ? (
          <Alert
            message="Errors"
            description={error}
            type="error"
            showIcon
            closable
          />
        ) : null}

        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: "center" }} level={3}>
            ဆိုင်အမည်ပြုပြင်ရန်စာမျက်နှာ
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
            <Form.Item
              name="name"
              label="ဆိုင်အမည်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ဆိုင်အမည်ထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="ဆိုင်အမည်ထည့်ပါ"
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
    </Spin>
  );
};

export default connect(null, { editShops, getShop, clearAlert })(EditShops);
