import { RNFlatList, HomeLayout, TextCus, ViewCus } from 'components';
import React, { useCallback, useMemo } from 'react';
import { Colors } from 'theme';
import { ActivityCategories, ActivityItem } from './components';
import { DATA, EActivityStatus, STATUS_ACTIVITY_NAME } from 'types';
import { NavigationService, Routes } from 'navigation';
import { groupActivityData } from 'utils';

export default function Activity() {
  const groupData = useMemo(() => {
    return groupActivityData(DATA);
  }, []);
  const renderItem = useCallback(({ item, index }) => {
    return (
      <ViewCus key={index}>
        <TextCus heading5 mb-12>
          {STATUS_ACTIVITY_NAME[item?.title]}
        </TextCus>
        {item?.data?.map((activity, idx) => {
          return (
            <ActivityItem
              key={idx}
              {...activity}
              onPress={() =>
                NavigationService.navigate(
                  activity.status === EActivityStatus.FEEDBACK
                    ? Routes.Rating
                    : Routes.HistoryActivity,
                )
              }
            />
          );
        })}
      </ViewCus>
    );
  }, []);
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        notGoBack: true,
        title: 'bottom.activity',
        iconColor: Colors.white,
      }}>
      <ActivityCategories />
      <ViewCus px-16 f-1>
        <RNFlatList data={groupData} renderItem={renderItem} />
      </ViewCus>
    </HomeLayout>
  );
}
