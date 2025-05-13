import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Booking {
  booking_id: string;
  uuid: string;
  booking_date: string;
  booking_time: string;
  location: string;
  booking_type: string;
  status: string;
}

interface BookingState {
  upcoming: Booking[];
  cancelled: Booking[];
}

const initialState: BookingState = {
  upcoming: [],
  cancelled: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.upcoming = action.payload.filter(b => b.status === 'pending');
      state.cancelled = action.payload.filter(b => b.status === 'cancelled');
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const bookingId = action.payload;
      const booking = state.upcoming.find(b => b.booking_id === bookingId);
      if (booking) {
        booking.status = 'cancelled';
        state.upcoming = state.upcoming.filter(b => b.booking_id !== bookingId);
        state.cancelled.push(booking);
      }
    },
  },
});

export const {setBookings, cancelBooking} = bookingSlice.actions;
export default bookingSlice.reducer;
