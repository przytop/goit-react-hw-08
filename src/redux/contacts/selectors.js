import { createSelector } from "@reduxjs/toolkit";
import Fuse from "fuse.js";

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
export const selectFilter = (state) => state.filters.filter;

export const selectFilteredContacts = createSelector(
  [selectFilter, selectContacts],
  (filter, contacts) => {
    if (!filter || filter.trim() === "") {
      return contacts;
    }

    const fuse = new Fuse(contacts, {
      keys: ["name", "number"],
      threshold: 0.3,
    });

    const result = fuse.search(filter);

    return result.map(({ item }) => item);
  }
);
