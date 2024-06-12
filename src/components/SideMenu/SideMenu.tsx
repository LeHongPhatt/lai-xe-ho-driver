import * as React from 'react';
import { Switch, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BaseStyle, Colors, FontWeight } from 'theme';

import {
  ScrollViewCus,
  TextCus,
  ViewCus,
  IconApp,
  TouchCus,
  Divider,
  ImageCus,
} from 'components';
import { SideMenuOptions, ActionSideMenuType } from 'types';
import { IconName } from 'assets';
import { useAuth } from 'hooks';
import { getImage } from 'utils';

const styles = StyleSheet.create({
  scrollWrapper: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: FontWeight.medium,
    color: Colors.black3A,
  },
  sideMenuItem: {
    paddingVertical: 12,
  },
  divider: {
    marginTop: 12,
    marginBottom: 12,
  },
  inforBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inforLeft: {
    paddingRight: 12,
  },
  userCode: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: FontWeight.medium,
    color: Colors.blue47,
  },
  fullName: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: FontWeight.medium,
    color: Colors.black3A,
    marginTop: 4,
  },
  placeLicenceContainer: {
    width: 70,
    backgroundColor: Colors.blue47,
    borderRadius: 4,
    marginTop: 8,
  },
  placeLicence: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    padding: 6,
    textAlign: 'center',
  },
  image: {
    height: 62,
    width: 62,
    borderRadius: 31,
    alignSelf: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: Colors.blue47,
  },
});

const SideMenu = ({ isOpenSideMenu, setIsOpenSideMenu, children }) => {
  const insets = useSafeAreaInsets();
  const { userInfo } = useAuth();
  const toggleSideMenu = bool => {
    if (typeof setIsOpenSideMenu === 'function') {
      setIsOpenSideMenu(bool);
    }
  };

  const renderItemMenu = menu => {
    const isActived = true;
    switch (menu.type) {
      case ActionSideMenuType.Switch: {
        return (
          <ViewCus
            key={menu.title}
            style={[BaseStyle.flexRowSpaceBetwwen, styles.sideMenuItem]}>
            <TextCus style={styles.title} color-black useI18n>
              {menu.title}
            </TextCus>
            <Switch
              trackColor={{ false: Colors.greyAD, true: Colors.blue47 }}
              thumbColor={Colors.white}
              ios_backgroundColor={Colors.greyAD}
              onValueChange={() => {}}
              value={isActived}
            />
          </ViewCus>
        );
      }
      case ActionSideMenuType.Click: {
        return (
          <TouchCus
            onPress={() => {}}
            key={menu.title}
            style={[BaseStyle.flexRowSpaceBetwwen, styles.sideMenuItem]}>
            <TextCus style={styles.title} color-black useI18n>
              {menu.title}
            </TextCus>
            <IconApp name={IconName.ChevronRight} color={Colors.grey85} />
          </TouchCus>
        );
      }
      default:
        break;
    }
  };

  const renderInfoBox = () => {
    return (
      <ViewCus>
        <ViewCus style={styles.inforBoxContainer}>
          <ViewCus style={styles.inforLeft}>
            <ImageCus
              style={styles.image}
              source={{
                uri: getImage({
                  image: userInfo?.avatar,
                }),
              }}
            />
          </ViewCus>
          <ViewCus>
            {/* <TextCus style={styles.userCode}>VDT9527</TextCus> */}
            <TextCus style={styles.fullName}>{userInfo?.full_name}</TextCus>
          </ViewCus>
        </ViewCus>
        <ViewCus style={styles.placeLicenceContainer}></ViewCus>
      </ViewCus>
    );
  };

  const renderDrawerContent = () => {
    return (
      <ScrollViewCus
        style={[
          {
            paddingBottom: Math.max(insets.bottom, 16),
            paddingTop: Math.max(insets.top, 16),
          },
          styles.scrollWrapper,
        ]}>
        {renderInfoBox()}
        <Divider small color={Colors.greyEE} style={styles.divider} />
        <ViewCus>{SideMenuOptions.map(menu => renderItemMenu(menu))}</ViewCus>
      </ScrollViewCus>
    );
  };

  return (
    <Drawer
      open={isOpenSideMenu}
      drawerType="front"
      onOpen={() => {
        toggleSideMenu(true);
      }}
      onClose={() => {
        toggleSideMenu(false);
      }}
      renderDrawerContent={renderDrawerContent}>
      {children}
    </Drawer>
  );
};

export default SideMenu;
