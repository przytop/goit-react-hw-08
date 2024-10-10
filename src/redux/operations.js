import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://6706c451a0e04071d22830e2.mockapi.io";

let fetchDebounceTimeout = null;
let addDebounceTimeout = null;
let deleteDebounceTimeout = null;

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    clearTimeout(fetchDebounceTimeout);

    return new Promise((resolve, reject) => {
      fetchDebounceTimeout = setTimeout(async () => {
        try {
          const response = await axios.get("/contacts");
          resolve(response.data);
        } catch (e) {
          reject(thunkAPI.rejectWithValue(e.message));
        }
      }, 500);
    });
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    clearTimeout(addDebounceTimeout);

    return new Promise((resolve, reject) => {
      addDebounceTimeout = setTimeout(async () => {
        try {
          const response = await axios.post("/contacts/", contact);
          resolve(response.data);
        } catch (e) {
          reject(thunkAPI.rejectWithValue(e.message));
        }
      }, 500);
    });
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact ",
  async (contactId, thunkAPI) => {
    clearTimeout(deleteDebounceTimeout);

    return new Promise((resolve, reject) => {
      deleteDebounceTimeout = setTimeout(async () => {
        try {
          const response = await axios.delete(`/contacts/${contactId}`);
          resolve(response.data);
        } catch (e) {
          reject(thunkAPI.rejectWithValue(e.message));
        }
      }, 500);
    });
  }
);
