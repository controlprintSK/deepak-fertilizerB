import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PAGE_10: false, //Company
  PAGE_10_ADD: false,
  PAGE_11: false, //Line
  PAGE_11_ADD: false,
  PAGE_12: false, //Product
  PAGE_12_ADD: false,
  PAGE_21: true, // Production
  PAGE_21_ADD: false,
  PAGE_22: false, // Line Manager
  PAGE_23: false, // Sample
  PAGE_26: false, //Password Policy
  PAGE_31: false, //General Settings
  PAGE_40: false, //User Group
  PAGE_41: false, //Users
  PAGE_41_ADD: false,
  PAGE_42: false, //Permissions
  PAGE_50: false, //Audit Logs
  PAGE_51: false, //Production Reports
  PAGE_52: false, //Alarms  Reports
  PAGE_60: false, //Video
  PAGE_61: false, //Manual Documents
  CHANGE_PASSWORD: false,
  ACTIVE_PAGE: "",
};

const navBarSlice = createSlice({
  name: "NavBar",
  initialState,
  reducers: {
    selectNavReducer: (state, { payload }) => {
      state["PAGE_21"] = false;
      state["PAGE_21_ADD"] = false;
      state["PAGE_10"] = false;
      state["PAGE_10_ADD"] = false;
      state["PAGE_11"] = false;
      state["PAGE_11_ADD"] = false;
      state["PAGE_12"] = false;
      state["PAGE_12_ADD"] = false;
      state["PAGE_22"] = false;
      state["PAGE_23"] = false;
      state["PAGE_26"] = false;
      state["PAGE_31"] = false;
      state["PAGE_40"] = false;
      state["PAGE_41"] = false;
      state["PAGE_41_ADD"] = false;
      state["PAGE_42"] = false;
      state["PAGE_50"] = false;
      state["PAGE_51"] = false;
      state["PAGE_52"] = false;
      state["PAGE_60"] = false;
      state["PAGE_61"] = false;
      state["CHANGE_PASSWORD"] = false;
      state[[payload?.value]] = true;
      state["ACTIVE_PAGE"] = payload?.activePage;
    },
    clearNavReducer: (state) => {
      state["PAGE_21"] = false;
      state["PAGE_21_ADD"] = false;
      state["PAGE_10"] = false;
      state["PAGE_10_ADD"] = false;
      state["PAGE_11"] = false;
      state["PAGE_11_ADD"] = false;
      state["PAGE_12"] = false;
      state["PAGE_12_ADD"] = false;
      state["PAGE_22"] = false;
      state["PAGE_23"] = false;
      state["PAGE_26"] = false;
      state["PAGE_31"] = false;
      state["PAGE_40"] = false;
      state["PAGE_41"] = false;
      state["PAGE_41_ADD"] = false;
      state["PAGE_42"] = false;
      state["PAGE_50"] = false;
      state["PAGE_51"] = false;
      state["PAGE_52"] = false;
      state["PAGE_60"] = false;
      state["PAGE_61"] = false;
      state["CHANGE_PASSWORD"] = false;
      state["ACTIVE_PAGE"] = "";
    },
  },
});

export const { selectNavReducer, clearNavReducer } = navBarSlice.actions;

export default navBarSlice.reducer;
