import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '~/components/input_fields/TextField';

interface FormFieldProps {
  control: any; // Replace `any` with `Control<any>` for better type safety
  name: string;
  label: string;
  placeholder?: string;
  keyboardType?: string;
  isPassword?: boolean;
  maxLength?: number; // Add this if needed for specific fields like OTP
}

const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  placeholder = '',
  keyboardType = 'default',
  isPassword = false,
  maxLength,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          value={value} // Passed automatically by Controller
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={placeholder || label}
          keyboardType={keyboardType as any}
          isPassword={isPassword}
          maxLength={maxLength} // Pass maxLength if needed
          error={error?.message}
        />
      )}
    />
  );
};

export default FormField;
