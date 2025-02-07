import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Button } from '~/components/buttons/PrimaryButton';
import { Container } from '~/components/shared/Container';
import { Checkbox } from '~/components/checkbox';
import { useSignupMutation } from '~/mutations/auth/signup'; // Import the useSignupMutation hook
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, SigninFormData } from '~/schema/authSchema';
import BottomSheet from '~/components/bottom_sheet';
import FormField from '~/components/form_fields/FormFields'; // Import the reusable FormField
import RoleSelector from '~/components/form_fields/RoleSelector'; // Import the reusable RoleSelector
import { useSigninMutation } from '~/mutations/auth/signin';
import { router } from 'expo-router';

export default function Signin() {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const closeBottomSheet = useCallback(() => {
    setIsBottomSheetVisible(false);
    setErrorMessage('');
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending, error: mutationError } = useSigninMutation();
  const prevErrorMessageRef = useRef<string | null>(null);

  useEffect(() => {
    if (mutationError) {
      if (mutationError.message.includes('sending confirmation email')) {
        setErrorMessage(
          'There was an issue sending the confirmation email. Please try again later.'
        );
      } else {
        setErrorMessage(mutationError.message);
      }
      setIsBottomSheetVisible(true);
      prevErrorMessageRef.current = mutationError.message;
    }
  }, [mutationError]);

  const onSubmit = (data: SigninFormData) => {
    mutate({
      email: data.email,
      password: data.password,
    });
    console.log('form data: ', data);
  };

  return (
    <Container scrollable={true}>
      <View className="mt-4 items-center justify-center"></View>
      <View className="mx-4 h-5/6 flex-1">
        <View className="mt-10">
          <Text className="text-3xl font-bold text-text_primary">Create an account</Text>
          <Text className="text-lg font-bold text-secondary">
            Enter your account details to get started
          </Text>
        </View>
        <View className="my-4">
          <FormField control={control} name="email" label="Email" keyboardType="email-address" />
          <FormField control={control} name="password" label="Password" isPassword />

          {/* Submit Button */}
          <Button
            className="bg-primary"
            title={isPending ? 'Signing Up...' : 'Sign Up'}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          />
          <View className="my-2 flex-row justify-center gap-1">
            <Text className="font-Poppins text-center text-text_primary">
              Don't have an account?
            </Text>
            <Pressable onPress={() => router.push('/auth/signup')}>
              <Text className="font-Poppins text-center font-medium text-text_primary">Signup</Text>
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
