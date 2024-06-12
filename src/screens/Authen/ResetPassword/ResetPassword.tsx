import { yupResolver } from '@hookform/resolvers/yup';
import { RouteProp, useRoute } from '@react-navigation/native';
import { IconName } from 'assets';
import { HomeLayout, TextCus, TextInputs, ViewCus } from 'components';
import { useAuth } from 'hooks';
import { NavigationService, RootStackParamList, Routes } from 'navigation';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BaseStyle } from 'theme';
import { EnumOTP } from 'types';
import { yupSchemaRegisterPassword } from 'utils';

type TFormPassword = {
  password: string;
  confirmPassword: string;
};
export default function ResetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<TFormPassword>({
    mode: 'onChange',
    resolver: yupResolver(yupSchemaRegisterPassword),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const route = useRoute<RouteProp<RootStackParamList, 'ResetPassword'>>();
  const { onResetPassword, loading } = useAuth();
  const onHandleRegister = useCallback(
    (value: TFormPassword) => {
      const { password } = value;
      if (route?.params.typeCheck === EnumOTP.REGISTER) {
        NavigationService.navigate(Routes.KYC, {
          password,
          phoneNumber: route?.params.phoneNumber,
          typeCheck: route?.params.typeCheck,
        });
        return true;
      }
      onResetPassword({
        password,
        phoneNumber: route?.params.phoneNumber,
        typeCheck: route?.params.typeCheck,
      });
    },
    [route.params],
  );
  return (
    <HomeLayout
      isForForm
      textBtn="auth.login"
      onPress={handleSubmit(onHandleRegister)}
      styleContent={[BaseStyle.wrapperContentAuth]}
      disabled={(!isDirty && !isValid) || loading}
      isDark>
      <ViewCus mt-30 mx-30>
        {/* <Icon.CircleLock /> */}
        <TextCus heading1 mt-12 mb-8 useI18n textAlign="center">
          auth.create_password
        </TextCus>
        <TextCus mb-32 color-grey85 useI18n textAlign="center">
          auth.resetpwd_subtitle
        </TextCus>
        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="auth.enter_password"
              error={errors.password?.message}
              // style={[BaseStyle.boxShadow]}
              isPassword
              leftIcon={IconName.Lock}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="auth.repeat_password"
              error={errors.confirmPassword?.message}
              // style={[BaseStyle.boxShadow]}
              isPassword
              leftIcon={IconName.Lock}
            />
          )}
        />
      </ViewCus>
    </HomeLayout>
  );
}
