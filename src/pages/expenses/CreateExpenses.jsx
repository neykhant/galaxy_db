import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Table,
  InputNumber,
  message,
  Drawer,
  Select,
  notification,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { saveExpenses, getExpenseNames } from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { successCreateMessage } from "../../uitls/messages";

const { Title } = Typography;
const { Option } = Select;

const CreateExpenses = ({ expense_name, saveExpenses, getExpenseNames }) => {
  const expenseNames = expense_name.expense_names;
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);

  useEffect(() => {
    errors.message !== null && message.error(errors.message);
    return () => errors.message;
  }, [errors.message]);

  useEffect(() => {
    if (status.success) {
      setExpenseTable([]);
      message.success(successCreateMessage);
    }
    return () => status.success;
  }, [status.success]);

  useEffect(() => {
    const fetchData = async () => {
      await getExpenseNames();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getExpenseNames]);

  // const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  // const [expenseFrom] = Form.useForm();
  const navigate = useNavigate();

  const [expenseTable, setExpenseTable] = useState({ expenses: [] });
  const onFinish = async (values) => {
    setExpenseTable({
      expenses: [
        ...expenseTable.expenses,
        {
          key: Math.random() * 100,
          ...values
        }
      ]
    });
    form.resetFields();
  };

  const handleDelete = (record) => {
    const filterExpenses = expenseTable.expenses.filter(
      (expense) => expense.key !== record.key
    );
    setExpenseTable({
      expenses: [...filterExpenses]
    });
  };

  const handleSave = async () => {
    if (expenseTable.expenses.length === 0) {
      message.error("ကျေးဇူးပြု၍ကုန်ကျစရိတ်အချက်အလက်များထည့်ပါ");
    } else {
      await saveExpenses(expenseTable);
      // navigate("/admin/show-expenses");
    }
  };
  const columns = [
    {
      title: "ကုန်ကျစရိတ်အမည်",
      dataIndex: "name"
    },
    {
      title: "ပမာဏ",
      dataIndex: "amount"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: "10px"
            }}
            size="large"
          >
            <Title style={{ textAlign: "center" }} level={3}>
              ကုန်ကျစရိတ်သွင်းရန်စာမျက်နှာ
            </Title>
            {/* <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px",
              }}
              size="middle"
              onClick={() => setVisible(true)}
            >
              <PlusSquareOutlined />
              ကုန်ကျစရိတ်အမည်ထည့်ရန်
            </Button> */}
          </Space>
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
              label="ကုန်ကျစရိတ်အမည်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ကုန်ကျစရိတ်အမည်ရွေးပါ"
                }
              ]}
            >
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ကုန်ကျစရိတ်အမည်ရွေးပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: "10px" }}
              >
                {expenseNames.map((expense_name) => (
                  <Option value={expense_name.name} key={expense_name.id}>
                    {expense_name.name}
                  </Option>
                ))}
              </Select>
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
            dataSource={expenseTable.expenses}
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
  expense_name: store.expense_name
});

export default connect(mapStateToProps, { saveExpenses, getExpenseNames })(
  CreateExpenses
);
