import React, { useEffect } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Select,
  notification,
  Alert,
  Spin,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { saveLucky, clearAlertMerchant } from "../../store/actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "../../store";
import { successCreateMessage } from "../../uitls/messages";

const { Title } = Typography;
const { Option } = Select;

const CreateLuckys = ({ saveLucky, clearAlertMerchant }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);

  useEffect(() => {
    const fetchData = async () => {
    //   await getShops();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  useEffect(() => {
    store.dispatch(clearAlertMerchant());
  }, []);

  useEffect(() => {
    errors.message !== null && message.error(errors.message);
    return () => errors.message;
  }, [errors.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successCreateMessage);
      form.resetFields();
    }
    return () => status.success;
  }, [status.success]);

  const onFinish = async (values) => {
    await saveLucky(values);
  };


  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: "center" }} level={3}>
            မဲလဲပိုက်ဆံပြန်အမ်း
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
              name="date"
              label="ရက်စွဲ"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ရက်စွဲထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="နှစ်/လ/ရက် အတိုင်းရက်စွဲထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="amount"
              label="ပမာဏ"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ပမာဏထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="ပမာဏထည့်ပါ"
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
  merchant: store.merchant
});

export default connect(mapStateToProps, {
  saveLucky,
  clearAlertMerchant
})(CreateLuckys);
