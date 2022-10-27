import React, { useEffect, useState } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  Spin,
  Select,
  Modal,
  Form,
  InputNumber,
  message,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { PlusSquareOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {
  getStocks,
  getShops,
  editStocks,
  deleteStocks,
  destroyStocks,
  getUnits,
} from '../../store/actions'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'
import { ExportToExcel } from '../../excel/ExportToExcel'
import { successEditMessage } from '../../uitls/messages'
import Text from 'antd/lib/typography/Text'
// import Text from "antd/lib/typography/Text";

const { Title } = Typography
const { Option } = Select

const ShowStocks = ({
  unit,
  getStocks,
  getShops,
  editStocks,
  deleteStocks,
  destroyStocks,
  getUnits,
}) => {
  const [addForm] = Form.useForm()
  const [deleteForm] = Form.useForm()
  const [isAddStock, setIsAddStock] = useState(false)
  const [isDeleteStock, setIsDeleteStock] = useState(false)
  const [selectedStock, setSelectedStock] = useState(null)
  const navigate = useNavigate()
  const stockAll = useSelector((state) => state.stock.stocks)
  const status = useSelector((state) => state.status)
  const user = useSelector((state) => state.auth.user)
  const shops = useSelector((state) => state.shop.shops)

  const fileName = 'Stocks' // here enter filename for your excel file
  const result = stockAll.map((stock) => ({
    Quantity: stock.quantity,
    Code: stock.item.code,
    Buy_Price: stock.item.buy_price,
    Sale_Price: stock.item.sale_price,
    Name: stock.item.name,
  }))

  const itemsUnique = []
  stockAll.forEach((i) => itemsUnique.push(i?.item?.name))
  let unique = [...new Set(itemsUnique)]
  // console.log("uu", unique);

  useEffect(() => {
    const fetchData = async () => {
      await getStocks()
      await getShops()
      await getUnits()
    }

    fetchData()
    return () => {
      fetchData()
    }
  }, [getStocks, getShops, getUnits])

  useEffect(() => {
    if (status.success) {
      message.success(successEditMessage)
      window.location.reload(false)
    }
    return () => status.success
  }, [status.success])

  const handleAddOnFinish = async (value) => {
    await editStocks(selectedStock.id, value)
  }

  const handleDeleteRow = async (id) => {
    await destroyStocks(id)
  }

  const handleDeleteOnFinish = async (value) => {
    if (value.quantity > selectedStock.quantity) {
      message.error('အရေအတွက်မလုံလောက်ပါ')
    } else {
      await deleteStocks(selectedStock.id, value)
    }
  }

  const [showBuyMerchant, setshowBuyMerchant] = useState(null)
  const onChange = (value) => {
    if (value === undefined) {
      setshowBuyMerchant(stockAll)
    } else {
      const filterBuyMerchant = stockAll.filter(
        (mer) => mer.item.name === value,
      )
      setshowBuyMerchant(filterBuyMerchant)
    }
  }

  const [showBuyShop, setShowBuyShop] = useState(null)
  const onChangeShop = (value) => {
    if (value === undefined) {
      setShowBuyShop(stockAll)
    } else {
      const filterBuyShop = stockAll.filter(
        (mer) => parseInt(mer.shop_id) === value,
      )
      setShowBuyShop(filterBuyShop)
    }
  }
  let columns = []

  if (user?.position == 'owner') {
    columns = [
      {
        title: 'ပစ္စည်းပုံ',
        dataIndex: 'item',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: (
                <div>
                  <img
                    src={record.item.image}
                    alt="ပစ္စည်းပုံ"
                    width={80}
                    height={80}
                  />
                </div>
              ),
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return (
              <span style={{ color: 'white' }}>
                <img
                  src={record.item.image}
                  alt="ပစ္စည်းပုံ"
                  width={80}
                  height={80}
                />
              </span>
            )
          else
            return (
              <span style={{ color: 'black' }}>
                <img
                  src={record.item.image}
                  alt="ပစ္စည်းပုံ"
                  width={80}
                  height={80}
                />
              </span>
            )
        },

        // render: (_, record) => {
        //   // <img src={record.item.image} alt="ပစ္စည်းပုံ" width={80} height={80} />

        //   if (record.quantity < 10)
        //     // return <span style={{ color: "red" }}>{record.item.code}</span>;

        //     return {
        //       props: {
        //         style: {
        //           background: parseInt(record.quantity) > 10 ? "" : "red",
        //           color: "white"
        //         }
        //       },
        //       children: (
        //         <div>
        //           <img
        //             src={record.item.image}
        //             alt="ပစ္စည်းပုံ"
        //             width={80}
        //             height={80}
        //           />
        //         </div>
        //       )
        //     };
        //   else
        //     return (
        //       <span>
        //         <img
        //           src={record.item.image}
        //           alt="ပစ္စည်းပုံ"
        //           width={80}
        //           height={80}
        //         />
        //       </span>
        //     );
        // }
      },
      {
        title: 'ပစ္စည်းကုတ်',
        dataIndex: 'item',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: <div>{record.item.code}</div>,
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: 'white' }}>{record.item.code}</span>
          else return <span style={{ color: 'black' }}>{record.item.code}</span>
        },
      },
      {
        title: 'ပစ္စည်းအမည်',
        dataIndex: 'item',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: <div>{record.item.name}</div>,
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: 'white' }}>{record.item.name}</span>
          else return <span style={{ color: 'black' }}>{record.item.name}</span>
        },
      },

      {
        title: 'ဝယ်ဈေး',
        dataIndex: 'buy_price',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: <div>{record.item.buy_price}</div>,
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return (
              <span style={{ color: 'white' }}>{record.item.buy_price}</span>
            )
          else
            return (
              <span style={{ color: 'black' }}>{record.item.buy_price}</span>
            )
        },
      },
      {
        title: 'ရောင်းဈေး',
        dataIndex: 'sale_price',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: <div>{record.item.sale_price}</div>,
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return (
              <span style={{ color: 'white' }}>{record.item.sale_price}</span>
            )
          else
            return (
              <span style={{ color: 'black' }}>{record.item.sale_price}</span>
            )
        },
      },
      {
        title: 'အရေအတွက်',
        dataIndex: 'quantity',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: <div>{record.quantity}</div>,
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: 'white' }}>{record.quantity}</span>
          else return <span style={{ color: 'black' }}>{record.quantity}</span>
        },
      },
      {
        title: 'Unit',
        dataIndex: '',
        render: (_, record) =>
          unit.units.map((unit) => {
            let quantity = Math.floor(record.quantity / unit.quantity)

            return <Text>{`${unit.name}(${quantity})`} || </Text>
          }),
      },
      {
        title: 'Add or Delete',
        dataIndex: 'add_or_delete',
        render: (_, record) => (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setIsAddStock(true)
                setSelectedStock(record)
              }}
            >
              Add
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setIsDeleteStock(true)
                setSelectedStock(record)
              }}
            >
              Delete
            </Button>
          </Space>
        ),
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        render: (_, record) => (
          <Space>
            {/* <Button
              type="primary"
              onClick={() => navigate(`/admin/unit-stock/${record.quantity}`)}
            >
              ယူနစ်အလိုက်
            </Button> */}
            <Button type="danger" onClick={() => handleDeleteRow(record.id)}>
              Delete Row
            </Button>
          </Space>
        ),
      },
    ]
  } else {
    columns = [
      {
        title: 'ပစ္စည်းပုံ',
        dataIndex: 'item',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: (
                <div>
                  <img
                    src={record.item.image}
                    alt="ပစ္စည်းပုံ"
                    width={80}
                    height={80}
                  />
                </div>
              ),
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return (
              <span style={{ color: 'white' }}>
                <img
                  src={record.item.image}
                  alt="ပစ္စည်းပုံ"
                  width={80}
                  height={80}
                />
              </span>
            )
          else
            return (
              <span style={{ color: 'black' }}>
                <img
                  src={record.item.image}
                  alt="ပစ္စည်းပုံ"
                  width={80}
                  height={80}
                />
              </span>
            )
        },

        // render: (_, record) => {
        //   // <img src={record.item.image} alt="ပစ္စည်းပုံ" width={80} height={80} />

        //   if (record.quantity < 10)
        //     // return <span style={{ color: "red" }}>{record.item.code}</span>;

        //     return {
        //       props: {
        //         style: {
        //           background: parseInt(record.quantity) > 10 ? "" : "red",
        //           color: "white"
        //         }
        //       },
        //       children: (
        //         <div>
        //           <img
        //             src={record.item.image}
        //             alt="ပစ္စည်းပုံ"
        //             width={80}
        //             height={80}
        //           />
        //         </div>
        //       )
        //     };
        //   else
        //     return (
        //       <span>
        //         <img
        //           src={record.item.image}
        //           alt="ပစ္စည်းပုံ"
        //           width={80}
        //           height={80}
        //         />
        //       </span>
        //     );
        // }
      },
      {
        title: 'ပစ္စည်းကုတ်',
        dataIndex: 'item',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: <div>{record.item.code}</div>,
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: 'white' }}>{record.item.code}</span>
          else return <span style={{ color: 'black' }}>{record.item.code}</span>
        },
      },
      {
        title: 'ပစ္စည်းအမည်',
        dataIndex: 'item',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: <div>{record.item.name}</div>,
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: 'white' }}>{record.item.name}</span>
          else return <span style={{ color: 'black' }}>{record.item.name}</span>
        },
      },

      {
        title: 'ဝယ်ဈေး',
        dataIndex: 'buy_price',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: <div>{record.item.buy_price}</div>,
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return (
              <span style={{ color: 'white' }}>{record.item.buy_price}</span>
            )
          else
            return (
              <span style={{ color: 'black' }}>{record.item.buy_price}</span>
            )
        },
      },
      {
        title: 'ရောင်းဈေး',
        dataIndex: 'sale_price',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: <div>{record.item.sale_price}</div>,
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return (
              <span style={{ color: 'white' }}>{record.item.sale_price}</span>
            )
          else
            return (
              <span style={{ color: 'black' }}>{record.item.sale_price}</span>
            )
        },
      },
      {
        title: 'အရေအတွက်',
        dataIndex: 'quantity',
        onCell: (record) => {
          if (record.quantity < 10)
            return {
              style: {
                background: parseInt(record.quantity) > 10 ? '' : 'red',
              },
              children: <div>{record.quantity}</div>,
            }
          else return ''
        },
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: 'white' }}>{record.quantity}</span>
          else return <span style={{ color: 'black' }}>{record.quantity}</span>
        },
      },
      {
        title: 'Unit',
        dataIndex: '',
        render: (_, record) =>
          unit.units.map((unit) => {
            let quantity = Math.floor(record.quantity / unit.quantity)

            return <Text>{`${unit.name}(${quantity})`} || </Text>
          }),
      },
      // {
      //   title: 'Actions',
      //   dataIndex: 'action',
      //   render: (_, record) => (
      //     <Button
      //       type="primary"
      //       onClick={() => navigate(`/admin/unit-stock/${record.quantity}`)}
      //     >
      //       ယူနစ်အလိုက်
      //     </Button>
      //   ),
      // },
    ]
  }

  return (
    <>
      <Spin spinning={status.loading}>
        <Layout style={{ margin: '20px' }}>
          <Space direction="vertical" size="middle">
            <Row gutter={[16, 16]}>
              <Col span={4}>
                <Title level={3}>Stock စာရင်း</Title>
              </Col>

              {user?.position == 'owner' ? (
                <Col span={12}>
                  <Space
                    direction="horizontal"
                    style={{
                      width: '100%',
                      marginBottom: '10px',
                    }}
                    size="large"
                  >
                    {/* <Text type="secondary">ပစ္စည်းအမည်ရွေးပါ</Text> */}
                    <Select
                      showSearch
                      placeholder="ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
                      optionFilterProp="children"
                      onChange={onChangeShop}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      allowClear={true}
                      size="large"
                      style={{ borderRadius: '10px' }}
                    >
                      {shops.map((s) => (
                        <Option key={s.id} value={s.id}>
                          {s.name}
                        </Option>
                      ))}
                    </Select>
                  </Space>
                </Col>
              ) : (
                <Col span={12}>
                  <Space
                    direction="horizontal"
                    style={{
                      width: '100%',
                      marginBottom: '10px',
                    }}
                    size="large"
                  >
                    {/* <Text type="secondary">ပစ္စည်းအမည်ရွေးပါ</Text> */}
                    <Select
                      showSearch
                      placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ရွေးပါ"
                      optionFilterProp="children"
                      onChange={onChange}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      allowClear={true}
                      size="large"
                      style={{ borderRadius: '10px' }}
                    >
                      {unique.map((item) => (
                        <Option key={Math.random() * 100} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Space>
                </Col>
              )}

              <Col span={4}>
                <Button
                  style={{
                    backgroundColor: 'var(--secondary-color)',
                    color: 'var(--white-color)',
                    borderRadius: '5px',
                  }}
                  size="middle"
                  onClick={() => navigate('/admin/create-buy-merchants')}
                >
                  <PlusSquareOutlined />
                  အသစ်ထည့်မည်
                </Button>
              </Col>
              <Col span={4}>
                <ExportToExcel apiData={result} fileName={fileName} />
              </Col>
            </Row>
            {user?.position == 'owner' ? (
              <Table
                bordered
                columns={columns}
                dataSource={showBuyShop != null ? showBuyShop : stockAll}
                pagination={{ defaultPageSize: 6 }}
              />
            ) : (
              <Table
                bordered
                columns={columns}
                dataSource={
                  showBuyMerchant != null ? showBuyMerchant : stockAll
                }
                pagination={{ defaultPageSize: 6 }}
              />
            )}
          </Space>
        </Layout>
      </Spin>
      <Modal
        title="Add Stock"
        visible={isAddStock}
        footer={null}
        onCancel={() => {
          setIsAddStock(false)
          setSelectedStock(null)
        }}
      >
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={handleAddOnFinish}
          form={addForm}
        >
          <Form.Item
            name="quantity"
            label="အရေအတွက်"
            rules={[
              {
                required: true,
                message: 'ကျေးဇူးပြု၍ အရေအတွက်ထည့်ပါ',
              },
            ]}
          >
            <InputNumber
              placeholder="အရေအတွက်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: '10px', width: '100%' }}
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <Button
              style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--white-color)',
                borderRadius: '10px',
              }}
              size="large"
              htmlType="submit"
            >
              <EditOutlined />
              သိမ်းမည်
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Stock"
        visible={isDeleteStock}
        footer={null}
        onCancel={() => {
          setIsDeleteStock(false)
          setSelectedStock(null)
        }}
      >
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={handleDeleteOnFinish}
          form={deleteForm}
        >
          <Form.Item
            name="quantity"
            label="အရေအတွက်"
            rules={[
              {
                required: true,
                message: 'ကျေးဇူးပြု၍ အရေအတွက်ထည့်ပါ',
              },
            ]}
          >
            <InputNumber
              placeholder="အရေအတွက်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: '10px', width: '100%' }}
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <Button
              style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--white-color)',
                borderRadius: '10px',
              }}
              size="large"
              htmlType="submit"
            >
              <EditOutlined />
              သိမ်းမည်
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

const mapStateToProps = (store) => ({
  stock: store.stock,
  unit: store.unit,
})

export default connect(mapStateToProps, {
  getStocks,
  getShops,
  editStocks,
  deleteStocks,
  destroyStocks,
  getUnits,
})(ShowStocks)
