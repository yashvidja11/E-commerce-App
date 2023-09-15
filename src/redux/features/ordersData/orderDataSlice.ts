import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CartItem {
    id?: number;
    name: string;
    price: number;
    quantity: number;
    
  }
  interface FormValues {
    firstName?: string;
    lastName?: string;
    companyName?: string;
    country?: string;
    streetAddress?: string;
    streetAddress2?: string;
    townCity?: string;
    state?: string;
    postalCode?: string;
    phone?: string;
    emailAddress?: string;
    orderNotes?: string;
    shipping?: string;
    paymentMethod?: string;
  }
interface Order {
    id: string; 
    order: CartItem[];
    totalAmount: string;
    address: FormValues;
    date : string;
    deliverydate : string;
    estimatedDeliveryDate : string;
  }

interface OrdersDataState {
  orders: Order[];
}

const initialState: OrdersDataState = {
  orders: [],
};

const OrdersDataSlice = createSlice({
  name: "OrdersData",
  initialState,
  reducers: {
    ordersInfo: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    orderData: (state, action)=>{
      state.orders = action.payload
    }
  },
});

export const { ordersInfo ,orderData} = OrdersDataSlice.actions;
export default OrdersDataSlice.reducer;
