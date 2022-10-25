import React from 'react'
import {
  Link,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom'
// ant design styles
import { Layout, Menu, Avatar, Space, Popover, Button } from 'antd'
import Title from 'antd/lib/typography/Title'
import Logo from './../assets/images/logo.png'
// ant design icons
import {
  UserOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
  SaveOutlined,
  DatabaseOutlined,
  CalculatorOutlined,
  ShopOutlined,
  FileImageOutlined,
  ContactsOutlined,
  FolderAddOutlined,
  LockOutlined,
} from '@ant-design/icons'
import Dashboard from '../pages/Dashboard'
import SubMenu from 'antd/lib/menu/SubMenu'
import CreateMerchants from '../pages/merchants/CreateMerchants'
import ShowMerchants from '../pages/merchants/ShowMerchants'
import CreateMembers from '../pages/members/CreateMembers'
import ShowMembers from '../pages/members/ShowMembers'
import CreateItems from '../pages/items/CreateItems'
import ShowItems from '../pages/items/ShowItems'
import CreateBuyMerchants from '../pages/buy_merchants_purchase/CreateBuyMerchants'
import ShowBuyMerchants from '../pages/buy_merchants_purchase/ShowBuyMerchants'
import CreateExpenses from '../pages/expenses/CreateExpenses'
import ShowExpenses from '../pages/expenses/ShowExpenses'
import CreateExpenseNames from '../pages/expense_names/CreateExpenseNames'
import ShowExpenseNames from '../pages/expense_names/ShowExpenseNames'
import CreateShops from '../pages/shops/CreateShops'
import ShowShops from '../pages/shops/ShowShops'
import CreateAccounts from '../pages/accounts/CreateAccounts'
import ShowAccounts from '../pages/accounts/ShowAccounts'
import CreateBuyItems from '../pages/buy_items/CreateBuyItems'
import ShowBuyItems from '../pages/buy_items/ShowBuyItems'
import CreateCreditSale from '../pages/sales/CreateCreditSale'
import ShowStocks from '../pages/stocks/ShowStocks'
import CreateSupplier from '../pages/supplier/CreateSupplier'
import ShowSupplier from '../pages/supplier/ShowSupplier'
import CreateStock from '../pages/stocks/CreateStock'
import CreateItemTransfer from '../pages/items_transfer/CreateItemTransfer'
import ShowItemTransfer from '../pages/items_transfer/ShowItemTransfer'
import ShowItemChangeList from '../pages/items_transfer/ShowItemChangeList'
import CreateBadItem from '../pages/bad_items/CreateBadItem'
import ShowBadItem from '../pages/bad_items/ShowBadItem'
import CreateStaff from '../pages/staffs/CreateStaff'
import ShowStaff from '../pages/staffs/ShowStaff'
import CreateService from '../pages/services/CreateService'
import ShowService from '../pages/services/ShowService'
import StaffComession from '../pages/staffs/StaffComession'
import DetailMembers from '../pages/members/DetailMembers'
import CreateOwners from '../pages/owners/CreateOwners'
import ShowOwners from '../pages/owners/ShowOwners'
import ItemsReports from '../pages/reports/ItemsReports'
import VoucherReports from '../pages/reports/VoucherReports'
import ServicesReport from '../pages/reports/ServicesReport'
import ReportScreem from '../pages/reports/ReportScreem'
import EditItems from '../pages/items/EditItems'
import EditSupplier from '../pages/supplier/EditSupplier'
import EditMembers from '../pages/members/EditMembers'
import EditService from '../pages/services/EditService'
import EditStaff from '../pages/staffs/EditStaff'
import ShowPriceTracks from '../pages/items/ShowPriceTracks'
import EditShops from '../pages/shops/EditShops'
import EditOwners from '../pages/owners/EditOwners'
import EditAccounts from '../pages/accounts/EditAccounts'
import { logout } from '../store/actions'
import { connect, useSelector } from 'react-redux'
import EditExpenseNames from '../pages/expense_names/EditExpenseNames'
import EditMerchants from '../pages/merchants/EditMerchants'
import EditExpenses from '../pages/expenses/EditExpenses'
import EditBuyMerchants from '../pages/buy_merchants_purchase/EditBuyMerchants'
import ShowPurchases from '../pages/buy_merchants_purchase/ShowPurchases'
import EditBadItem from '../pages/bad_items/EditBadItem'
import ChangePassword from '../pages/change_password/ChangePassword'
import PurchaseReport from '../pages/reports/PurchaseReport'
import DetailMerchant from '../pages/buy_merchants_purchase/DetailMerchant'
import CreateBonus from '../pages/bonus/CreateBonus'
import ShowBonus from '../pages/bonus/ShowBonus'
import EditBonus from '../pages/bonus/EditBonus'
import OutStock from '../pages/stocks/OutStock'
import CreateLuckys from '../pages/luckys/CreateLuckys'
import ShowLuckys from '../pages/luckys/ShowLuckys'
import CreateUnits from '../pages/units/CreateUnits'
import ShowUnits from '../pages/units/ShowUnits'
import EditUnits from '../pages/units/EditUnits'
import UnitStock from '../pages/stocks/UnitStock'
import ShowChangeShopHistories from '../pages/change_shop_history/ShowChangeShopHistories'
import ShowChangeStockHistory from '../pages/change_stock_history/ShowChangeStockHistory'
import CreateRules from '../pages/rules/CreateRules'
import ShowRules from '../pages/rules/ShowRules'
import EditRules from '../pages/rules/EditRules'
import PaginateVoucherReports from '../pages/reports/PaginateVoucherReports'
import PaginateItemsReport from '../pages/reports/PaginateItemsReports'
import DailyReportScreen from '../pages/reports/DailyReportScreen'

const { Header, Footer, Sider, Content } = Layout

const text = (
  <Title level={4} style={{ textAlign: 'center' }}>
    Profile
  </Title>
)

const Admin = ({ logout }) => {
  const { pathname } = useLocation()
  const user = useSelector((state) => state.auth.user)
  // console.log(user.position)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/auth/login', { replace: true })
  }

  const content = (
    <Space direction="vertical" style={{ textAlign: 'center', width: '100%' }}>
      <Title level={5}>
        {user?.name} ({user?.position})
      </Title>
      <Title level={5}>{user?.shop?.name}</Title>
      <Button danger onClick={handleLogout}>
        Logout
      </Button>
    </Space>
  )

  let selectedKey
  switch (pathname) {
    case '/admin/dashboard':
      selectedKey = 'Dashboard'
      break
    case '/admin/change-password':
      selectedKey = 'ChangePassword'
      break
    case '/admin/create-accounts':
      selectedKey = 'CreateAccounts'
      break
    case '/admin/show-accounts':
      selectedKey = 'ShowAccounts'
      break
    case '/admin/show-change-shop-histories':
      selectedKey = 'ShowChangeShopHistories'
      break
    case '/admin/create-merchants':
      selectedKey = 'CreateMerchants'
      break
    case '/admin/show-merchants':
      selectedKey = 'ShowMerchants'
      break

    case '/admin/create-members':
      selectedKey = 'CreateMembers'
      break
    case '/admin/show-members':
      selectedKey = 'ShowMembers'
      break
    case '/admin/edit-members':
      selectedKey = 'EditMembers'
      break

    case '/admin/create-items':
      selectedKey = 'CreateItems'
      break
    case '/admin/show-items':
      selectedKey = 'ShowItems'
      break
    case '/admin/show-price-track-items':
      selectedKey = 'ShowPriceTrackItems'
      break
    case '/admin/edit-items':
      selectedKey = 'EditItems'
      break
    //for show less items
    case '/admin/show-outstocks':
      selectedKey = 'showItemsLess'
      break

    case '/admin/create-buy-merchants':
      selectedKey = 'CreateBuyMerchants'
      break
    case '/admin/show-buy-merchants':
      selectedKey = 'ShowBuyMerchants'
      break
    case '/admin/create-expenses':
      selectedKey = 'CreateExpenses'
      break
    case '/admin/show-expenses':
      selectedKey = 'ShowExpenses'
      break
    case '/admin/create-expense-names':
      selectedKey = 'CreateExpenseNames'
      break
    case '/admin/show-expense-names':
      selectedKey = 'ShowExpenseNames'
      break
    case '/admin/create-rules':
      selectedKey = 'CreateRules'
      break
    case '/admin/show-rules':
      selectedKey = 'ShowRules'
      break
    case '/admin/create-shops':
      selectedKey = 'CreateShops'
      break
    case '/admin/show-shops':
      selectedKey = 'ShowShops'
      break
    case '/admin/create-buy-items':
      selectedKey = 'ShowBuyItems'
      break
    case '/admin/create-supplier':
      selectedKey = 'CreateSupplier'
      break
    case '/admin/show-supplier':
      selectedKey = 'ShowSupplier'
      break
    case '/admin/edit-supplier/:id':
      selectedKey = 'EditSupplier'
      break
    //
    case '/admin/create-stocks':
      selectedKey = 'CreateStocks'
      break
    case '/admin/show-stocks':
      selectedKey = 'ShowStocks'
      break

    case '/admin/show-change-stocks':
      selectedKey = 'ShowChangeStocks'
      break

    case '/admin/create-item-transfer':
      selectedKey = 'ShowItemTransfer'
      break
    case '/admin/show-item-transfer':
      selectedKey = 'CreateItemTransfer'
      break
    case '/admin/show-item-change-list':
      selectedKey = 'ShowItemChangeList'
      break

    case '/admin/create-bad-item':
      selectedKey = 'CreateBadItems'
      break
    case '/admin/show-bad-item':
      selectedKey = 'ShowBadItems'
      break

    case '/admin/create-staff':
      selectedKey = 'CreateStaff'
      break
    case '/admin/show-staff':
      selectedKey = 'ShowStaff'
      break
    case '/admin/edit-staff':
      selectedKey = 'EditStaff'
      break
    case '/admin/show-staff-commession':
      selectedKey = 'StaffCommession'
      break

    case '/admin/create-bonus':
      selectedKey = 'CreateBonus'
      break
    case '/admin/show-bonus':
      selectedKey = 'ShowBonus'
      break
    case '/admin/edit-bonus':
      selectedKey = 'EditBonus'
      break

    case '/admin/create-service':
      selectedKey = 'CreateService'
      break
    case '/admin/show-service':
      selectedKey = 'ShowService'
      break
    case '/admin/create-owner':
      selectedKey = 'CreateOwner'
      break
    case '/admin/show-owner':
      selectedKey = 'ShowOwner'
      break

    case '/admin/create-luckys':
      selectedKey = 'CreateOwner'
      break
    case '/admin/show-luckys':
      selectedKey = 'ShowOwner'
      break

    case '/admin/item-report':
      selectedKey = 'ItemsReports'
      break
    case '/admin/voucher-report':
      selectedKey = 'VouchersReports'
      break
    case '/admin/service-report':
      selectedKey = 'ServicesReports'
      break
    case '/admin/report-screem':
      selectedKey = 'ReportScreem'
      break
    case '/admin/daily-report-screen':
      selectedKey = 'DailyReportScreen'
      break
    case '/admin/purchase-report':
      selectedKey = 'PurchaseReport'
      break

    case '/admin/create-units':
      selectedKey = 'CreateUnits'
      break
    case '/admin/show-units':
      selectedKey = 'ShowUnits'
      break
    //end start
    default:
      selectedKey = 'Dashboard'
      break
  }

  return (
    <Layout>
      <Header style={{ backgroundColor: 'var(--white-color)' }}>
        <img src={Logo} style={{ width: 100, height: 70 }} alt="" />
        <Popover
          placement="bottom"
          content={content}
          title={text}
          trigger="click"
        >
          <Avatar
            style={{
              marginTop: 10,
              float: 'right',
              backgroundColor: 'var(--primary-color)',
            }}
            icon={<UserOutlined />}
            size="large"
          />
        </Popover>
      </Header>
      <Layout>
        <Sider
          style={{ backgroundColor: 'var(--primary-color)', height: '100vh' }}
        >
          <Menu defaultSelectedKeys={[selectedKey]} mode="inline">
            <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
            {user?.position !== 'owner' && (
              <Menu.Item key="Sale" icon={<ShopOutlined />}>
                <Link to="/admin/sale">Sale Screen</Link>
              </Menu.Item>
            )}
            <Menu.Item key="ChangePassword" icon={<LockOutlined />}>
              <Link to="/admin/change-password">Change Password</Link>
            </Menu.Item>
            {(user?.position === 'owner' || user?.position === 'manager') && (
              <SubMenu
                key="Accounts"
                title="အကောင့်များ"
                icon={<FileImageOutlined />}
              >
                <Menu.Item key="ShowAccounts" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/show-accounts">စာရင်း</Link>
                </Menu.Item>

                <Menu.Item key="CreateAccounts" icon={<SaveOutlined />}>
                  <Link to="/admin/create-accounts">အသစ်ဖန်တီးရန်</Link>
                </Menu.Item>
                <Menu.Item key="ShowShops" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/show-shops">ဆိုင်များ</Link>
                </Menu.Item>
              </SubMenu>
            )}
            {user?.position === 'owner' && (
              <Menu.Item
                key="ShowChangeShopHistories"
                icon={<UnorderedListOutlined />}
              >
                <Link to="/admin/show-change-shop-histories">
                  ဆိုင်ပြောင်းစာရင်း
                </Link>
              </Menu.Item>
            )}

            <SubMenu
              key="Merchants"
              title="ကုန်သည်များ"
              icon={<UsergroupAddOutlined />}
            >
              <Menu.Item key="ShowMerchants" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-merchants">စာရင်း</Link>
              </Menu.Item>
              {(user?.position === 'owner' || user?.position === 'manager') && (
                <Menu.Item key="CreateMerchants" icon={<SaveOutlined />}>
                  <Link to="/admin/create-merchants">အသစ်ဖန်တီးရန်</Link>
                </Menu.Item>
              )}
            </SubMenu>
            {user?.position === 'owner' ? (
              <SubMenu
                key="Items"
                title="ပစ္စည်းများ"
                icon={<DatabaseOutlined />}
              >
                <Menu.Item key="ShowItems" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/show-items">ပစ္စည်းများစာရင်း</Link>
                </Menu.Item>
                <Menu.Item
                  key="ShowPriceTrackItems"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/show-price-track-items">
                    ဈေးနှုန်းအပြောင်းလဲများစာရင်း
                  </Link>
                </Menu.Item>

                <Menu.Item key="ShowStocks" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/show-stocks">Stockစာရင်း</Link>
                </Menu.Item>
                <Menu.Item
                  key="ShowChangeStocks"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/show-change-stocks">
                    Stockအပြောင်းလဲ စာရင်း
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="ShowBuyMerchants"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/show-buy-merchants">အဝယ်သွင်းရန်</Link>
                </Menu.Item>
                <Menu.Item
                  key="ShowItemTransfer"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/show-item-transfer">လွှဲပြောင်းရန်</Link>
                </Menu.Item>
                <Menu.Item key="ShowOwner" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/show-owner">ထုတ်သုံးခြင်:</Link>
                </Menu.Item>
                <Menu.Item
                  key="CreateBadItems"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/show-bad-item">ချို့ယွင်းချက်ရှိ</Link>
                </Menu.Item>
                <Menu.Item key="showItemsLess" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/show-outstocks">ပစ္စည်းပြတ်စာရင်း</Link>
                </Menu.Item>
              </SubMenu>
            ) : (
              <SubMenu
                key="Items"
                title="ပစ္စည်းများ"
                icon={<DatabaseOutlined />}
              >
                <Menu.Item key="ShowItems" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/show-items">ပစ္စည်းများစာရင်း</Link>
                </Menu.Item>
                <Menu.Item
                  key="ShowPriceTrackItems"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/show-price-track-items">
                    ဈေးနှုန်းအပြောင်းလဲများစာရင်း
                  </Link>
                </Menu.Item>

                <Menu.Item key="ShowStocks" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/show-stocks">Stockစာရင်း</Link>
                </Menu.Item>
                <Menu.Item
                  key="ShowBuyMerchants"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/show-buy-merchants">အဝယ်သွင်းရန်</Link>
                </Menu.Item>
                <Menu.Item
                  key="ShowItemTransfer"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/show-item-transfer">လွှဲပြောင်းရန်</Link>
                </Menu.Item>
                <Menu.Item key="showItemsLess" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/show-outstocks">ပစ္စည်းပြတ်စာရင်း</Link>
                </Menu.Item>
              </SubMenu>
            )}
            {user?.position === 'owner' && (
              <SubMenu
                key="Staff"
                title="ဝန်ထမ်းစာရင်း"
                icon={<ContactsOutlined />}
              >
                <Menu.Item key="CreateStaff" icon={<SaveOutlined />}>
                  <Link to="/admin/create-staff">အသစ်ဖန်တီးရန်</Link>
                </Menu.Item>
                <Menu.Item key="ShowStaff" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/show-staff">စာရင်း</Link>
                </Menu.Item>

                <Menu.Item
                  key="StaffCommession"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/show-staff-commession">
                    လခနှင့်ကော်မရှင်
                  </Link>
                </Menu.Item>

                <Menu.Item key="Bonus" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/show-bonus">Bonus</Link>
                </Menu.Item>
              </SubMenu>
            )}
            <SubMenu
              key="Expenses"
              title="ကုန်ကျစရိတ်များ"
              icon={<CalculatorOutlined />}
            >
              <Menu.Item key="ShowExpenses" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-expenses">ကုန်ကျစရိတ်များ</Link>
              </Menu.Item>

              <Menu.Item
                key="ShowExpenseNames"
                icon={<UnorderedListOutlined />}
              >
                <Link to="/admin/show-expense-names">အမည်များ</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="ShowRules" icon={<UnorderedListOutlined />}>
              <Link to="/admin/show-rules">စည်းကမ်းများ</Link>
            </Menu.Item>

            <SubMenu
              key="Lucky"
              title="မဲလဲပိုက်ဆံပြန်အမ်း"
              icon={<CalculatorOutlined />}
            >
              <Menu.Item key="ShowMembers" icon={<UnorderedListOutlined />}>
                <Link to="/admin/show-luckys">စာရင်း</Link>
              </Menu.Item>
              <Menu.Item key="CreateMembers" icon={<SaveOutlined />}>
                <Link to="/admin/create-luckys">အသစ်ဖန်တီးရန်</Link>
              </Menu.Item>
            </SubMenu>

            {user?.position === 'owner' ? (
              <SubMenu
                key="Reports"
                title="Reports"
                icon={<FolderAddOutlined />}
              >
                <Menu.Item key="ItemsReports" icon={<SaveOutlined />}>
                  <Link to="/admin/paginate-item-report">Item</Link>
                </Menu.Item>
                <Menu.Item
                  key="VouchersReports"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/paginate-voucher-report">Voucher</Link>
                </Menu.Item>

                <Menu.Item key="ReportScreem" icon={<UnorderedListOutlined />}>
                  <Link to="/admin/report-screem">Report Screen</Link>
                </Menu.Item>
                <Menu.Item
                  key="DailyReportScreen"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/daily-report-screen">
                    Daily Report Screen
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="PurchaseScreem"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/purchase-report">Purchase</Link>
                </Menu.Item>
              </SubMenu>
            ) : (
              <SubMenu
                key="Reports"
                title="Reports"
                icon={<FolderAddOutlined />}
              >
                <Menu.Item key="ItemsReports" icon={<SaveOutlined />}>
                  <Link to="/admin/paginate-item-report">Item</Link>
                </Menu.Item>
                <Menu.Item
                  key="PaginateVouchersReports"
                  icon={<UnorderedListOutlined />}
                >
                  <Link to="/admin/paginate-voucher-report">Voucher</Link>
                </Menu.Item>
              </SubMenu>
            )}
            <Menu.Item key="ShowUnits" icon={<UnorderedListOutlined />}>
              <Link to="/admin/show-units">ယူနစ်</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ minHeight: '520px' }}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="create-accounts" element={<CreateAccounts />} />
              <Route path="show-accounts" element={<ShowAccounts />} />
              <Route path="edit-accounts/:id" element={<EditAccounts />} />

              <Route path="create-merchants" element={<CreateMerchants />} />
              <Route
                path="show-change-shop-histories"
                element={<ShowChangeShopHistories />}
              />
              <Route path="show-merchants" element={<ShowMerchants />} />
              <Route path="edit-merchants/:id" element={<EditMerchants />} />

              <Route path="create-members" element={<CreateMembers />} />
              <Route path="show-members" element={<ShowMembers />} />
              <Route path="detail-members/:id" element={<DetailMembers />} />
              <Route path="edit-members/:id" element={<EditMembers />} />
              {/* supplier */}
              <Route path="create-supplier" element={<CreateSupplier />} />
              <Route path="show-supplier" element={<ShowSupplier />} />
              <Route path="edit-supplier/:id" element={<EditSupplier />} />

              <Route path="create-stocks" element={<CreateStock />} />
              <Route path="show-stocks" element={<ShowStocks />} />
              <Route
                path="show-change-stocks"
                element={<ShowChangeStockHistory />}
              />
              <Route path="show-outstocks" element={<OutStock />} />

              <Route
                path="create-item-transfer"
                element={<CreateItemTransfer />}
              />
              <Route path="show-item-transfer" element={<ShowItemTransfer />} />
              <Route
                path="edit-item-transfer/:id"
                element={<ShowItemTransfer />}
              />
              <Route
                path="show-item-change-list"
                element={<ShowItemChangeList />}
              />

              <Route path="create-bad-item" element={<CreateBadItem />} />
              <Route path="show-bad-item" element={<ShowBadItem />} />
              <Route path="edit-bad-item/:id" element={<EditBadItem />} />

              <Route path="create-staff" element={<CreateStaff />} />
              <Route path="show-staff" element={<ShowStaff />} />
              <Route path="edit-staff/:id" element={<EditStaff />} />
              <Route
                path="show-staff-commession"
                element={<StaffComession />}
              />
              <Route path="show-bonus" element={<ShowBonus />} />
              <Route path="create-bonus" element={<CreateBonus />} />
              <Route path="edit-bonus/:id" element={<EditBonus />} />

              <Route path="create-service" element={<CreateService />} />
              <Route path="show-service" element={<ShowService />} />
              <Route path="edit-service/:id" element={<EditService />} />

              <Route path="create-owner" element={<CreateOwners />} />
              <Route path="show-owner" element={<ShowOwners />} />
              <Route path="edit-owner/:id" element={<EditOwners />} />

              <Route path="item-report" element={<ItemsReports />} />
              <Route
                path="paginate-item-report"
                element={<PaginateItemsReport />}
              />
              <Route path="voucher-report" element={<VoucherReports />} />
              <Route
                path="paginate-voucher-report"
                element={<PaginateVoucherReports />}
              />
              <Route path="service-report" element={<ServicesReport />} />
              <Route path="report-screem" element={<ReportScreem />} />
              <Route
                path="daily-report-screen"
                element={<DailyReportScreen />}
              />
              <Route path="purchase-report" element={<PurchaseReport />} />
              <Route
                path="create-sale-credits/:id"
                element={<CreateCreditSale />}
              />

              {/* for lucky */}
              <Route path="create-luckys" element={<CreateLuckys />} />
              <Route path="show-luckys" element={<ShowLuckys />} />
              <Route path="detail-luckys/:id" element={<DetailMembers />} />
              <Route path="edit-luckys/:id" element={<EditMembers />} />
              {/* for lucky */}

              {/* end supplier */}
              <Route path="create-items" element={<CreateItems />} />
              <Route path="show-items" element={<ShowItems />} />
              <Route
                path="show-price-track-items"
                element={<ShowPriceTracks />}
              />
              <Route path="edit-items/:id" element={<EditItems />} />

              <Route
                path="create-buy-merchants"
                element={<CreateBuyMerchants />}
              />
              <Route path="show-buy-merchants" element={<ShowBuyMerchants />} />
              <Route
                path="edit-buy-merchants/:id"
                element={<EditBuyMerchants />}
              />
              <Route
                path="detail-buy-merchants/:id"
                element={<DetailMerchant />}
              />

              <Route path="show-purchase/:id" element={<ShowPurchases />} />

              <Route path="create-expenses" element={<CreateExpenses />} />
              <Route path="show-expenses" element={<ShowExpenses />} />
              <Route path="edit-expenses/:id" element={<EditExpenses />} />
              <Route
                path="create-expense-names"
                element={<CreateExpenseNames />}
              />
              <Route path="show-expense-names" element={<ShowExpenseNames />} />
              <Route
                path="edit-expense-names/:id"
                element={<EditExpenseNames />}
              />

              <Route path="create-rules" element={<CreateRules />} />
              <Route path="show-rules" element={<ShowRules />} />
              <Route path="edit-rules/:id" element={<EditRules />} />

              <Route path="create-shops" element={<CreateShops />} />
              <Route path="show-shops" element={<ShowShops />} />
              <Route path="edit-shops/:id" element={<EditShops />} />
              <Route path="create-buy-items" element={<CreateBuyItems />} />
              <Route path="show-buy-items" element={<ShowBuyItems />} />
              <Route path="create-units" element={<CreateUnits />} />
              <Route path="show-units" element={<ShowUnits />} />
              <Route path="edit-units/:id" element={<EditUnits />} />
              <Route path="unit-stock/:qty" element={<UnitStock />} />
              <Route path="*" element={<Navigate to="dashboard" />} />
            </Routes>
          </Content>
          <Footer
            style={{
              backgroundColor: 'var(--white-color)',
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'var(--primary-color)',
            }}
          >
            DEVELOP BY RCS
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default connect(null, { logout })(Admin)
