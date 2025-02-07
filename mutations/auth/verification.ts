import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { verificationOtp } from '~/services/api/authApi';

export const useVerificationMutation = () => {
  return useMutation({
    mutationFn: verificationOtp,
    onSuccess: (data) => {
      console.log('OTP verified successfully:', data); // Debugging log
      router.push('/auth/signin'); // Navigate to the next screen
    },
    onError: (error: any) => {
      console.error('Verification failed:', error); // Debugging log
    },
  });
};
