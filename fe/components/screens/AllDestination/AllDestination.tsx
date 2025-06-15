import React, { useContext } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import AppContext from '../../../provider/Context';

export default function AllDestination() {
    const { spot } = useContext(AppContext);

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Điểm đến phổ biến</Text> */}

            <FlatList
                data={spot}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
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
