import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { HomeLayout, TextCus, TextInputs, ViewCus } from 'components';
import { useAuth } from 'hooks';
import { BaseStyle, Colors } from 'theme';
import { yupChangePasswordSchema } from 'utils';

interface PageProps {}
type TFormChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword: React.FC<PageProps> = () => {
  const { onChangePassword, userInfo, loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormChangePassword>({
    mode: 'onChange',
    resolver: yupResolver(yupChangePasswordSchema),
  });

  const handleChangePassword = useCallback((value: TFormChangePassword) => {
    onChangePassword({
      phoneNumber: userInfo?.phone_number,
      oldPassword: value?.currentPassword,
      newPassword: value?.newPassword,
    });
  }, []);

  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'account.change_password',
        iconColor: Colors.white,
      }}
      isForForm
      textBtn="continue"
      onPress={handleSubmit(handleChangePassword)}
      disabled={loading}
      loading={loading}
      styleContent={styles.container}>
      <ViewCus p-16>
        <Controller
          control={control}
          name="currentPassword"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.old_password"
              bold
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.old_password_input"
              error={errors.currentPassword?.message}
              isRequired
              isPassword
              style={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.new_password"
              bold
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.new_password_input"
              error={errors.newPassword?.message}
              isRequired
              isPassword
              style={styles.input}
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
              label="account.re_new_password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.re_new_password"
              error={errors.confirmPassword?.message}
              isRequired
              isPassword
              style={styles.input}
              bold
            />
          )}
        />
        <ViewCus bg-greyF7 p-8 br-4>
          <TextCus bold color-grey85>
            Yêu cầu mật khẩu
          </TextCus>
          <ViewCus style={BaseStyle.flexRowCenter}>
            <ViewCus style={styles.dots} />
            <TextCus subhead color-grey85>
              Độ dài 6 - 16 ký tự
            </TextCus>
          </ViewCus>
          <ViewCus style={BaseStyle.flexRowCenter}>
            <ViewCus style={styles.dots} />
            <TextCus subhead color-grey85>
              Tối thiểu 6 ký tự, ít nhất 1 chữ hoa, 1 chữ thường và 1 số
            </TextCus>
          </ViewCus>
        </ViewCus>
      </ViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    backgroundColor: Colors.transparent,
  },
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  dots: {
    width: 4,
    height: 4,
    backgroundColor: Colors.grey85,
    borderRadius: 4,
    marginRight: 8,
  },
});
export default ChangePassword;
