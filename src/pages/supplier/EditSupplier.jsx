import React, { useEffect } from "react";
import { Form, Input, Typography, Space, Button } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const EditSupplier = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const suppliers = useSelector((state) => state.SupplierReducer);
  const currentSupplier = suppliers.find(
    (supplier) => supplier.id === parseInt(id)
  );

  useEffect(() => {
    if (currentSupplier) {
      form.setFieldsValue({ code: currentSupplier.code });
      form.setFieldsValue({ name: currentSupplier.name });
      form.setFieldsValue({ company_name: currentSupplier.company_name });
      form.setFieldsValue({ phone: currentSupplier.phone });
      form.setFieldsValue({ other: currentSupplier.other });
    }
  }, [currentSupplier]);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const data = {
      id: parseInt(id),
      ...values
    };
    dispatch({ type: "UPDATE_SUPPLIERS", payload: data });
    console.log("success");
    navigate("/admin/show-supplier");
  };

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        {currentSupplier ? (
          <>
            <Title style={{ textAlign: "center" }} level={3}>
              Supplier Edit {id}
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
                  style={{ borderRadius: "10px" }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="name"
                label="အမည်"
                rules={[
                  {
                    required: true,
                    message: "ကျေးဇူးပြု၍ အမည်ထည့်ပါ"
                  }
                ]}
              >
                <Input
                  placeholder="အမည်ထည့်ပါ"
                  prefix={<EditOutlined />}
                  style={{ borderRadius: "10px" }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="company_name"
                label="ကုမ္ပဏီအမည်"
                rules={[
                  {
                    required: true,
                    message: "ကျေးဇူးပြု၍ ကုမ္ပဏီအမည်ထည့်ပါ"
                  }
                ]}
              >
                <Input
                  
                  placeholder="ကုမ္ပဏီအမည်ထည့်ပါ"
                  prefix={<EditOutlined />}
                  style={{ borderRadius: "10px" }}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="ဖုန်းနံပါတ်"
                rules={[
                  {
                    required: true,
                    message: "ကျေးဇူးပြု၍ ဖုန်းနံပါတ်ထည့်ပါ"
                  }
                ]}
              >
                <Input
                  placeholder="ဖုန်းနံပါတ်ထည့်ပါ"
                  prefix={<EditOutlined />}
                  style={{ borderRadius: "10px" }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="other"
                label="အခြား"
                rules={[
                  {
                    required: true,
                    message: "ကျေးဇူးပြု၍ အခြားထည့်ပါ"
                  }
                ]}
              >
                <Input
                  placeholder="အခြား"
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
          </>
        ) : (
          <Title style={{ textAlign: "center" }} level={3}>
            Supplier Edit {id} does not have?
          </Title>
        )}
      </Space>
    </Layout>
  );
};

export default EditSupplier;
