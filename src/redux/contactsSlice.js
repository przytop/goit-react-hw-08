import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleFulfilled = (operation) => (state, action) => {
  state.loading = false;
  state.error = null;

  if (operation === "fetch") {
    state.items = action.payload;
  } else if (operation === "add") {
    state.items.push(action.payload);
  } else if (operation === "delete") {
    state.items = state.items.filter((item) => item.id !== action.payload.id);
  }
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsInitialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFulfilled("fetch"))
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, handleFulfilled("add"))
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleFulfilled("delete"))
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export default contactsSlice.reducer;
