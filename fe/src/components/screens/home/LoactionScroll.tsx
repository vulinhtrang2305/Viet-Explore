import AppContext from '@/src/provider/Context';
import { Link } from 'expo-router';
import React, { useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';

export default function LocationScroll() {
    const { spot } = useContext(AppContext)
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Điểm đến phổ biến</Text>
                <TouchableOpacity>
                    <Link href="/details">
                        <Text style={styles.viewAll}>Tất cả</Text>
                    </Link>
                </TouchableOpacity>
            </View>

            <FlatList
                data={spot.slice(0, 10)}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 12 }}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        paddingHorizontal: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewAll: {
        color: '#0080FF',
        fontSize: 14,
    },
    item: {
        marginRight: 16,
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 140,
        borderRadius: 12,
        marginBottom: 8,
    },
    name: {
        fontSize: 14,
        color: '#333',
    },
});
