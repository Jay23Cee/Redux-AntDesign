 import { Layout, Menu, Breadcrumb } from 'antd';
import '../App.css'
import 'antd/dist/antd.css';
import BookTable from './BookTable'
import Newform from './Newbook'
import { BrowserRouter, Route } from 'react-router-dom';




const { Header, Content, Footer } = Layout;
const Homepage = () => (
  <div >
   <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><a href="/">Home</a></Menu.Item>
        <Menu.Item key="2"><a href="/new">New</a></Menu.Item>

      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="site-layout-content">
      <BrowserRouter>
       <Route exact path="/" component={BookTable}/> 
       <Route path="/New" component={Newform}/>
       
        </BrowserRouter>
        </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  </div>
);

export default Homepage;