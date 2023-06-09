import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "@utils/axiosInstance";

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (id, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(
        `${process.env.REACT_APP_BACKEND_URL}/board-service/api/v1/message/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Error fetching messages:", error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await customAxios.post(
        `${process.env.REACT_APP_BACKEND_URL}/board-service/api/v1/message`,
        messageData
      );

      if (!response) {
        throw new Error("메시지 전송 실패");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue("메시지 전송 실패");
    }
  }
);


const initialState = {
    chatRoom: [],   // 채팅방 목록
    selectedChatRoom: '', // 선택된 채팅방
    messages: [],   // 선택된 채팅방의 메시지 목록
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChatRooms: (state, action) => {
            state.chatRooms = action.payload;
        },
        setSelectedChatRoom: (state, action) => {
            state.selectedChatRoom = action.payload;
        },
        setMessages: (state, action) => {
          state.messages = action.payload;
        },
        addMessage: (state, action) => {
          state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
          })
          .addCase(sendMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
          });
      },
});



export const { setChatRooms, setSelectedChatRoom, setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;