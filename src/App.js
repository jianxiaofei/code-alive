import React from 'react';
import { Layout } from 'antd';
import Sider from './components/Sider';
import Header from './components/Header';
import Content from './pages/Content';
import Footer from './components/Footer';

export default function App() {
  return (
    <Layout>
      <Sider />
      <Layout>
        <Layout.Header children={<Header />} />
        <Layout.Content children={<Content />} />
        <Layout.Footer children={<Footer />} />
      </Layout>
    </Layout>
  );
}
