import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
import * as SecureStore from 'expo-secure-store';
const secureStore = {
  getItem: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  },

  setItem: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },

  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};
export const supabase =createClient(
    supabaseUrl,
    supabaseKey,
    {
    auth: {
      storage: secureStore,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)