import React from 'react';
import { Controller } from 'react-hook-form';
import { View, Text } from 'react-native';
import RadioButton from '~/components/buttons/RadioButton';
import { ROLES } from '~/constants/forms/authFields';

interface RoleSelectorProps {
  control: any;
  error?: string;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ control, error }) => {
  return (
    <Controller
      name="role"
      control={control}
      render={({ field: { onChange, value } }) => (
        <View>
          <Text className="text-lg font-medium text-text_primary">Register as:</Text>
          <View className="flex-row gap-2">
            {ROLES.map((role) => (
              <RadioButton
                key={role.value}
                label={role.label}
                selected={value === role.value}
                onPress={() => onChange(role.value)}
                error={error}
              />
            ))}
          </View>
        </View>
      )}
    />
  );
};

export default RoleSelector;
