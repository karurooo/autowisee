import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TextInputProps,
  KeyboardTypeOptions,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
interface CustomTextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  keyboardType?: KeyboardTypeOptions;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const TextField: React.FC<CustomTextFieldProps> = ({
  label,
  error,
  helperText,
  isPassword,
  keyboardType,
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  ...textInputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  return (
    <View className="my-1">
      {label && (
        <Text className={`mb-1 font-medium text-text_primary ${labelClassName}`}>{label}</Text>
      )}
      <View
        className={`flex-row items-center border ${
          isFocused ? 'border-2 border-primary' : 'border border-secondary'
        } rounded-lg `}>
        <TextInput
          className={`w-full rounded-lg border bg-white px-4 py-2
          ${error ? 'border-error' : 'border-secondary'}

          ${inputClassName}
        `}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !showPassword}
          {...textInputProps}
        />
        {isPassword && ( // Show toggle button only for password fields
          <TouchableOpacity
            className="absolute right-3"
            onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'} // Toggle icon
              size={24}
              color="#6b7280" // Gray color
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className={`mt-1 text-sm text-red-500 ${errorClassName}`}>{error}</Text>}
    </View>
  );
};

export default TextField;
