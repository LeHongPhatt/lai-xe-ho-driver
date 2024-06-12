import React, { useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RouteProp, useRoute } from '@react-navigation/native';
import moment from 'moment';
import {
  BottomSheetCommon,
  HomeLayout,
  SelecterPicker,
  TextInputs,
  ViewCus,
} from 'components';
import { useAuth } from 'hooks';
import { IconName } from 'assets';
import { BaseStyle } from 'theme';
import { RootStackParamList, Routes } from 'navigation';
import { ImageCropPicker } from './components';
import { getCurrentDate, yupSchemaKYC, yupSchemaKYCFirst } from 'utils';
import {
  IFormKYC,
  IRefBottom,
  SELECT_OPTION,
  dataGender,
  formatGender,
} from 'types';

export default function KYC() {
  const refBirthday = useRef<IRefBottom>(null);
  const refGender = useRef<IRefBottom>(null);
  const route = useRoute<RouteProp<RootStackParamList, 'KYC'>>();
  const { phoneNumber, typeScreen = '' } = route.params || {};
  const isTabAccount = typeScreen === Routes.Account;
  const { onHanldeKYCUser, loading, userInfo } = useAuth();

  const firstGender = Object.entries(formatGender).find(
    ([_, gender]) => gender === userInfo?.gender,
  )?.[0];

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
    getValues,
  } = useForm<IFormKYC>({
    mode: 'onChange',
    resolver: yupResolver(isTabAccount ? yupSchemaKYC : yupSchemaKYCFirst),
    defaultValues: {
      fullName: userInfo?.full_name || '',
      phoneNumber: phoneNumber || userInfo?.phone_number || '',
      email: userInfo?.email || '',
      address: userInfo?.address || '',
      avatar: userInfo?.avatar ? { uri: userInfo?.avatar } : {},
      birthday: userInfo?.birthday
        ? moment(userInfo?.birthday).format('DD/MM/YYYY')
        : '',
      gender: userInfo?.gender ? firstGender : dataGender[2],
    },
  });

  const onSubmitKYC = useCallback((value: IFormKYC) => {
    let form = {
      ...route.params,
      ...value,
      userId: userInfo?.id,
      typeScreen,
      gender: formatGender[value.gender],
      birthday: moment(value.birthday, 'DD-MM-YYYY HH:mm').toISOString(),
    };
    if (value?.avatar?.uri === userInfo?.avatar) {
      delete form.avatar;
    }
    onHanldeKYCUser(form);
  }, []);

  const disableForm =
    !dirtyFields?.fullName &&
    !dirtyFields?.email &&
    !dirtyFields?.address &&
    getValues('avatar')?.uri === userInfo?.avatar &&
    getValues('birthday') === moment(userInfo?.birthday).format('DD/MM/YYYY') &&
    getValues('gender') === firstGender;

  return (
    <HomeLayout
      isForForm
      header={{
        title: 'auth.kyc',
      }}
      onPress={handleSubmit(onSubmitKYC)}
      textBtn="auth.update_kyc"
      styleContent={[BaseStyle.wrapperContentAuth]}
      disabled={loading || disableForm}
      loading={loading}
      isDark>
      <ImageCropPicker
        control={control}
        onChangePicture={image =>
          setValue('avatar', image, {
            shouldValidate: true,
            shouldTouch: true,
          })
        }
        isViewTouch={true}
      />
      <ViewCus>
        <Controller
          control={control}
          name="fullName"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.username"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              isRequired
              placeholder="account.enter_username"
              error={errors.fullName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.phone_number"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              isRequired
              placeholder="account.phone_number_input"
              error={errors.phoneNumber?.message}
              keyboardType="phone-pad"
              disabled={true}
              editable={false}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: !isTabAccount,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.email"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.email_input"
              error={errors.email?.message}
              isRequired={!isTabAccount}
            />
          )}
        />
        <Controller
          control={control}
          name="birthday"
          rules={{
            required: !isTabAccount,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.birthday"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.choose_birthday"
              error={errors.birthday?.message}
              rightIcon={IconName.Calander}
              isViewTouch
              onPress={() => refBirthday.current?.show()}
              type="none"
              isRequired={!isTabAccount}
            />
          )}
        />
        <Controller
          control={control}
          name="gender"
          rules={{
            required: !isTabAccount,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.gender"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.choose_gender"
              onPress={() => refGender.current?.show()}
              isViewTouch
              type="none"
              rightIcon={IconName.ChevronRight}
              size={16}
              styleIconRight={{ transform: [{ rotate: '90deg' }] }}
              isRequired={!isTabAccount}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          rules={{
            required: !isTabAccount,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              label="account.address"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="account.address_input"
              error={errors.address?.message}
              isRequired={!isTabAccount}
            />
          )}
        />
      </ViewCus>
      <BottomSheetCommon ref={refBirthday} hideBackdrop={false}>
        <SelecterPicker
          selectType={SELECT_OPTION.DATE_PICKER}
          selectOptionTitle="account.choose_birthday"
          onConfirmSelect={date => {
            setValue('birthday', moment(date).format('DD/MM/YYYY'), {
              shouldValidate: true,
              shouldTouch: true,
            });
            refBirthday.current?.close();
          }}
          onCancelSelect={() => refBirthday.current?.close()}
          maxDate={getCurrentDate()}
          selectedPickerDate={getValues('birthday')}
        />
      </BottomSheetCommon>
      <BottomSheetCommon ref={refGender} hideBackdrop={false}>
        <SelecterPicker
          selectType={SELECT_OPTION.OPTION_PICKER}
          selectOptionTitle="account.choose_gender"
          dataOptions={dataGender}
          onConfirmSelect={gender => {
            setValue('gender', gender.data, {
              shouldValidate: true,
              shouldTouch: true,
            });
            refGender.current?.close();
          }}
          selectedChooseOption={{
            index: dataGender.indexOf(getValues('gender')),
            data: getValues('gender'),
          }}
          onCancelSelect={() => refGender.current?.close()}
        />
      </BottomSheetCommon>
    </HomeLayout>
  );
}
