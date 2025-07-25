import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Alert,
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
    const { spotId } = route?.params || {};

    const dispatch = useDispatch();
    const userId = useAppSelector((state) => state.users?.userInfo?._id);
    const { spots, loading: spotsLoading } = useAppSelector((state) => state.spots);
    const { userFavourite, loading: favLoading } = useAppSelector((state) => state.favourites);

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (spotId) {
            dispatch(fetchSpots());
        }
    }, [dispatch, spotId]);

    useEffect(() => {
        if (userId) {
            dispatch(fetchFavouritesByUser(userId));
        }
    }, [dispatch, userId]);

    const selectedSpot = spots.find((s) => s._id === spotId);

    const isFavourite =
        userFavourite &&
        Array.isArray(userFavourite.spotId) &&
        userFavourite.spotId.includes(selectedSpot?._id);

    const canToggleFavourite = !!userId;

    if (!spotId) {
        return (
            <View style={styles.centered}>
                <Text style={styles.warningText}>Không tìm thấy địa điểm cần hiển thị.</Text>
            </View>
        );
    }

    if (!selectedSpot) {
        return (
            <View style={styles.centered}>
                <Text style={styles.loadingText}>Đang tải thông tin địa điểm...</Text>
            </View>
        );
    }

    const handleToggleFavourite = () => {
        if (!canToggleFavourite) {
            Alert.alert('Thông báo', 'Bạn cần đăng nhập để thêm vào yêu thích.');
            return;
        }

        if (favLoading) return;

        const name = selectedSpot.name;

        if (isFavourite) {
            dispatch(
                deleteFavourite({ userId, spotId: selectedSpot._id })
            );
        } else {
            dispatch(
                addToFavourite({ userId, spotId: selectedSpot._id })
            ).then(() => {
                Alert.alert('Thành công', `Bạn đã thêm thành công "${name}" vào mục yêu thích`);
            });
        }
    };

    return (
        <FlatList
            data={[selectedSpot]} // wrap single spot data
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{item.name}</Text>

                        {typeof isFavourite !== 'undefined' && (
                            <TouchableOpacity onPress={handleToggleFavourite}>
                                <Ionicons
                                    name="bookmark"
                                    size={28}
                                    color={isFavourite ? '#FFD700' : '#999'}
                                    style={{ marginLeft: 12 }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    <Image
                        source={{ uri: item.imageUrl[selectedIndex] }}
                        style={styles.mainImage}
                        resizeMode="cover"
                    />

                    <FlatList
                        data={item.imageUrl}
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
                        lat={item.location.lat}
                        lng={item.location.lng}
                        name={item.name}
                    />

                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={18} color="#777" />
                        <Text style={styles.infoText}>Khu vực: Miền {item.region}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="pricetag-outline" size={18} color="#777" />
                        <Text style={styles.infoText}>Loại hình: {item.type}</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Giới thiệu</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Đánh giá từ người dùng</Text>
                        <ReviewDetailScreen spotId={spotId} />
                    </View>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningText: {
        fontSize: 16,
        color: 'red',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
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
        width: screenWidth,
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
