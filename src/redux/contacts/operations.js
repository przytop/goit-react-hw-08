import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    let debounceTimeout;

    return new Promise((resolve, reject) => {
      clearTimeout(debounceTimeout);

      debounceTimeout = setTimeout(async () => {
        try {
          const response = await axios.get("/contacts");
          resolve(response.data);
        } catch (error) {
          reject(thunkAPI.rejectWithValue(error.message));
        }
      }, 500);
    });
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact ",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact ",
  async ({ contactId, contact }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${contactId}`, contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
