import React, { useEffect } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  message,
  Alert,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { connect, useSelector } from "react-redux";
import { saveShops, clearAlert } from "../../store/actions";
import store from "../../store";
import { successCreateMessage } from "../../uitls/messages";

const { Title } = Typography;

const CreateShops = ({ saveShops, shop, clearAlert }) => {
  const errors = useSelector((state) => state.error);
  const stautss = useSelector((state) => state.status);

  const [form] = Form.useForm();
  useEffect(() => {
    store.dispatch(clearAlert());
  }, []);

  useEffect(() => {
    errors.message !== null && message.error(errors.message);
    return () => errors.message;
  }, [errors.message]);

  useEffect(() => {
    if (stautss.success) {
      message.success(successCreateMessage);
    }
    return () => stautss.success;
  }, [stautss.success]);

  const onFinish = async (values) => {
    await saveShops(values);
    form.resetFields();
  };

  return (
    <Spin spinning={stautss.loading}>
    <Layout style={{ margin: "20px" }}>
      {/* {shop.error.length > 0 ? (
        <Alert
          message="Errors"
          description={shop.error}
          type="error"
          showIcon
          closable
        />
      ) : null}

      {shop.isSuccess && (
        <Alert message="Successfully Created" type="success" showIcon />
      )} */}

      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ဆိုင်အမည် သွင်းခြင်း စာမျက်နှာ
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

const mapStateToProps = (store) => ({
  shop: store.shop
});

export default connect(mapStateToProps, { saveShops, clearAlert })(CreateShops);
