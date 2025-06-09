"use client";
import {
  AlertOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
  BellOutlined,
  BranchesOutlined,
  CalculatorOutlined,
  CodeSandboxOutlined,
  DashboardOutlined,
  DownOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  FileTextOutlined,
  LockOutlined,
  QrcodeOutlined,
  RollbackOutlined,
  SettingOutlined,
  SwapOutlined,
  SyncOutlined,
  TruckOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { Image, Spin, Tree } from "antd";
import Header from "./Header";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { DirectoryTree } = Tree;

export default function MainLayout(props) {
  let { children } = props;
  const [expandedKeys] = useState(["Master"]);
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Trigger loader on pathname change
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  // Custom Link Wrapper
  const LoaderLink = ({ href, children }) => {
    const pathname = usePathname(); // Use inside the component
    return (
      <Link
        href={href}
        onClick={(e) => {
          if (pathname === href) {
            e.preventDefault(); // prevent reload or re-trigger
            return;
          }
          setLoading(true);
        }}>
        <span className="menu-link">{children}</span>
      </Link>
    );
  };

  const treeData = [
    {
      title: <LoaderLink href="/dashboard">Dashboard</LoaderLink>,
      key: "dashboard",
      icon: <DashboardOutlined />,
    },
    {
      title: "Master",
      key: "master",
      icon: <AppstoreOutlined />,
      children: [
        {
          title: <LoaderLink href="/master/plant">Plant</LoaderLink>,
          key: "plant",
          icon: <BranchesOutlined />,
          isLeaf: true,
        },
        {
          title: <LoaderLink href="/master/line">Line</LoaderLink>,
          key: "line",
          icon: <ApartmentOutlined />,
          isLeaf: true,
        },
        {
          title: <LoaderLink href="/master/products">Products</LoaderLink>,
          key: "product",
          icon: <CodeSandboxOutlined />,
          isLeaf: true,
        },
        {
          title: <LoaderLink href="/master/customer">Customer</LoaderLink>,
          key: "customer",
          icon: <UsergroupAddOutlined />,
          isLeaf: true,
        },
      ],
    },
    {
      title: "Transaction",
      key: "transaction",
      icon: <SyncOutlined />,
      children: [
        {
          title: (
            <LoaderLink href="/transaction/qr-generation">
              QR Generation
            </LoaderLink>
          ),
          key: "qr_generation",
          icon: <QrcodeOutlined />,
          isLeaf: true,
        },
        {
          title: <LoaderLink href="/transaction/qr-print">QR Print</LoaderLink>,
          key: "qr_print",
          icon: <QrcodeOutlined />,
          isLeaf: true,
        },
        {
          title: (
            <LoaderLink href="/transaction/production">Production</LoaderLink>
          ),
          key: "production",
          icon: <UnorderedListOutlined />,
          isLeaf: true,
        },
        {
          title: (
            <LoaderLink href="/transaction/branch-transfer">
              Branch Transfer
            </LoaderLink>
          ),
          key: "branch_transfer",
          icon: <SwapOutlined />,
          isLeaf: true,
        },
        {
          title: (
            <LoaderLink href="/transaction/invoice-dispatch">
              Invoice/Dispatch
            </LoaderLink>
          ),
          key: "invoice_dispatch",
          icon: <TruckOutlined />,
          isLeaf: true,
        },
        {
          title: <LoaderLink href="/transaction/returns">Return</LoaderLink>,
          key: "returns",
          icon: <RollbackOutlined />,
          isLeaf: true,
        },
      ],
    },
    {
      title: "Configuration",
      key: "configuration",
      icon: <SettingOutlined />,
      children: [
        {
          title: (
            <LoaderLink href="/configuration/password-policy">
              Password Policy
            </LoaderLink>
          ),
          key: "password_policy",
          icon: <LockOutlined />,
          isLeaf: true,
        },
        {
          title: (
            <LoaderLink href="/configuration/general-setting">
              General Setting
            </LoaderLink>
          ),
          key: "general_setting",
          icon: <SettingOutlined />,
          isLeaf: true,
        },
      ],
    },
    {
      title: "User management",
      key: "user_management",
      icon: <UsergroupAddOutlined />,
      children: [
        {
          title: (
            <LoaderLink href="/user-management/user-group">
              User Group
            </LoaderLink>
          ),
          key: "user_group",
          icon: <UsergroupAddOutlined />,
          isLeaf: true,
        },
        {
          title: <LoaderLink href="/user-management/users">Users</LoaderLink>,
          key: "Users",
          icon: <UserOutlined />,
          isLeaf: true,
        },
        {
          title: (
            <LoaderLink href="/user-management/permissions">
              Permissions
            </LoaderLink>
          ),
          key: "permissions",
          icon: <UserSwitchOutlined />,
          isLeaf: true,
        },
      ],
    },
    {
      title: "Reports",
      key: "reports",
      icon: <FileTextOutlined />,
      children: [
        {
          title: "Logs",
          key: "logs",
          icon: <FileTextOutlined />,
          // isLeaf: true,
          children: [
            {
              title: (
                <LoaderLink href="/reports/logs/audit-logs">
                  Audit Logs
                </LoaderLink>
              ),
              key: "audit_logs",
              icon: <FileSearchOutlined />,
              isLeaf: true,
            },
            {
              title: (
                <LoaderLink href="/reports/logs/alarm-reports">
                  Alarm Reports
                </LoaderLink>
              ),
              key: "alarm_reports",
              icon: <AlertOutlined />,
              isLeaf: true,
            },
          ],
        },
        {
          title: "Transaction",
          key: "transaction_report",
          icon: <SyncOutlined />,
          // isLeaf: true,
          children: [
            {
              title: (
                <LoaderLink href="/reports/transaction/production-reports">
                  Production
                </LoaderLink>
              ),
              key: "production_reports",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
            {
              title: (
                <LoaderLink href="/reports/transaction/branch-transfer">
                  Branch Transfer
                </LoaderLink>
              ),
              key: "branch_transfer_report",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
            {
              title: (
                <LoaderLink href="/reports/transaction/invoice">
                  Invoice
                </LoaderLink>
              ),
              key: "invoice_reports",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
            {
              title: (
                <LoaderLink href="/reports/transaction/returns">
                  Returns
                </LoaderLink>
              ),
              key: "returns_reports",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
          ],
        },
        {
          title: "Stock",
          key: "stock",
          icon: <CalculatorOutlined />,
          // isLeaf: true,
          children: [
            {
              title: (
                <LoaderLink href="/reports/stock/stock-in-hand">
                  Stock In Hand
                </LoaderLink>
              ),
              key: "stock_in_hand",
              icon: <FileDoneOutlined />,
              isLeaf: true,
            },
            {
              title: (
                <LoaderLink href="/reports/stock/stock-ageing">
                  Stock Ageing
                </LoaderLink>
              ),
              key: "stock_ageing",
              icon: <FileProtectOutlined />,
              isLeaf: true,
            },
            {
              title: (
                <LoaderLink href="/reports/stock/stock-in-transit">
                  Stock In Transit
                </LoaderLink>
              ),
              key: "stock_in_transit",
              icon: <FileSyncOutlined />,
              isLeaf: true,
            },
            {
              title: (
                <LoaderLink href="/reports/stock/stock-ledger">
                  Stock Ledger
                </LoaderLink>
              ),
              key: "stock_ledger",
              icon: <FileTextOutlined />,
              isLeaf: true,
            },
          ],
        },
      ],
    },
  ];

  const onSelect = (keys, info) => {
    // console.log("Trigger Select--->>--", keys, info);
  };

  const onExpand = (keys, info) => {
    // console.log("Trigger Expand--->>--", keys, info);
  };
  return (
    <main className="qc_main_layout">
      {loading && (
        <div className="qc_page_loader">
          <Spin size="large" />
        </div>
      )}
      {/* --------- main wrapper --------- */}
      <section className="qc_main_wrapper">
        {/* --------- side panel --------- */}
        <aside className="qc_main_side_bar">
          <div className="qc__logo">
            <Image
              src="/images/qriouscodes-logo.png"
              alt="Qrious Codes Logo"
              preview={false}
            />
          </div>
          <div className="tree_nav">
            <DirectoryTree
              multiple
              defaultExpandedKeys={expandedKeys}
              switcherIcon={<DownOutlined />}
              onSelect={onSelect}
              onExpand={onExpand}
              treeData={treeData}
            />
          </div>
        </aside>
        {/* --------- right sec --------- */}
        <section className="qc_content_right_sec">
          {/* --------- header --------- */}
          <Header />
          {/* --------- componets container --------- */}
          <div className="qc_container">{children}</div>
        </section>
      </section>
    </main>
  );
}
