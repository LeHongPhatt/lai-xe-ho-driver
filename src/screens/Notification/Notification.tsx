import React from 'react';
// import { NotificationItem } from './components';
import { HomeLayout } from 'components';
import { Colors } from 'theme';

const Notification: React.FC = () => {
  // const renderItem = useCallback(() => {
  //   return <NotificationItem />;
  // }, []);
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'bottom.notification',
        notGoBack: true,
        iconColor: Colors.white,
      }}>
      {/* <RNFlatList
        data={[...Array(10).keys()]}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      /> */}
    </HomeLayout>
  );
};
export default Notification;
