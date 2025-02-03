import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '~/components/input_fields/TextField';

interface FormFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  keyboardType?: string;
  isPassword?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  placeholder = '',
  keyboardType = 'default',
  isPassword = false,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={placeholder || label}
          keyboardType={keyboardType as any}
          isPassword={isPassword}
          error={error?.message}
        />
      )}
    />
  );
};

export default FormField;
