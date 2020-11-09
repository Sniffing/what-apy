import React from 'react';
import { Provider } from 'mobx-react';
import 'antd/dist/antd.css';
import stores from './stores/Stores';
import { SavingsPage } from './pages/savings';
import { Layout } from 'antd';
import { SiteFooter } from './components/site-footer/site-footer.component';

const { Content, Footer } = Layout;

function App() {
  return (
    <Provider {...stores}>
      <Layout style={{height: '100vh'}}>
        <Content>
          <SavingsPage/>
        </Content>
        <Footer>
          <SiteFooter/>
        </Footer>
      </Layout>
    </Provider>
  );
}

export default App;
