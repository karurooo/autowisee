import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { signup } from '~/services/api/authApi';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: (data, variables) => {
      console.log('User signed up successfully:', data);
      // Navigate to the Verification screen and pass the email
      router.push({
        pathname: '/',
        params: { email: variables.email },
      });
    },
    onError: (error) => {
      console.error('Signup failed:', error);
    },
  });
};
