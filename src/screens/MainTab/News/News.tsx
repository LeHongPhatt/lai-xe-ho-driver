import { HomeLayout, ViewCus } from 'components';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from 'theme';

import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ItemNew } from './components';
import { IItemNew } from './components/ItemNew';
const fakeData: IItemNew[] = [
  {
    id: 1,
    title:
      'Hướng dẫn sử dụng tính năng mới của ứng dụng Go Fast Driver để tối ưu việc giao hàng',
    image: 'https://dummyimage.com/300x200/000/fff',
  },
  {
    id: 2,
    title:
      'Cách thực hiện một chuyến giao hàng an toàn và nhanh chóng với Go Fast Driver',
    image: 'https://dummyimage.com/300x200/000/fff',
  },
  {
    id: 3,
    title:
      'Xu hướng vận chuyển hàng hóa hiện đại: Tầm quan trọng của ứng dụng di động',
    image: 'https://dummyimage.com/300x200/000/fff',
  },
  {
    id: 4,
    title: 'Phương pháp giảm thiểu rủi ro khi vận chuyển hàng hóa quan trọng',
    image: 'https://dummyimage.com/300x200/000/fff',
  },
  {
    id: 5,
    title:
      'Bí quyết nhanh chóng tìm đường đi hiệu quả khi giao hàng trong khu vực phức tạp',
    image: 'https://dummyimage.com/300x200/000/fff',
  },
  {
    id: 6,
    title:
      'Lợi ích của việc sử dụng ứng dụng di động Go Fast Driver cho người giao hàng',
    image: 'https://dummyimage.com/300x200/000/fff',
  },
  {
    id: 7,
    title:
      'Phương pháp phân chia công việc và quản lý thời gian cho người vận chuyển hàng',
    image: 'https://dummyimage.com/300x200/000/fff',
  },
  {
    id: 8,
    title:
      'Cách tối ưu hóa tuyến đường giao hàng để tiết kiệm thời gian và năng lượng',
    image: 'https://dummyimage.com/300x200/000/fff',
  },
  {
    id: 9,
    title: 'Thực hiện các biện pháp an toàn khi vận chuyển hàng hóa quan trọng',
    image: 'https://dummyimage.com/300x200/000/fff',
  },
  {
    id: 10,
    title:
      'Tăng cường sự tương tác và hỗ trợ khách hàng thông qua ứng dụng Go Fast Driver',
    image: 'https://dummyimage.com/300x200/000/fff',
  },
];

const News = () => {
  const [data, setData] = useState<IItemNew[]>([]);
  // const [page, setPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // setIsLoading(true);
    // FetchData

    setData(fakeData);
    // setIsLoading(false);
  };

  const handleLoadMore = () => {
    // if (!isLoading) {
    //   setPage(page + 1);
    //   // fetchData();
    // }
  };

  const renderItem = ({ item }: { item: IItemNew }) => {
    const { id, title, image } = item;
    return (
      <ViewCus style={styles.item}>
        <ItemNew id={id} title={title} image={image} />
      </ViewCus>
    );
  };

  const renderFooter = () => {
    // if (!isLoading) return null;

    return (
      <ViewCus px-20>
        <ActivityIndicator size="large" />
      </ViewCus>
    );
  };

  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        notGoBack: true,
        title: 'news_shipper',
        iconColor: Colors.white,
      }}>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </HomeLayout>
  );
};

export default News;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 10,
  },
});
