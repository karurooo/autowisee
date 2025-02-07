import { SigninFormData, VerificationFormData } from '~/schema/authSchema';
import { supabase } from '~/services/supabase';

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface VerifyOtpInput {
  email: string;
  otp: string;
}
export const signup = async ({ email, password, firstName, lastName, role }: SignupData) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: role,
        },
      },
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user?.id) {
      throw new Error('User ID is missing. Unable to proceed.');
    }

    return { success: true, user: authData.user };
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};
export const verificationOtp = async ({ email, otp }: VerifyOtpInput) => {
  try {
    console.log('Verifying OTP with:', { email, otp }); // Debugging log

    // 1. Verify OTP
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'signup', // Ensure this matches the type used when sending the OTP
    });

    if (verifyError) {
      console.error('Supabase OTP verification error:', verifyError); // Debugging log
      throw new Error(verifyError.message || 'Invalid OTP. Please try again.');
    }

    console.log('OTP verified successfully'); // Debugging log
  } catch (error) {
    console.error('Verification error:', error); // Debugging log
    throw error;
  }
};

export const signin = async ({ email, password }: SigninFormData) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
};
