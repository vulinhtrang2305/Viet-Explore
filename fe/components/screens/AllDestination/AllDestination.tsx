import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { fetchSpots } from '../../../store/slices/spotSlice';

export default function AllDestination() {
    const dispatch = useDispatch();
    const { spots, loading, error } = useAppSelector((state) => state.spots);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Điểm đến phổ biến</Text> */}

            <FlatList
                data={spots}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('description', {
                        spotId: item?._id,
                    })}>
                        <Image source={{ uri: item.imageUrl[0] }} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.description} numberOfLines={2}>
                                {item.description || 'Khám phá vẻ đẹp tự nhiên & văn hóa.'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    card: {
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    textContainer: {
        padding: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    description: {
        marginTop: 4,
        fontSize: 14,
        color: '#666',
    },
});
