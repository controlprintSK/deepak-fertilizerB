"use client";
import "@/styles/globals.scss";
import "@/styles/ant-styles.scss";
import "@/styles/global-classes.scss";
import "@/styles/styles.scss";
import "@/styles/main-layout/main-layout-style.scss";
import "@ant-design/v5-patch-for-react-19";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { ConfigProvider } from "antd";
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import store from '@/store/index';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
let persistor = persistStore(store);

export default function RootLayout({ children }) {
  return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#fa3a5c",
            borderColor: "#d9d9d9",
            fontFamily: `Roboto, sans-serif`,
          },
        }}>
        <html lang="en">
          <body>
            <StyledComponentsRegistry>
              <Provider store={store}>
                <PersistGate persistor={persistor}>
                  <main>{children}</main>{' '}
                </PersistGate>
              </Provider>
            </StyledComponentsRegistry>
          </body>
        </html>
      </ConfigProvider>
  );
}
