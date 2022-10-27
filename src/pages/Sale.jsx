import React, { useState, useEffect } from 'react'

// ant design styles
import {
  Layout,
  Row,
  Col,
  Select,
  Space,
  Typography,
  Input,
  Button,
  Image,
  Table,
  InputNumber,
  message,
  Spin,
} from 'antd'
import {
  DeleteOutlined,
  SaveOutlined,
  PrinterOutlined,
} from '@ant-design/icons'
import Sider from 'antd/lib/layout/Sider'
import { useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import {
  getStocks,
  getServices,
  getStaffs,
  getMembers,
  getAccounts,
} from '../store/actions'
import { call } from '../services/api'
import { successCreateMessage } from '../uitls/messages'
import dateFormat from 'dateformat'

const { Header, Content } = Layout
const { Option } = Select
const { Title, Text } = Typography

const Sale = ({
  stock,
  getStocks,
  service,
  getStaffs,
  getMembers,
  getAccounts,
}) => {
  const [sales, setSales] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [MemberOnChanges, setMemberOnChanges] = useState(null)
  // const [SaleManId, setSaleManId] = useState(null);
  const [discount, setDiscount] = useState(0)
  const [paid, setPaid] = useState(0)
  const [lucky, setLucky] = useState(0)
  const [payMethod, setPayMethod] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sale, setSale] = useState(null)
  const [free, setFree] = useState(false)
  const [barcode, setBarcode] = useState([])
  const status = useSelector((state) => state.status)
  const error = useSelector((state) => state.error)
  const navigate = useNavigate()
  const now = new Date()

  // const allAccounts = useSelector((state) => state.account.accounts);
  const allStaffs = useSelector((state) => state.staff.staffs)
  // console.log(allStaffs);

  useEffect(() => {
    const fetchData = async () => {
      await getStocks()
      //   await getServices();
      await getStaffs()
      await getMembers()
      // await getAccounts();
    }

    fetchData()
    return () => {
      fetchData()
    }
  }, [getStocks, getStaffs, getMembers, getAccounts])

  useEffect(() => {
    setBarcode(stock.stocks)
  }, [stock.stocks])

  useEffect(() => {
    error.message !== null && message.error(error.message)

    return () => error.message
  }, [error.message])

  useEffect(() => {
    if (status.success) {
      message.success(successCreateMessage)
    }

    return () => status.success
  }, [status.success])

  useEffect(() => {
    const data = localStorage.getItem('galaxy-sale')

    if (data !== null) {
      const {
        sales,
        customerName,
        customerPhone,
        MemberOnChanges,
        discount,
        paid,
        lucky,
        payMethod,
      } = JSON.parse(data)

      setSales(sales)
      setCustomerName(customerName)
      setCustomerPhone(customerPhone)
      setMemberOnChanges(MemberOnChanges)
      setDiscount(discount)
      setPaid(paid)
      setLucky(lucky)
      setPayMethod(payMethod)
    }
  }, [])

  const handleFreeChange = () => {
    setFree(!free)
  }
  // console.log(free);

  const handleAddSaleItem = (stock) => {
    const index = sales.findIndex(
      (sale) => sale.sale_id === parseInt(stock.id) && sale.is_item,
    )

    if (index === -1) {
      // console.log("index");
      if (free) {
        const sale = {
          key: sales.length === 0 ? 1 : sales[sales.length - 1].id + 1,
          id: sales.length === 0 ? 1 : sales[sales.length - 1].id + 1,
          sale_id: stock.id,
          code: stock.item.code,
          name: stock.item.name,
          capital: stock.item.buy_price,
          price: stock.item.sale_price,
          quantity: 1,
          subtotal: 0,
          is_item: true,
          free: free,
          staff_id: 1, // not need staff id for item. so, we need to change api
        }
        setSales([...sales, sale])
      } else if (stock.quantity > 0) {
        const sale = {
          key: sales.length === 0 ? 1 : sales[sales.length - 1].id + 1,
          id: sales.length === 0 ? 1 : sales[sales.length - 1].id + 1,
          sale_id: stock.id,
          code: stock.item.code,
          name: stock.item.name,
          capital: stock.item.buy_price,
          price: stock.item.sale_price,
          quantity: 1,
          subtotal: stock.item.sale_price * 1,
          is_item: true,
          free: free,
          staff_id: 1, // not need staff id for item. so, we need to change api
        }
        setSales([...sales, sale])
      }
    } else if (free) {
      // if (stock.quantity > 0) {
      const sale = {
        key: sales.length === 0 ? 1 : sales[sales.length - 1].id + 1,
        id: sales.length === 0 ? 1 : sales[sales.length - 1].id + 1,
        sale_id: stock.id,
        code: stock.item.code,
        name: stock.item.name,
        capital: stock.item.buy_price,
        price: stock.item.sale_price,
        quantity: 1,
        // subtotal: stock.item.sale_price * 1,
        subtotal: 0,
        is_item: true,
        free: free,
        staff_id: 1, // not need staff id for item. so, we need to change api
      }

      setSales([...sales, sale])
      // }
    } else {
      let cloneSales = [...sales]
      if (free && cloneSales[index].quantity + 1 <= stock.quantity) {
        cloneSales[index] = {
          ...cloneSales[index],
          quantity: cloneSales[index].quantity + 1,
          subtotal: 0,
        }
        setSales(cloneSales)
      }
      if (cloneSales[index].quantity + 1 <= stock.quantity) {
        cloneSales[index] = {
          ...cloneSales[index],
          quantity: cloneSales[index].quantity + 1,
          subtotal: cloneSales[index].price * (cloneSales[index].quantity + 1),
        }
        setSales(cloneSales)
      }
    }
  }

  // console.log(sales)

  const handleDelete = (record) => {
    const filterSales = sales.filter((saleItem) => saleItem !== record)
    const transformSales = filterSales.map((saleItem, index) => {
      return {
        ...saleItem,
        id: index + 1,
        key: index + 1,
      }
    })
    setSales(transformSales)
  }

  const handleQuantityOnChange = (value, record) => {
    if (!free) {
      const index = sales.findIndex((sale) => sale === record)
      let cloneSales = [...sales]

      cloneSales[index] = {
        ...cloneSales[index],
        quantity: value,
        subtotal: cloneSales[index].price * value,
      }
      setSales(cloneSales)
    } else {
      const index = sales.findIndex((sale) => sale === record)
      let cloneSales = [...sales]

      cloneSales[index] = {
        ...cloneSales[index],
        quantity: value,
        subtotal: 0,
      }
      setSales(cloneSales)
    }
  }

  const handlePriceOnChange = (value, record) => {
    const index = sales.findIndex((sale) => sale === record)
    let cloneSales = [...sales]

    cloneSales[index] = {
      ...cloneSales[index],
      price: value,
      subtotal: cloneSales[index].quantity * value,
    }
    setSales(cloneSales)
  }

  const salesTotal =
    sales.length > 0
      ? sales.map((sale) => sale.subtotal).reduce((a, b) => a + b)
      : 0

  const discountAmount = salesTotal * (discount / 100)

  const finalTotal = salesTotal - discountAmount - lucky

  let credit
  credit = finalTotal - paid

  const handleSavedSale = async () => {
    if (sales.length === 0) {
      message.error('ကျေးဇူးပြု၍အဝယ်ပစ္စည်းများထည့်ပါ')
    } else if (MemberOnChanges == null) {
      message.error('ကျေးဇူးပြု၍ရောင်းသူအမည်ထည့်ပါ')
    }

    // else if (customerName === "") {
    //   message.error("ကျေးဇူးပြု၍ဝယ်ယူသူအမည်ထည့်ပါ");
    // } else if (customerPhone === "") {
    //   message.error("ကျေးဇူးပြု၍ဝယ်ယူသူဖုန်းနံပါတ်ထည့်ပါ");
    // }
    else if (payMethod === null) {
      message.error('ကျေးဇူးပြု၍ငွေချေရမည့်နည်းလမ်းထည့်ပါ')
    } else {
      let items = []
      let itemBuyTotal = 0
      let itemTotal = 0

      sales.forEach((sale) => {
        if (sale.is_item) {
          itemBuyTotal += Number(sale.capital) * Number(sale.quantity)
          itemTotal += Number(sale.subtotal)
          items.push({
            stock_id: sale.sale_id,
            staff_id: sale.staff_id,
            price: sale.price,
            quantity: sale.quantity,
            free: sale.free,
          })
        }
      })

      let savedData = {
        // date: "2022-03-28",
        date: dateFormat(now, 'yyyy-mm-dd'),
        items: items,
        item_buy_total: itemBuyTotal,
        item_total: itemTotal,
        total: salesTotal,
        discount: discount,
        paid: paid,
        payment_method: payMethod,
        customer_name: customerName ? customerName : '-',
        customer_phone_no: customerPhone ? customerPhone : '-',
        lucky_price: lucky,
        staff_id: Number(MemberOnChanges),
      }

      setLoading(true)
      const response = await call('post', 'invoices', savedData)

      setLoading(false)
      if (response.status === 'success') {
        localStorage.removeItem('galaxy-sale')
        message.success(
          'အရောင်းဘောင်ချာသိမ်းပြီးပါပြီ။ ဘောင်ချာထုတ်ရန် print button ကိုနှိပ်ပါ။',
        )
        setSales([])
        setCustomerName('')
        setCustomerPhone('')
        setMemberOnChanges(null)
        setDiscount(0)
        setPaid(0)
        setPayMethod(null)
        setSale(response.data)
        credit = 0
        setLucky(0)
      } else {
        message.error('အချက်လက်များစစ်ဆေးပြီး ပြန်ထည့်ပေးပါ။')
      }
    }
  }

  const handleLocalSave = () => {
    const data = {
      sales,
      customerName,
      customerPhone,
      MemberOnChanges,
      discount,
      paid,
      lucky,
      payMethod,
    }
    localStorage.setItem('galaxy-sale', JSON.stringify(data))
    message.success('Successfully Saved To Local!')
  }

  const handlePrint = () => {
    if (sale) {
      navigate(`/admin/sale/${sale.id}`)
    }
  }

  // for barcode system
  const [barcodeInputValue, updateBarcodeInputValue] = useState('')
  const onChangeBarcode = (event) => {
    updateBarcodeInputValue(event.target.value)
  }

  const handleSearch = () => {
    const filterstocks = stock.stocks.filter(
      (stock) => stock.item.code === barcodeInputValue,
    )
    setBarcode(filterstocks)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      updateBarcodeInputValue(e.target.value)

      const item = stock.stocks.find((s) => s.item.code === e.target.value)

      if (item) {
        handleAddSaleItem(item)
        updateBarcodeInputValue('')
      } else {
        const item = service.services.find((s) => s.code === e.target.value)
        if (item) {
          updateBarcodeInputValue('')
        } else {
          alert('Not Found')
          updateBarcodeInputValue('')
        }
      }
    }
  }

  // const handleSaleManOnChange = (value) => {
  //   // navigate("/admin/create-members");
  //   const findAccount = allAccounts.find((member) => member.id === value);
  //   setMemberOnChanges(findAccount?.name);
  //   // setCustomerName(findMember.name);
  //   // setCustomerPhone(findMember.phone);
  //   setSaleManId(findAccount?.id);
  // };

  // console.log(MemberOnChanges);
  // console.log(setMemberOnChanges);

  const handleDashboard = () => {
    navigate('/admin/dashboard')
  }

  const columns = [
    {
      title: 'စဉ်',
      dataIndex: 'id',
    },
    {
      title: 'ကုတ်နံပါတ်',
      dataIndex: 'code',
    },
    {
      title: 'ပစ္စည်း',
      dataIndex: 'name',
    },
    {
      title: 'ဈေးနှုန်း',
      dataIndex: 'price',
      align: 'right',
      render: (_, record) => (
        <InputNumber
          value={record.price}
          onChange={(value) => handlePriceOnChange(value, record)}
          style={{
            width: '100px',
            backgroundColor: 'var(--white-color)',
            color: 'var(--black-color)',
          }}
        />
      ),
    },
    {
      title: 'အရေအတွက်',
      dataIndex: 'quantity',
      align: 'right',
      render: (_, record) => (
        <InputNumber
          value={record.quantity}
          onChange={(value) => handleQuantityOnChange(value, record)}
          style={{
            width: '100px',
            backgroundColor: 'var(--white-color)',
            color: 'var(--black-color)',
          }}
        />
      ),
    },
    {
      title: 'ကျသင့်ငွေ',
      dataIndex: 'subtotal',
      align: 'right',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ]

  // console.log(sales.length);
  return (
    <Spin spinning={status.loading}>
      <Layout>
        <Header style={{ backgroundColor: 'var(--primary-color)' }}>
          <Title
            style={{
              color: 'var(--white-color)',
              textAlign: 'center',
              marginTop: '13px',
            }}
            level={3}
          >
            အရောင်း‌ဘောင်ချာဖွင့်ခြင်း
          </Title>
        </Header>
        <Spin spinning={loading}>
          <Layout
            style={{
              marginBottom: '20px',
              backgroundColor: 'var(--white-color)',
              padding: '10px',
            }}
          >
            <Row gutter={[16, 16]}>
              <Col
                xl={{
                  span: 4,
                }}
              >
                <Space>
                  <Text
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      padding: '10px',
                      color: 'var(--white-color)',
                    }}
                    onClick={handleSearch}
                  >
                    Search
                  </Text>
                  <Input
                    autoFocus={true}
                    placeholder="Start Scanning"
                    id="SearchbyScanning"
                    className="SearchInput"
                    value={barcodeInputValue}
                    onChange={onChangeBarcode}
                    onKeyDown={onKeyDown}
                  />
                </Space>
              </Col>
              {/* <Col xl={{ span: 14 }}></Col> */}
              <Col xl={{ span: 7 }}>
                <Space>
                  <Text
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      padding: '10px',
                      color: 'var(--white-color)',
                    }}
                  >
                    ရောင်းသူအမည်
                  </Text>
                  <Select
                    showSearch
                    placeholder="ရောင်းသူအမည်ရွေးပါ"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    // onChange={(value) => handleSaleManOnChange(value)}
                    onChange={(value) => setMemberOnChanges(value)}
                    value={MemberOnChanges}
                    allowClear={true}
                    size="large"
                    style={{ borderRadius: '10px' }}
                  >
                    {allStaffs.map((member) => (
                      <Option value={member.id} key={member.id}>
                        {member.name}
                      </Option>
                    ))}
                  </Select>
                </Space>
              </Col>
              <Col xl={{ span: 3 }}>
                <Button
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--white-color)',
                  }}
                  size="large"
                  onClick={handleFreeChange}
                >
                  {!free ? 'မဲလဲရန်' : 'မဲ မလဲတော့ပါ'}
                </Button>
              </Col>
              <Col xl={{ span: 3 }}>
                <Button
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--white-color)',
                  }}
                  size="large"
                  onClick={handleDashboard}
                >
                  Go To Dashboard
                </Button>
              </Col>
              <Col xl={{ span: 3 }}>
                <Button
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--white-color)',
                  }}
                  size="large"
                  onClick={handleLocalSave}
                >
                  Save Local
                </Button>
              </Col>
            </Row>
          </Layout>

          <Layout style={{ display: 'flex', flexDirection: 'row' }}>
            <Sider
              width={380}
              style={{
                backgroundColor: 'var(--info-color)',
                padding: '20px',
                height: '520px',
                overflow: 'auto',
              }}
            >
              <Row gutter={[12, 12]}>
                {barcode.map((stock) => (
                  <Col key={stock.id} size="6">
                    <Space
                      direction="vertical"
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        backgroundColor: 'var(--white-color)',
                        // marginBottom: "12px",
                        margin: '10px',
                      }}
                      onClick={() => handleAddSaleItem(stock)}
                    >
                      <Text
                        style={{
                          backgroundColor: 'var(--primary-color)',
                          color: 'var(--white-color)',
                          padding: '0 10px',
                        }}
                      >
                        {stock.item.code}
                      </Text>
                      <Image
                        width={130}
                        preview={false}
                        src={stock.item.image}
                        height={100}
                        style={{
                          padding: '10px',
                        }}
                      />
                      <Text style={{ color: 'var(--black-color)' }}>
                        {stock.item.name}
                        <br />({stock.quantity})
                      </Text>
                    </Space>
                  </Col>
                ))}
              </Row>
            </Sider>
            <Content
              style={{
                minHeight: '520px',
                backgroundColor: 'var(--muted-color)',
              }}
            >
              <Layout>
                <Table
                  bordered
                  columns={columns}
                  dataSource={sales}
                  // pagination={{ position: ["none", "none"] }}
                  pagination={{
                    defaultPageSize: 20,
                    position: ['none', 'none'],
                  }}
                />
                <Row gutter={[16, 16]}>
                  <Col span={15} style={{ textAlign: 'right' }}>
                    <Title level={5}>စုစုပေါင်း</Title>
                  </Col>
                  <Col span={3}></Col>
                  <Col span={3} style={{ textAlign: 'right' }}>
                    <Title level={5}>{salesTotal}</Title>
                  </Col>
                  <Col span={3}></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={15} style={{ textAlign: 'right' }}>
                    <Title level={5}>လျော့ဈေး</Title>
                  </Col>
                  <Col span={3} style={{ textAlign: 'center' }}>
                    <InputNumber
                      min={0}
                      value={discount}
                      onChange={(value) => setDiscount(value)}
                      addonAfter="%"
                      style={{
                        width: '100px',
                        backgroundColor: 'var(--white-color)',
                        color: 'var(--black-color)',
                      }}
                    />
                  </Col>
                  <Col span={3} style={{ textAlign: 'right' }}>
                    <Title level={5}>{discountAmount}</Title>
                  </Col>
                  <Col span={3}></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={15} style={{ textAlign: 'right' }}>
                    <Title level={5}>မဲလဲပိုက်ဆံပြန်အမ်းပေးငွေ</Title>
                  </Col>
                  <Col span={3}></Col>
                  <Col span={3} style={{ textAlign: 'right' }}>
                    <Title level={5}>
                      <InputNumber
                        min={0}
                        value={lucky}
                        onChange={(value) => setLucky(value)}
                        style={{
                          width: '100px',
                          backgroundColor: 'var(--white-color)',
                          color: 'var(--black-color)',
                        }}
                      />
                    </Title>
                  </Col>
                  <Col span={3}></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={15} style={{ textAlign: 'right' }}>
                    <Title level={5}>ပေးချေရမည့်စုစုပေါင်း</Title>
                  </Col>

                  <Col span={3}></Col>
                  <Col span={3} style={{ textAlign: 'right' }}>
                    <Title level={5}>{finalTotal}</Title>
                  </Col>
                  <Col span={3}></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={15} style={{ textAlign: 'right' }}>
                    <Title level={5}>ပေးငွေ</Title>
                  </Col>
                  <Col span={3}></Col>
                  <Col span={3} style={{ textAlign: 'right' }}>
                    <Title level={5}>
                      <InputNumber
                        min={0}
                        value={paid}
                        onChange={(value) => setPaid(value)}
                        style={{
                          width: '100px',
                          backgroundColor: 'var(--white-color)',
                          color: 'var(--black-color)',
                        }}
                      />
                    </Title>
                  </Col>
                  <Col span={3}></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={15} style={{ textAlign: 'right' }}>
                    <Title level={5}>ပေးရန်ကျန်ငွေ</Title>
                  </Col>
                  <Col span={3}></Col>
                  <Col span={3} style={{ textAlign: 'right' }}>
                    <Title level={5}>{credit}</Title>
                  </Col>
                  <Col span={3}></Col>
                </Row>
                <Row gutter={[16, 16]} style={{ padding: '20px' }}>
                  <Col xl={{ span: 10 }}>
                    <Space>
                      <Text
                        style={{
                          backgroundColor: 'var(--primary-color)',
                          padding: '10px',
                          color: 'var(--white-color)',
                        }}
                      >
                        ဝယ်ယူသူအမည်
                      </Text>
                      <Input
                        placeholder="ဝယ်ယူသူအမည် ထည့်ပေးပါ"
                        size="large"
                        value={customerName}
                        onChange={(event) =>
                          setCustomerName(event.target.value)
                        }
                      />
                    </Space>
                  </Col>
                  <Col xl={{ span: 4 }}></Col>
                  <Col xl={{ span: 10 }}>
                    <Space>
                      <Text
                        style={{
                          backgroundColor: 'var(--primary-color)',
                          padding: '10px',
                          color: 'var(--white-color)',
                        }}
                      >
                        ဝယ်ယူသူဖုန်းနံပါတ်
                      </Text>
                      <Input
                        placeholder="ဝယ်ယူသူဖုန်းနံပါတ် ထည့်ပေးပါ"
                        size="large"
                        value={customerPhone}
                        onChange={(event) =>
                          setCustomerPhone(event.target.value)
                        }
                      />
                    </Space>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ padding: '20px' }}>
                  <Col span={8} style={{ textAlign: 'center' }}>
                    <Button
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'var(--white-color)',
                      }}
                      size="large"
                      onClick={handleSavedSale}
                    >
                      <SaveOutlined />
                      Save
                    </Button>
                  </Col>
                  <Col span={6} style={{ textAlign: 'center' }}>
                    <Button
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'var(--white-color)',
                      }}
                      size="large"
                      onClick={handlePrint}
                    >
                      <PrinterOutlined />
                      Print
                    </Button>
                  </Col>
                  <Col xl={{ span: 8 }} style={{ textAlign: 'right' }}>
                    <Space direction="vertical">
                      <Text
                        style={{
                          backgroundColor: 'var(--primary-color)',
                          padding: '10px',
                          color: 'var(--white-color)',
                        }}
                      >
                        ငွေချေရမည့်နည်းလမ်း
                      </Text>
                      <Select
                        showSearch
                        placeholder="ငွေချေနည်းရွေးပါ"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(value) => setPayMethod(value)}
                        value={payMethod}
                        allowClear={true}
                        size="large"
                        style={{ borderRadius: '10px' }}
                      >
                        <Option value="Cash">Cash</Option>
                        <Option value="KBZ">KBZ</Option>
                        <Option value="AYA">AYA</Option>
                        <Option value="CB">CB</Option>
                        <Option value="Kpay">Kpay</Option>
                        <Option value="Free">Free</Option>
                      </Select>
                    </Space>
                  </Col>
                  {/* <Col xl={{ span: 4 }}></Col> */}
                </Row>
                {/* <Row gutter={[16, 16]} style={{ padding: "20px" }}>
                  <Col span={10} style={{ textAlign: "center" }}>
                    <Button
                      style={{
                        backgroundColor: "var(--primary-color)",
                        color: "var(--white-color)"
                      }}
                      size="large"
                      onClick={handleSavedSale}
                    >
                      <SaveOutlined />
                      Save
                    </Button>
                  </Col>
                  <Col span={4}></Col>
                  <Col span={10} style={{ textAlign: "center" }}>
                    <Button
                      style={{
                        backgroundColor: "var(--primary-color)",
                        color: "var(--white-color)"
                      }}
                      size="large"
                      onClick={handlePrint}
                    >
                      <PrinterOutlined />
                      Print
                    </Button>
                  </Col>
                </Row> */}
              </Layout>
            </Content>
          </Layout>
        </Spin>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  stock: store.stock,
  service: store.service,
  staff: store.staff,
  member: store.member,
})

export default connect(mapStateToProps, {
  getStocks,
  getServices,
  getStaffs,
  getMembers,
  getAccounts,
})(Sale)
