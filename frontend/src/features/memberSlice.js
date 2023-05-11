import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "@utils/axiosInstance";
import { error } from "jquery";

// 회원 로그인, 로그아웃, 회원가입 관리

const initialState = {
  memberId: "",
  password: "",
  nickname: "",
  email: "",
};

// const baseURL = `http://localhost:8000/member-service/auth`;
const baseURL = `${process.env.REACT_APP_BACKEND_URL}/member-service/auth`;

// 로그인
export const login = createAsyncThunk(
  "memberSlice/login",
  async (logins, { rejectWithValue }) => {
    const request = {
      memberId: logins.memberId,
      password: logins.password,
    };
    const url = `${baseURL}/login`;
    try {
      const response = await axios({
        method: "POST",
        url: url,
        data: request,
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 회원가입
export const signup = createAsyncThunk("memberSlice/signup", async (values) => {
  const request = {
    memberId: values.memberId,
    password: values.password,
    nickname: values.nickname,
    email: values.email,
  };
  const url = `${baseURL}/signup`;

  try {
    const response = await axios({
      method: "POST",
      url: url,
      data: request,
    });

    console.log("then이라네", response.data);
    return response.data;
  } catch (err) {
    console.log("여기 들어옴?");
    console.log(err);
    return isRejectedWithValue(err.response.data);
  }
});

// 아이디 중복확인
export const duplicateId = createAsyncThunk(
  "memberSlice/duplicateId",
  async (memberId) => {
    const url = `${baseURL}/check/id/${memberId}`;
    const response = await axios({
      method: "GET",
      url: url,
    });
    return response.data;
  }
);

const memberSlice = createSlice({
  name: "memberCheck",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 로그인
    builder.addCase(login.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "loginSuccess";
      localStorage.setItem("access-token", action.payload.accessToken);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
    });

    // 회원가입
    builder.addCase(signup.pending, (state, action) => {
      console.log("회원가입중", action.payload);
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("회원가입성공", state.result);
    });
    builder.addCase(signup.rejected, (state, action) => {
      console.log("회원가입실패", action.error);
    });

    // 아이디중복확인
    builder.addCase(duplicateId.pending, (state, action) => {
      console.log("아이디중복확인중", action.payload);
    });
    builder.addCase(duplicateId.fulfilled, (state, action) => {
      console.log("아이디중복확인성공", state.result);
    });
    builder.addCase(duplicateId.rejected, (state, action) => {
      console.log("아이디중복확인실패", action.error);
    });
  },
});

export const { memberSeq } = memberSlice.actions;
export default memberSlice.reducer;
