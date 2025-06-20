import React, { useContext, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ScrollView,
} from 'react-native';
import AppContext from '../../../provider/Context';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { fetchSuggests } from '../../../store/slices/suggestSlice';

export default function SuggestC() {
    const dispatch = useDispatch();
    const { suggests } = useAppSelector((state) => state.suggests);

    useEffect(() => {
        dispatch(fetchSuggests());
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Gợi ý hành trình khám phá</Text>

            <FlatList
                horizontal
                data={suggests}
                renderItem={({ item }) => <SuggestCard item={item} />}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

function SuggestCard({ item }) {
    return (
        <View style={styles.comboCard}>
            <Image
                source={{ uri: item.imageUrl[0] }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={2}>
                {item.description}
            </Text>
            <Text style={styles.date}>
                <Ionicons name="calendar" size={13} color="#888" />{' '}
                {new Date(item.createdAt).toLocaleDateString('vi-VN')}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    comboCard: {
        width: 250,
        marginRight: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 130,
        borderRadius: 10,
        marginBottom: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: '#444',
        marginBottom: 6,
    },
    date: {
        fontSize: 11,
        color: '#888',
    },
});
