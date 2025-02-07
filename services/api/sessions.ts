// import * as SecureStore from 'expo-secure-store';

// export const saveSession = async (session: any) => {
//   try {
//     await SecureStore.setItemAsync('supabase_session', JSON.stringify(session));
//   } catch (error) {
//     console.error('Failed to save session:', error);
//   }
// };

// export const getSession = async () => {
//   try {
//     const sessionString = await SecureStore.getItemAsync('supabase_session');
//     return sessionString ? JSON.parse(sessionString) : null;
//   } catch (error) {
//     console.error('Failed to retrieve session:', error);
//     return null;
//   }
// };

// export const clearSession = async () => {
//   try {
//     await SecureStore.deleteItemAsync('supabase_session');
//   } catch (error) {
//     console.error('Failed to clear session:', error);
//   }
// };
