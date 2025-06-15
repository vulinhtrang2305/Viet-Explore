import { Link, useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import AppContext from '../../../provider/Context';

const LocationScroll = (props: any) => {
    const { spot } = useContext(AppContext)
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Điểm đến phổ biến</Text>
                <TouchableOpacity onPress={() => navigation.navigate('list-details')}>
                    <Text style={styles.viewAll}>Tất cả</Text>
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


export default LocationScroll;

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
