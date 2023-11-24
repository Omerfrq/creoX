import { AlertType } from '@/src/types/helpers';
import { createSlice } from '@reduxjs/toolkit';

interface AlertProps {
  message?: string;
  showAlert: boolean;
  autoHide: number;
  type: AlertType;
  description?: string;
}

const AlertState: AlertProps = {
  showAlert: false,
  autoHide: 5000,
  type: 'success',
};

const Alert = createSlice({
  name: 'alertSlice',
  initialState: AlertState,
  reducers: {
    setAlert: (state, action) => {
      const { type, message, autoHide, description } = action.payload;
      state.showAlert = true;
      state.type = type;
      state.message = message;
      state.autoHide = autoHide ?? 5000;
      state.description = description;
    },
    handleCloseAlert: (state) => {
      state.showAlert = false;
    },
  },
});

export type AlertActions = typeof Alert.actions;

export const { setAlert, handleCloseAlert } = Alert.actions;

export default Alert.reducer;
