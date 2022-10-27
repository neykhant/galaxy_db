import React, { useState, useEffect } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  Select,
  Spin,
  Form,
  InputNumber,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined } from "@ant-design/icons";
import { getStaffReport, getStaffs } from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { successEditMessage } from "../../uitls/messages";

const { Title, Text } = Typography;
const { Option } = Select;

const StaffComession = ({ getStaffReport, getStaffs }) => {
  const [form] = Form.useForm();
  const [filterStaffs, setFilterStaffs] = useState([]);
  const staffs = useSelector((state) => state.staff.staffs);
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);

  useEffect(() => {
    setFilterStaffs(staffs);
  }, [staffs]);

  useEffect(() => {
    const fetchData = async () => {
      await getStaffs();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getStaffs]);

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

  let total = 0;

  filterStaffs.forEach((filterStaff) => {
    const commercial =
      filterStaff?.bonuses?.length > 0
        ? filterStaff?.bonuses
            .map((b) => b.commission)
            .reduce((a, b) => Number(a) + Number(b))
        : 0;

    const bonus =
      filterStaff?.bonuses?.length > 0
        ? filterStaff?.bonuses
            .map((b) => b.bonus)
            .reduce((a, b) => Number(a) + Number(b))
        : 0;

    const food_expense =
      filterStaff?.bonuses?.length > 0
        ? filterStaff.bonuses
            .map((b) => b.food_expense)
            .reduce((a, b) => Number(a) + Number(b))
        : 0;

    const sale =
      filterStaff?.bonuses?.length > 0
        ? filterStaff.bonuses
            .map((b) => b.sale)
            .reduce((a, b) => Number(a) + Number(b))
        : 0;

    const travel_expense =
      filterStaff?.bonuses?.length > 0
        ? filterStaff.bonuses
            .map((b) => b.travel_expense)
            .reduce((a, b) => Number(a) + Number(b))
        : 0;

    total +=
      Number(commercial) +
      Number(bonus) +
      Number(food_expense) +
      Number(sale) +
      Number(travel_expense) +
      Number(filterStaff.salary);
  });

  const handleOnChange = (value) => {
    if (value === undefined) {
      setFilterStaffs(staffs);
    } else {
      setFilterStaffs(staffs.filter((staff) => staff.id === value));
    }
  };

  const onFinish = async (values) => {
    await getStaffReport({ ...values });
  };

  const columns = [
    {
      title: "အမည်",
      dataIndex: "name"
    },
    {
      title: "လခ",
      dataIndex: "salary"
      // render:(_,record) => console.log(record)
    },
    {
      title: "ကော်မရှင်",
      dataIndex: "commission",
      render: (_, record) => {
        return record?.bonuses?.map((b) => b.commission);
      }
    },
    {
      title: "ဘောနပ်စ်",
      dataIndex: "bonus",
      render: (_, record) => {
        return record?.bonuses?.map((b) => b.bonus);
      }
    },
    {
      title: "စားစရိတ်",
      dataIndex: "food_expense",
      render: (_, record) => {
        return record?.bonuses?.map((b) => b.food_expense);
      }
    },
    {
      title: "သွားလာစရိတ်",
      dataIndex: "travel_expense",
      render: (_, record) => {
        return record?.bonuses?.map((b) => b.travel_expense);
      }
    },
    {
      title: "ရောင်းအား ဘောနပ်စ်",
      dataIndex: "sale_bonus",
      render: (_, record) => {
        return record?.bonuses?.map((b) => b.sale);
      }
    },
    {
      title: "စုစုပေါင်း",
      dataIndex: "",
      render: (_, record) => {
        const commercial =
          record?.bonuses?.length > 0
            ? record.bonuses
                .map((b) => b.commission)
                .reduce((a, b) => Number(a) + Number(b))
            : 0;

        const bonus =
          record?.bonuses?.length > 0
            ? record.bonuses
                .map((b) => b.bonus)
                .reduce((a, b) => Number(a) + Number(b))
            : 0;

        const food_expense =
          record?.bonuses?.length > 0
            ? record.bonuses
                .map((b) => b.food_expense)
                .reduce((a, b) => Number(a) + Number(b))
            : 0;

        const sale =
          record?.bonuses?.length > 0
            ? record.bonuses
                .map((b) => b.sale)
                .reduce((a, b) => Number(a) + Number(b))
            : 0;

        const travel_expense =
          record?.bonuses?.length > 0
            ? record.bonuses
                .map((b) => b.travel_expense)
                .reduce((a, b) => Number(a) + Number(b))
            : 0;

        return (
          Number(commercial) +
          Number(bonus) +
          Number(food_expense) +
          Number(sale) +
          Number(travel_expense) +
          Number(record?.salary)
        );
      }
    }
  ];

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <Title level={3}>၀န်ထမ်းလခနှင့်ကော်မရှင်စုစုပေါင်း</Title>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
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
                  name="month"
                  label="လ"
                  rules={[
                    {
                      required: true,
                      message: "ကျေးဇူးပြု၍ လထည့်ပါ"
                    }
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="လထည့်ပါ"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    allowClear={true}
                    size="medium"
                    style={{ borderRadius: "10px" }}
                  >
                    <Option value="01">1</Option>
                    <Option value="02">2</Option>
                    <Option value="03">3</Option>
                    <Option value="04">4</Option>
                    <Option value="05">5</Option>
                    <Option value="06">6</Option>
                    <Option value="07">7</Option>
                    <Option value="08">8</Option>
                    <Option value="09">9</Option>
                    <Option value="10">10</Option>
                    <Option value="11">11</Option>
                    <Option value="12">12</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="year"
                  label="ခုနှစ်"
                  rules={[
                    {
                      required: true,
                      message: "ကျေးဇူးပြု၍ ခုနှစ်ထည့်ပါ"
                    }
                  ]}
                >
                  <InputNumber
                    placeholder="ခုနှစ်ထည့်ပါ  ဥပမာ(2022)"
                    prefix={<EditOutlined />}
                    style={{ borderRadius: "10px", width: "100%" }}
                    size="medium"
                  />
                </Form.Item>

                <Form.Item style={{ textAlign: "right" }}>
                  <Button
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      color: "var(--white-color)",
                      borderRadius: "10px",
                      marginBottom: "1px"
                    }}
                    size="medium"
                    htmlType="submit"
                  >
                    ရှာမည်
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={2}></Col>
            <Col span={6}>
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ဝန်ထမ်းအမည်ရွေးပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                onChange={(value) => handleOnChange(value)}
                size="large"
                style={{ borderRadius: "10px" }}
              >
                {staffs.map((staff) => (
                  <Option value={staff.id} key={staff.id}>
                    {staff?.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={4}>
              <Text
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "var(--white-color)"
                }}
              >
                စုစုပေါင်း = {total}
              </Text>
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            pagination={{ defaultPageSize: 10 }}
            dataSource={filterStaffs}
          />
        </Space>
      </Layout>
    </Spin>
  );
};

export default connect(null, { getStaffReport, getStaffs })(StaffComession);
