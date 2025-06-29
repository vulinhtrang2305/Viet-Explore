// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     Image,
//     FlatList,
//     Dimensions,
//     TouchableOpacity,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRoute } from '@react-navigation/native';
// import ReviewDetailScreen from '../ReviewDetails/ReviewDetailScreen';
// import { useDispatch } from 'react-redux';
// import { useAppSelector } from '../../../hooks/useAppSelector';
// import { fetchSpots } from '../../../store/slices/spotSlice';
// import LocationScreenButton from '../Location/MapScreen.web';

// const screenWidth = Dimensions.get('window').width;

// export default function SpotDetailScreen() {
//     const route = useRoute();
//     const { spotId } = route.params;
//     const dispatch = useDispatch();
//     const { spots, loading, error } = useAppSelector((state) => state.spots);

//     useEffect(() => {
//         dispatch(fetchSpots());
//     }, [dispatch]);
//     const selectedSpot = spots.find((s) => s._id === spotId);

//     const [selectedIndex, setSelectedIndex] = useState(0);

//     if (!selectedSpot) return null;

//     return (
//         <ScrollView style={styles.container}>
//             <Text style={styles.title}>{selectedSpot.name}</Text>

//             <Image
//                 source={{ uri: selectedSpot.imageUrl[selectedIndex] }}
//                 style={styles.mainImage}
//                 resizeMode="cover"
//             />

//             <FlatList
//                 data={selectedSpot.imageUrl}
//                 horizontal
//                 keyExtractor={(_, index) => index.toString()}
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.thumbnailContainer}
//                 renderItem={({ item, index }) => (
//                     <TouchableOpacity onPress={() => setSelectedIndex(index)}>
//                         <Image
//                             source={{ uri: item }}
//                             style={[
//                                 styles.thumbnail,
//                                 selectedIndex === index && styles.selectedThumbnail,
//                             ]}
//                         />
//                     </TouchableOpacity>
//                 )}
//             />
//             <LocationScreenButton
//                 lat={selectedSpot.location.lat}
//                 lng={selectedSpot.location.lng}
//                 name={selectedSpot.name}
//             />

//             <View style={styles.infoRow}>
//                 <Ionicons name="location-outline" size={18} color="#777" />
//                 <Text style={styles.infoText}>Khu vực: Miền {selectedSpot.region}</Text>
//             </View>

//             <View style={styles.infoRow}>
//                 <Ionicons name="pricetag-outline" size={18} color="#777" />
//                 <Text style={styles.infoText}>Loại hình: {selectedSpot.type}</Text>
//             </View>

//             <Text style={styles.sectionTitle}>Giới thiệu</Text>
//             <Text style={styles.description}>{selectedSpot.description}</Text>

//             <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>Đánh giá từ người dùng</Text>
//                 <ReviewDetailScreen spotId={spotId} />
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//         backgroundColor: '#fff',
//         flex: 1,
//     },
//     title: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     mainImage: {
//         width: screenWidth * 0.92,
//         height: screenWidth * 0.52,
//         borderRadius: 16,
//         marginTop: 14,
//         alignSelf: 'center',
//     },
//     thumbnailContainer: {
//         marginTop: 14,
//         paddingHorizontal: 8,
//     },
//     thumbnail: {
//         width: 70,
//         height: 70,
//         borderRadius: 12,
//         marginRight: 10,
//         borderWidth: 2,
//         borderColor: 'transparent',
//     },
//     selectedThumbnail: {
//         borderColor: '#18C0C0',
//     },
//     infoRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 12,
//     },
//     infoText: {
//         marginLeft: 8,
//         color: '#555',
//         fontSize: 14,
//     },
//     sectionTitle: {
//         marginTop: 20,
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#333',
//     },
//     description: {
//         fontSize: 15,
//         color: '#444',
//         marginTop: 8,
//         lineHeight: 22,
//     },
//     section: {
//         marginTop: 24,
//     },
// });



import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { fetchSpots } from '../../../store/slices/spotSlice';
import {
    addToFavourite,
    deleteFavourite,
    fetchFavouritesByUser,
} from '../../../store/slices/favouriteSlice';

import LocationScreenButton from '../Location/MapScreen.web';
import ReviewDetailScreen from '../ReviewDetails/ReviewDetailScreen';

const screenWidth = Dimensions.get('window').width;

export default function SpotDetailScreen() {
    const route = useRoute();
    const { spotId, userId } = route.params; // 👈 bạn nhớ truyền userId qua navigation params
    const dispatch = useDispatch();

    const { spots, loading: spotsLoading } = useAppSelector((state) => state.spots);
    const { userFavourite, loading: favLoading } = useAppSelector(
        (state) => state.favourites
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    useEffect(() => {
        if (userId) {
            dispatch(fetchFavouritesByUser(userId));
        }
    }, [dispatch, userId]);

    const selectedSpot = spots.find((s) => s._id === spotId);

    const isFavourite = userFavourite?.spotId?.includes(selectedSpot?._id);

    if (!selectedSpot) return null;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>{selectedSpot.name}</Text>
                <TouchableOpacity
                    onPress={() => {
                        if (favLoading) return; // tránh spam
                        if (isFavourite) {
                            dispatch(
                                deleteFavourite({
                                    userId: userFavourite.userId,
                                    spotId: selectedSpot._id,
                                })
                            );
                        } else {
                            dispatch(
                                addToFavourite({
                                    userId: userFavourite.userId,
                                    spotId: selectedSpot._id,
                                })
                            );
                        }
                    }}
                >
                    <Ionicons
                        name="bookmark"
                        size={28}
                        color={isFavourite ? '#FFD700' : '#999'}
                        style={{ marginLeft: 12 }}
                    />
                </TouchableOpacity>
            </View>

            <Image
                source={{ uri: selectedSpot.imageUrl[selectedIndex] }}
                style={styles.mainImage}
                resizeMode="cover"
            />

            <FlatList
                data={selectedSpot.imageUrl}
                horizontal
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.thumbnailContainer}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => setSelectedIndex(index)}>
                        <Image
                            source={{ uri: item }}
                            style={[
                                styles.thumbnail,
                                selectedIndex === index && styles.selectedThumbnail,
                            ]}
                        />
                    </TouchableOpacity>
                )}
            />

            <LocationScreenButton
                lat={selectedSpot.location.lat}
                lng={selectedSpot.location.lng}
                name={selectedSpot.name}
            />

            <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={18} color="#777" />
                <Text style={styles.infoText}>Khu vực: Miền {selectedSpot.region}</Text>
            </View>

            <View style={styles.infoRow}>
                <Ionicons name="pricetag-outline" size={18} color="#777" />
                <Text style={styles.infoText}>Loại hình: {selectedSpot.type}</Text>
            </View>

            <Text style={styles.sectionTitle}>Giới thiệu</Text>
            <Text style={styles.description}>{selectedSpot.description}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Đánh giá từ người dùng</Text>
                <ReviewDetailScreen spotId={spotId} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    mainImage: {
        width: screenWidth * 0.92,
        height: screenWidth * 0.52,
        borderRadius: 16,
        marginTop: 14,
        alignSelf: 'center',
    },
    thumbnailContainer: {
        marginTop: 14,
        paddingHorizontal: 8,
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 12,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedThumbnail: {
        borderColor: '#18C0C0',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    infoText: {
        marginLeft: 8,
        color: '#555',
        fontSize: 14,
    },
    sectionTitle: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    description: {
        fontSize: 15,
        color: '#444',
        marginTop: 8,
        lineHeight: 22,
    },
    section: {
        marginTop: 24,
    },
});
