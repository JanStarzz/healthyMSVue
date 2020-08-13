import Vue from 'vue'
import {
  Button,
  Submenu,
  Menu,
  MenuItem,
  MenuItemGroup,
  Container,
  Header,
  Aside,
  Main,
  Table,
  TableColumn,
  FormItem,
  Form,
  Pagination,
  Card,
  Message,
  Input,
  Dialog,
  Row,
  Col
} from 'element-ui'

Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Pagination)
Vue.use(Card)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)

// 这样使用message不会弹出空白消息
Vue.component(Message.name, Message)
Vue.prototype.$message = Message
