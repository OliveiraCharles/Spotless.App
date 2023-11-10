// orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  name: string;
  serviceType: string;
  phone: string;
  description: string;
  address: string;
  price: number;
  date: string;
}

interface OrderState {
  order: OrderItem[];
}

const initialOrderState: OrderState = {
  order: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderItem>) => {
      state.order.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.order = state.order.filter(
        (item) =>
          item.name !== action.payload &&
          item.address !== action.payload &&
          item.phone !== action.payload
      );
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
