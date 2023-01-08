import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({ // useState 역할
  name: 'user', // 이름
  initialState: { name: 'kim', age: 20 }, // 값
  reducers: {
    // state 수정하는 함수
    changeName(state) {
      // state가 object/array면 리턴 없이 직접 수정 가능
      state.name = 'park';
    },
    changeAge(state, action) {
      state.age += action.payload;
    },
    수정함수2() { }
  }
});

export let { changeName, changeAge, 수정함수2 } = user.actions;

export default user;