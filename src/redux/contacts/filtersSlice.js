import { createSlice } from "@reduxjs/toolkit";

const filtersInitialState = {
  filter: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {
    setFilters(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
