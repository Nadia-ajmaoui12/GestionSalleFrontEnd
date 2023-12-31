import get from 'lodash/get';

export const selectUsers = (state: any) => get(state, 'main.users', []);
export const selectUser = (state: any) => get(state, 'main.user', []);
export const selectReservations = (state: any) =>
  get(state, 'main.reservations', []);
export const selectSpots = (state: any) => get(state, 'main.spots', []);
export const selectClients = (state: any) => get(state, 'main.clients', []);
export const selectAvailableSpots = (state: any) =>
  get(state, 'main.availableSpots', []);

//   export const selectQuoteOfTheDay = (state: any) =>
//   get(state, "main.quoteOfTheDay", emptyQuote);

//   export const selectDialogs = (state: any) => get(state, "main.dialogs", {});
// export const selectIsSusbcribeUserOpen = createSelector(
//   [selectDialogs],
//   (dialogs: any) => get(dialogs, SUBSCRIBE_USER_DIALOG, false)
// );

// export const selectIsCreateNewQuoteOpen = createSelector(
//   [selectDialogs],
//   (dialogs: any) => get(dialogs, CREATE_NEW_QUOTE_DIALOG, false)
// );

// export const selectIsQuoteOfTheDayOpen = createSelector(
//   [selectDialogs],
//   (dialogs: any) => get(dialogs, QUOTE_OF_THE_DAY_DIALOG, false)
// );

// export const selectFilteredList = createSelector(
//   [selectQuotes, (_, keyword) => lowerCase(keyword)],
//   (Quotes, keyword) =>
//     Quotes.filter(
//       (item: Quote) => item.tags && lowerCase(item.tags).includes(keyword)
//     )
// );
