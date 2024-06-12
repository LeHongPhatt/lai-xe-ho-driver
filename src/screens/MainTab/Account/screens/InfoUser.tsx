import { HomeLayout, TextCus, TextInputs, ViewCus } from 'components';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BaseStyle, Colors } from 'theme';
type IKYC = {
  username: string;
  phoneNumber: string;
  birthDay: string;
  gender: number;
  email: string;
};
const InfoUser: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IKYC>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      phoneNumber: '',
      birthDay: '',
      gender: 0,
      email: '',
    },
  });
  const onSubmitInfoUser = useCallback((value: IKYC) => {
    console.log(
      '🚀 ~ file: InfoUser.tsx:28 ~ onSubmitInfoUser ~ value:',
      value,
    );
  }, []);
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'account.user_info',
        iconColor: Colors.white,
      }}
      isForForm
      textBtn="action.saved"
      onPress={handleSubmit(onSubmitInfoUser)}>
      <ViewCus style={BaseStyle.wrapperMain}>
        <TextCus bold>Thông tin chính</TextCus>
        <Controller
          control={control}
          name="username"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="Họ và tên"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={'Họ và tên'}
              error={errors.username?.message}
            />
          )}
        />
      </ViewCus>
    </HomeLayout>
  );
};
export default InfoUser;
