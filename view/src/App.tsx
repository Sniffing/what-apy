import React from 'react';
import { Provider } from 'mobx-react';
import 'antd/dist/antd.css';
import stores from './stores/Stores';
import { SavingsPage } from './pages/savings';
import { Layout } from 'antd';
import { SiteFooter } from './components/site-footer/site-footer.component';

const { Content, Header } = Layout;

function App() {
  return (
    <Provider {...stores}>
      <Layout style={{minHeight: '100vh'}}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: '4%'}}>
          <SiteFooter/>
        </Header>

        <Content style={{height: '96%', marginTop: '4%'}}>
          <SavingsPage/>
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
