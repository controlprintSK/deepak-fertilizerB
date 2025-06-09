import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companyList: [],
  currentCompany: '',
  userRoleList: [],
  departmentList: [],
};

const utilitiesListSlice = createSlice({
  name: 'utilities',
  initialState,
  reducers: {
    setCompanyList: (state, { payload }) => {
      state.companyList = payload;
    },
    setCurrentCompany: (state, { payload }) => {
      state.currentCompany = payload;
    },
    setUserRoleList: (state, { payload }) => {
      state.userRoleList = payload;
    },
    setDepartmentList: (state, { payload }) => {
      state.departmentList = payload;
    },
  },
});

export const {
  setCompanyList,
  setCurrentCompany,
  setUserRoleList,
  setDepartmentList,
} = utilitiesListSlice.actions;

export default utilitiesListSlice.reducer;
