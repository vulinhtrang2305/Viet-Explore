import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { fetchCategories } from '../../../store/slices/categorySlice';
import { fetchSpots } from '../../../store/slices/spotSlice';

export default function DetailsLocation() {
  const route = useRoute();
  const { categoryId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { spots } = useAppSelector((state) => state.spots);
  const { categories } = useAppSelector((state) => state.categories);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchSpots());
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryName =
    categories?.find((cat) => cat._id === categoryId)?.name || 'Danh mục';

  const filteredSpots = spots?.filter(
    (item) =>
      item.categoryId === categoryId &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.title}>Danh mục: {categoryName}</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm theo tên địa điểm..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredSpots}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('description', { spotId: item._id })}
          >
            <View style={styles.item}>
              <Image source={{ uri: item.imageUrl[0] }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 20, textAlign: 'center' }}>
            Không có điểm đến phù hợp.
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
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
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
    fontWeight: 'bold',
  },
});
