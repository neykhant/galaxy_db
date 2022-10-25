import React, { useEffect } from "react";
import { Form, Input, Typography, Space, Button, message, Spin } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { editExpenseNames, getExpenseName } from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { successEditMessage } from "../../uitls/messages";

const { Title } = Typography;

const EditExpenseNames = ({ editExpenseNames, getExpenseName }) => {
  const param = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);
  const expenseName = useSelector((state) => state.expense_name.expense_name);

  useEffect(() => {
    const fetchData = async () => {
      await getExpenseName(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getExpenseName]);

  useEffect(() => {
    form.setFieldsValue({ name: expenseName.name });
  }, [expenseName]);

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
    await editExpenseNames(param?.id, values)
    navigate("/admin/show-expense-names");
  };

  return (
    <Spin spinning={status.loading}>
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ကုန်ကျစရိတ်အမည်ပြုပြင်ရန်စာမျက်နှာ
        </Title>
        <Form
          labelCol={{
            span: 3
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
            label="ကုန်ကျစရိတ်အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကုန်ကျစရိတ်အမည်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ကုန်ကျစရိတ်အမည်ထည့်ပါ"
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

export default connect(null, { editExpenseNames, getExpenseName })(
  EditExpenseNames
);
