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
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, userClear } from "@/redux/userSlice";
import store from "@/store/index";
import { LOGOUT } from "../api";
import { postAPI } from "@/utils/apiRequest";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import { displayMessage } from "@/utils/common";

const { DirectoryTree } = Tree;

export default function MainLayout(props) {
  let { children } = props;
  const router = useRouter();
  const { user } = useSelector((state) => state.userInfo);
  const { userModules, pageRight } = useSelector((state) => state.rightInfo);
  const dispatch = useDispatch();
  const [treeDataMainMenu, setTreeDataMainMenu] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const navBarInfo = useSelector((state) => state?.navBarInfo);
  const [defaultSelectedKey, setDefaultSelectedKey] = useState([]);
  const [defaultExpandedKey, setDefaultExpandedKey] = useState([]);

  const IconRenderer = ({ iconName }) => {
    const IconComponent = Icons[iconName];

    if (!IconComponent) {
      return null;
    }

    return <IconComponent />;
  };

  useEffect(() => {
    const token = accessToken(store.getState());
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const logoutFunction = async () => {
    setDataLoading(true);
    try {
      let item = {
        user: user?.id,
      };
      const res = await postAPI(LOGOUT, item);
      if (res?.status == 200) {
        displayMessage(SUCCESS_MSG_TYPE, res?.message);
        dispatch(userClear());
        setDataLoading(false);
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setDataLoading(false);
      displayMessage(ERROR_MSG_TYPE, error?.message);
    }
  };

  useEffect(() => {
    let sidemenu = [];
    userModules?.forEach((module, ind) => {
      let pageitem = [];
      if (module?.pages && module?.pages.length) {
        pageitem = [];
        module?.pages?.forEach((page, ind2) => {
          if (
            (user.UserRole == "VIEWER" || "superadmin") &&
            !user?.CurrentCompany
          ) {
            if ([10, 20, 30, 40, 33, 34, 50, 51]?.includes(page?.PageId)) {
              pageitem.push({
                title: (
                  <Link
                    className="menu-link"
                    data-pageid={page?.PageId}
                    data-rights={JSON.stringify(page?.Rights)}
                    href={page?.PageUrl}
                  >
                    {page?.DisplayName}
                  </Link>
                ),
                key: `MODULE_${module?.ModuleId}-PAGE_${page?.PageId}`,
              });
              if (ind == 0 && ind2 == 0) {
                setDefaultSelectedKey([
                  `MODULE_${module?.ModuleId}-PAGE_${page?.PageId}`,
                ]);
                setDefaultExpandedKey([`MODULE_${module?.ModuleId}`]);
                if (!navBarInfo["ACTIVE_PAGE"]) {
                  dispatch(
                    selectNavReducer({
                      value: `PAGE_${page?.PageId}`,
                      activePage: `MODULE_${module?.ModuleId}-PAGE_${page?.PageId}`,
                    })
                  );
                }
              }
            }
          } else {
            pageitem.push({
              title: (
                <Link
                  className="menu-link"
                  data-pageid={page?.PageId}
                  data-rights={JSON.stringify(page?.Rights)}
                  href={page?.PageUrl}
                >
                  {page?.DisplayName}
                </Link>
              ),
              key: `MODULE_${module?.ModuleId}-PAGE_${page?.PageId}`,
            });
          }
        });
        // .filter(Boolean); // Remove undefined
      }

      if (
        (user.UserRole == "VIEWER" || "superadmin") &&
        !user?.CurrentCompany
      ) {
        if ([1, 2, 3, 4, 5, 7]?.includes(module?.ModuleId)) {
          sidemenu.push({
            title: module?.ModuleName,
            key: "module_" + module?.ModuleId,
            children: pageitem,
          });
        }
      } else {
        sidemenu.push({
          title: module?.ModuleName,
          // key: 'module_' + module?.ModuleId,
          key: `MODULE_${module?.ModuleId}`,
          children: pageitem,
          icon: <IconRenderer iconName={module?.Icon} />,
        });
      }
    });

    setTreeDataMainMenu(sidemenu);
  }, [JSON.stringify(userModules)]);

  const onMenuExpand = (keys, info) => {
    let key = String(info?.node?.key)?.split("-")[0];
    setDefaultExpandedKey([key]);
  };

  const onMenuSelect = (keys, info) => {
    setDefaultSelectedKey([info?.node?.key]);
    let selectedMenu = String(info?.node?.key)?.split("-");
    if (selectedMenu?.length > 1) {
      dispatch(
        selectNavReducer({
          value: selectedMenu[1],
          activePage: info?.node?.key,
        })
      );
    }
  };

  useEffect(() => {
    if (navBarInfo["ACTIVE_PAGE"]) {
      let keys = String(navBarInfo["ACTIVE_PAGE"])?.split("-");
      setDefaultExpandedKey([keys[0]]);
      let activePage = String(navBarInfo["ACTIVE_PAGE"]).replace("_ADD", "");
      setDefaultSelectedKey([activePage]);
    } else {
      setDefaultExpandedKey([]);
      setDefaultSelectedKey([]);
    }
  }, [JSON.stringify(navBarInfo)]);

  useEffect(() => {
    if (user?.RequiresPasswordReset == 1) {
      router.push("/user-management/change-password");
    }
  }, []);

  return (
    <main className="qc_main_layout">
      {/* --------- main wrapper --------- */}
      <section className="qc_main_wrapper">
        {/* --------- side panel --------- */}
        <aside className="qc_main_side_bar">
          <div className="qc__logo">
            <Image
              src="http://13.203.77.96:9625/mankind/images/qriouscodes-logo.png"
              alt="Qrious Codes Logo"
              preview={false}
            />
          </div>
          <div
            className="tree_nav"
            style={
              user?.RequiresPasswordReset == 1 ? { pointerEvents: "none" } : {}
            }
          >
            {/* <div className="qc__logo"> */}
            <DirectoryTree
              multiple
              selectedKeys={defaultSelectedKey}
              expandedKeys={defaultExpandedKey}
              switcherIcon={<DownOutlined />}
              showIcon={false}
              onSelect={onMenuSelect}
              onExpand={onMenuExpand}
              treeData={treeDataMainMenu}
              disabled={user?.RequiresPasswordReset == 1}
            />
          </div>
        </aside>
        {/* --------- right sec --------- */}
        <section className="qc_content_right_sec">
          {/* --------- header --------- */}
          <Header user={user} />
          {/* --------- componets container --------- */}
          <div className="qc_container">{children}</div>
        </section>
      </section>
    </main>
  );
}
