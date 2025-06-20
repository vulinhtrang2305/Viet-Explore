import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../hooks/useAppSelector';

export default function SuggestDetails() {
    const route = useRoute();
    const navigation = useNavigation();
    const { suggestId } = route.params ?? {};

    const { suggests } = useAppSelector((state) => state.suggests);
    const { spots } = useAppSelector((state) => state.spots);    
    const suggest = suggests.find((item) => item._id === suggestId);

    if (!suggest) {
        return (
            <View style={styles.center}>
                <Text>Không tìm thấy hành trình gợi ý.</Text>
            </View>
        );
    }

    const relatedSpots = spots.filter((spot) => suggest.spotId.includes(spot._id));

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{suggest.title}</Text>
            <Text style={styles.description}>{suggest.description}</Text>

            <FlatList
                data={suggest.imageUrl}
                keyExtractor={(uri, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                )}
                style={styles.imageList}
            />

            <Text style={styles.subTitle}>Các điểm đến nổi bật</Text>

            {relatedSpots.map((spot) => (
                <TouchableOpacity
                    key={spot._id}
                    onPress={() => navigation.navigate('description', { spotId: spot._id })}
                >
                    <View style={styles.spotItem}>
                        <Image source={{ uri: spot.imageUrl?.[0] }} style={styles.spotImage} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.spotName}>{spot.name}</Text>
                            <Text numberOfLines={2} style={styles.spotDesc}>{spot.shortDescription}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
        color: '#444',
    },
    imageList: {
        marginBottom: 20,
    },
    image: {
        width: 280,
        height: 180,
        borderRadius: 12,
        marginRight: 12,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    spotItem: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#f8f8f8',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    spotImage: {
        width: 90,
        height: 90,
        borderRadius: 8,
        marginRight: 12,
    },
    spotName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    spotDesc: {
        fontSize: 14,
        color: '#555',
    },
});
