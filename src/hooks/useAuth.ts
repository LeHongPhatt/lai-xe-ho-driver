import { API_HOST } from '@env';
import { NavigationService, Routes } from 'navigation';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from 'store/user';
import { UserSelectors } from 'store/user';
import {
  IFormDataLogin,
  IFormVerifyOTP,
  IKYCParams,
  IUser,
  IUserInfo,
} from 'types';
import { Alert, InteractionManager } from 'react-native';
import {
  API_ENDPOINT,
  EnumOTP,
  EnumRoleAccount,
  EnumStatusLog,
  KEY_CONTEXT,
  RESTAURANT_KEY,
  uploadFormData,
} from 'utils';
import { useKey } from './useKey';
import { useNotify } from './useNotify';

const message_default = 'Đã có lỗi xảy ra. Vui lòng thử lại sau!';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { danger } = useNotify();
  const { saveKeyStore, resetKeyStore } = useKey();
  const { t } = useTranslation();
  const loading = useSelector(UserSelectors.getLoading);

  const user =
    (useSelector(UserSelectors.getAttrByKey('user')) as IUser) || null;
  const status = useSelector(UserSelectors.getAttrByKey('status'));
  const userInfo = useSelector(
    UserSelectors.getAttrByKey('userInfo'),
  ) as IUserInfo;

  const showNotify = (message: string) =>
    danger(t('error'), message ? `${message}` : message_default);

  const onRequestOTP = useCallback(
    async (formData: IFormDataLogin) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData,
            endPoint: API_ENDPOINT.AUTH.REQUEST_OTP,
          },
          async res => {
            if ([200, 406].includes(res?.status)) {
              const data = res?.data?.result?.[0] || '';
              const r = res?.status === 406 ? Routes.InputPassword : Routes.OTP;
              NavigationService.navigate(r, {
                ...data,
                phone_number: formData.phoneNumber,
                ...formData,
                typeCheck: EnumOTP.REGISTER,
              });
            } else {
              showNotify(`${API_HOST}${JSON.stringify(res)}`);
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );

  const onVerifyOTP = useCallback(
    async (formData: IFormVerifyOTP, callback: (error: string) => void) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData,
            endPoint: API_ENDPOINT.AUTH.VERIFY_OTP,
          },
          async res => {
            if (res?.status === 200) {
              const data = res.data.result[0] || {};
              NavigationService.navigate(Routes.ResetPassword, {
                ...data,
                ...formData,
              });
            } else {
              callback?.(res?.data?.message ?? '');
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );

  const onForgotPasswordOTP = (formData: IFormVerifyOTP) => {
    const { phoneNumber, typeCheck } = formData;
    dispatch(
      UserActions.postBaseActionsRequest(
        {
          formData: { phoneNumber },
          endPoint: API_ENDPOINT.AUTH.FORGOT_PASSWORD_OTP,
        },
        async res => {
          if (res?.status === 200) {
            const data = res.data.result[0] || {};
            NavigationService.navigate(Routes.OTP, {
              ...data,
              ...formData,
              typeCheck,
            });
          } else {
            showNotify(res?.data?.message as string);
          }
        },
      ),
    );
  };
  const getProfileUser = useCallback(() => {
    dispatch(
      UserActions.getBaseActionsRequest({
        dataKey: 'userInfo',
        endPoint: API_ENDPOINT.AUTH.GET_PROFILE,
        isObject: true,
      }),
    );
  }, []);
  const onLogin = useCallback(
    ({ phoneNumber, password }, callback?: (error: string) => void) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData: { phoneNumber, password },
            dataKey: 'user',
            isObject: true,
            endPoint: API_ENDPOINT.AUTH.LOGIN,
          },
          res => {
            const data = res?.data;
            if (res?.status === 200) {
              if (data?.result?.[0]?.role !== EnumRoleAccount.DRIVER) {
                return Alert.alert(
                  'Thông báo',
                  'Tài khoản chưa có quyền đăng nhập!',
                  [{ text: 'Đóng', style: 'cancel' }],
                );
              }
              saveKeyStore(RESTAURANT_KEY.STATUS_USER, EnumStatusLog.LOGIN);
              const result = data?.result[0] || {};
              saveKeyStore(KEY_CONTEXT.ACCESS_TOKEN, result.accessToken);
              saveKeyStore(KEY_CONTEXT.USER, JSON.stringify(result));
              getProfileUser();
              NavigationService.navigate(Routes.HomeTabs);
            } else {
              callback?.(data?.message ?? '');
            }
          },
        ),
      );
    },
    [danger, dispatch, t, getProfileUser],
  );

  const onResetPassword = useCallback(
    async ({ password, phoneNumber, typeCheck }) => {
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            formData: { password, phoneNumber },
            endPoint:
              typeCheck === EnumOTP.REGISTER
                ? API_ENDPOINT.AUTH.CREATE_USER
                : API_ENDPOINT.AUTH.FORGOT_PASSWORD,
          },
          async res => {
            if (res?.status === 200) {
              Alert.alert(
                'Đổi mật khẩu thành công',
                'Vui lòng đăng nhập để tiếp tục',
                [
                  {
                    text: 'Đăng nhập',
                    onPress: () => {
                      InteractionManager.runAfterInteractions(() => {
                        NavigationService.navigate(Routes.InputPhone);
                      });
                    },
                  },
                ],
              );
              // showModalAlert({
              //   type: 'success',
              //   title: 'Đổi mật khẩu thành công',
              //   subtitle: 'Vui lòng đăng nhập để tiếp tục',
              //   textOk: 'Đăng nhập',
              //   onOk: () => {
              //     hideModalAlert();
              //     InteractionManager.runAfterInteractions(() => {
              //       NavigationService.navigate(Routes.InputPhone);
              //     });
              //   },
              // });
            } else if (res?.data?.errorCode === 'OTP_NOT_EXISTED') {
              Alert.alert('Lỗi', res?.data?.message || 'OTP is expired', [
                {
                  text: 'Thoát',
                  onPress: () => {
                    InteractionManager.runAfterInteractions(() => {
                      NavigationService.navigate(Routes.InputPhone);
                    });
                  },
                },
                {
                  text: 'Gửi lại mã',
                  onPress: () =>
                    NavigationService.navigate(Routes.OTP, {
                      phoneNumber: phoneNumber,
                      typeCheck: EnumOTP.FORGOT,
                      isOTPExpired: true,
                    }),
                },
              ]);
            } else {
              showNotify(res?.data?.message as string);
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );

  const onLogout = useCallback(async () => {
    await resetKeyStore(KEY_CONTEXT.ACCESS_TOKEN);
    await resetKeyStore(KEY_CONTEXT.USER);
    dispatch(UserActions.logoutRequest({ redirect: true }));
  }, [danger, dispatch, t]);

  const workingStatusAction = useCallback(
    async (params: string) => {
      dispatch(UserActions.changeRestStatus(params));
    },
    [danger, dispatch, t],
  );

  const onHanldeKYCUser = useCallback(
    ({
      phoneNumber,
      password,
      userId,
      typeScreen,
      ...rest
    }: IKYCParams & { typeScreen?: string }) => {
      const _formData = uploadFormData({ ...rest, phoneNumber, password });
      dispatch(
        UserActions.postBaseActionsRequest(
          {
            dataKey: 'userInfo',
            isObject: true,
            formData: _formData,
            endPoint: `${API_ENDPOINT.AUTH.KYC_USER}${
              userId ? `/${userId}` : ''
            }`,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
          res => {
            if (res.status === 200) {
              if (typeScreen === Routes.Account) {
                Alert.alert('Thông báo', 'Cập nhật thông tin thành công!', [
                  { text: 'Close', onPress: () => NavigationService.goBack() },
                ]);
              } else {
                if (res?.data?.result?.[0]?.role !== EnumRoleAccount.DRIVER) {
                  Alert.alert(
                    'Thông báo',
                    'Yêu cầu đăng ký tài khoản đã được gửi. Vui lòng chờ duyệt tài khoản để tiếp tục trải nghiệm ứng dụng!',
                    [
                      {
                        text: 'Tiếp tục',
                        onPress: () => {
                          InteractionManager.runAfterInteractions(() => {
                            NavigationService.navigate(Routes.InputPhone);
                          });
                        },
                      },
                    ],
                  );
                } else {
                  Alert.alert(
                    'Đăng ký thành công',
                    'Chào mừng bạn đã đến và trải nghiệm cùng GoFast!',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          InteractionManager.runAfterInteractions(() => {
                            onLogin({
                              phoneNumber,
                              password,
                            });
                          });
                        },
                      },
                    ],
                  );
                }
              }
            } else {
              showNotify(res?.data?.result?.[0]?.message as string);
            }
          },
        ),
      );
    },
    [],
  );
  const onShowFirstIntro = useCallback(() => {
    dispatch(UserActions.isShowIntro());
    saveKeyStore(KEY_CONTEXT.CHECKINTRO, 'Y');
  }, []);

  const onChangePassword = useCallback(
    async ({ phoneNumber, oldPassword, newPassword }) => {
      dispatch(
        UserActions.changePasswordRequest(
          {
            formData: { phoneNumber, oldPassword, newPassword },
            endPoint: API_ENDPOINT.AUTH.CHANGE_PASSWORD,
          },
          async res => {
            if (res?.status === 200) {
              Alert.alert('Thông báo', 'Đổi mật khẩu thành công!', [
                {
                  text: 'Đóng',
                  style: 'cancel',
                  onPress: () => NavigationService.goBack(),
                },
              ]);
            } else {
              showNotify(res?.data?.result?.[0]?.message as string);
            }
          },
        ),
      );
    },
    [danger, dispatch, t],
  );

  return {
    user,
    loading,
    status,
    userInfo,
    onRequestOTP,
    onVerifyOTP,
    onResetPassword,
    onLogin,
    onLogout,
    workingStatusAction,
    getProfileUser,
    onForgotPasswordOTP,
    onHanldeKYCUser,
    onShowFirstIntro,
    onChangePassword,
  };
};
