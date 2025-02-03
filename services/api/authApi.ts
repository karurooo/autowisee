import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { supabase } from '~/services/supabase';

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}
const signup = async ({ email, password, firstName, lastName, role }: SignupData) => {
  try {
    // Step 1: Create the user in the auth table
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user?.id) {
      throw new Error('User ID is missing. Unable to proceed.');
    }

    // No need to manually insert into the users table if using a trigger
    return { success: true, user: authData.user };
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export { signup };
