import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from '~/components/buttons/PrimaryButton';
import { Container } from '~/components/shared/Container';
import { Checkbox } from '~/components/checkbox';
import { useSignupMutation } from '~/mutations/auth/signup'; // Import the useSignupMutation hook
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormData } from '~/schema/authSchema';
import BottomSheet from '~/components/bottom_sheet';
import FormField from '~/components/form_fields/FormFields'; // Import the reusable FormField
import RoleSelector from '~/components/form_fields/RoleSelector'; // Import the reusable RoleSelector

export default function Signup() {
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
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: '',
      agree_to_terms: false,
      role: undefined,
    },
  });

  const { mutate, isPending, error: mutationError } = useSignupMutation();
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

  const onSubmit = (data: SignupFormData) => {
    mutate({
      email: data.email,
      password: data.password,
      firstName: data.first_name,
      lastName: data.last_name,
      role: data.role,
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
          {/* Role Selector */}
          <RoleSelector control={control} error={errors.role?.message} />

          {/* Form Fields */}
          <FormField control={control} name="first_name" label="First Name" />
          <FormField control={control} name="last_name" label="Last Name" />
          <FormField control={control} name="email" label="Email" keyboardType="email-address" />
          <FormField control={control} name="password" label="Password" isPassword />
          <FormField
            control={control}
            name="confirm_password"
            label="Confirm Password"
            isPassword
          />

          {/* Agree to Terms Checkbox */}
          <Controller
            control={control}
            name="agree_to_terms"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                isChecked={value}
                onToggle={() => onChange(!value)}
                label="By signing up, you agree to our Terms of Service and Privacy Policy"
                error={errors.agree_to_terms?.message}
              />
            )}
          />

          {/* Submit Button */}
          <Button
            className="bg-primary"
            title={isPending ? 'Signing Up...' : 'Sign Up'}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          />
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
