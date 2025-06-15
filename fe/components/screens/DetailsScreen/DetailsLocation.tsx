import { useRoute } from '@react-navigation/native';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useContext } from 'react';
import AppContext from '../../../provider/Context';

export default function DetailsLocation() {
  const route = useRoute();
  const { categoryId } = route.params;

  const { spot, category } = useContext(AppContext);

  const filteredSpots = spot?.filter((item) => item.categoryId === categoryId);
  const categoryName = category?.find((cat) => cat._id === categoryId)?.name || 'Danh mục';

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Danh mục: {categoryName}</Text>

      <FlatList
        data={filteredSpots}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 20, textAlign: 'center' }}>
            Không có điểm đến nào thuộc danh mục này.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  image: {
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    color: '#333',
  },
});
