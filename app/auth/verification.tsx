import React, { useEffect } from 'react';
import { View, Text, Pressable, Touchable, TouchableOpacity } from 'react-native';
import { Button } from '~/components/buttons/PrimaryButton';
import { Container } from '~/components/shared/Container';
import FormField from '~/components/form_fields/FormFields';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verificationSchema, VerificationFormData } from '~/schema/authSchema';
import BottomSheet from '~/components/bottom_sheet';
import { useResendOtpMutation } from '~/mutations/auth/resendOtp';
import { useVerificationMutation } from '~/mutations/auth/verification';
import { useTimer } from '~/hooks/utils/useTimer';
import { router, useLocalSearchParams } from 'expo-router';

export default function Verification() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
    setErrorMessage('');
  };

  // Timer logic
  const { timeLeft, isActive, startTimer } = useTimer(60); // 60-second timer

  // Start the timer when the component mounts
  useEffect(() => {
    if (email) {
      startTimer(); // Automatically start the timer on page load
    }
  }, [email]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      otp: '',
    },
  });

  const { mutate: verifyOtp, isPending: isVerifying } = useVerificationMutation();
  const { mutate: resendOtp, isPending: isResending } = useResendOtpMutation();
  useEffect(() => {
    console.log('Form errors:', errors); // Debugging log
  }, [errors]);
  const onSubmit = (data: VerificationFormData) => {
    console.log('Form submitted:', data); // Debugging log
    if (!email) {
      setErrorMessage('Email is missing. Please try again.');
      setIsBottomSheetVisible(true);
      return;
    }

    console.log('Calling verifyOtp with:', { email, otp: data.otp }); // Debugging log
    verifyOtp(
      { email, otp: data.otp }, // Pass both email and OTP
      {
        onError: (error: any) => {
          console.error('Error during OTP verification:', error); // Debugging log
          setErrorMessage(error.message);
          setIsBottomSheetVisible(true);
        },
      }
    );
  };

  const handleResendOtp = () => {
    if (!email) {
      setErrorMessage('Email is missing. Please try again.');
      setIsBottomSheetVisible(true);
      return;
    }
    resendOtp(
      { email },
      {
        onSuccess: () => {
          startTimer(); // Restart the timer
        },
        onError: (error: any) => {
          setErrorMessage(error.message);
          setIsBottomSheetVisible(true);
        },
      }
    );
  };

  return (
    <Container scrollable={false}>
      <View className="mt-4 h-10"></View>
      <View className="mx-4 h-5/6 flex-1  items-center ">
        <Text className="text-3xl font-bold text-text_primary">Code Verification</Text>
        <Text className="mt-2 text-center text-lg font-medium text-secondary">
          Enter the 6-digit code sent to {email}.
        </Text>
        <View className="my-4">
          {/* OTP Input Field */}
          <FormField
            control={control}
            name="otp"
            label="Verification Code"
            keyboardType="number-pad"
            maxLength={6}
          />
          {/* Submit Button */}

          <Button
            className="mt-4 bg-primary"
            title={isVerifying ? 'Verifying...' : 'Verify'}
            onPress={handleSubmit(onSubmit)}
            disabled={isVerifying}
          />
          {/* Resend OTP Button */}
          <View className="mt-4 flex-row justify-center">
            <Text className="text-secondary">Didn't receive the code? </Text>
            <Pressable
              onPress={handleResendOtp}
              disabled={isActive || isResending} // Disable the button while the timer is active
            >
              <Text className="font-semibold text-accent underline">
                {isActive ? `Resend (${timeLeft}s)` : 'Resend'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <BottomSheet
        isVisible={isBottomSheetVisible}
        onClose={closeBottomSheet}
        title="Error"
        message={errorMessage}
      />
    </Container>
  );
}
