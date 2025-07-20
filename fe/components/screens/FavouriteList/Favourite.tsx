// import React, { useEffect } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     FlatList,
//     TouchableOpacity,
//     ActivityIndicator,
//     Image,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../store';
// import { fetchFavouritesByUser } from '../../../store/slices/favouriteSlice';
// import { fetchSpots } from '../../../store/slices/spotSlice';
// import { useNavigation } from '@react-navigation/native';

// const FavouriteList = () => {
//     const dispatch = useDispatch();
//     const navigation = useNavigation();
//     const { userFavourite, loading, error } = useSelector((state: RootState) => state.favourites);
//     const { spots } = useSelector((state: RootState) => state.spots);
//     const userId = useSelector((state: RootState) => state.users.userInfo?._id);

//     useEffect(() => {
//         if (userId) {
//             dispatch(fetchFavouritesByUser(userId));
//         }
//         dispatch(fetchSpots());
//     }, [dispatch, userId]);

//     const filteredSpots = userFavourite
//         ? spots.filter((spot) => userFavourite.spotId.includes(spot._id?.toString()))
//         : [];

//     const renderItem = ({ item }) => (
//         <TouchableOpacity style={styles.card} onPress={() =>
//             navigation.navigate("description", {
//                 spotId: item._id,
//             })
//         }>
//             <Image
//                 source={{ uri: item.imageUrl?.[0] }}
//                 style={styles.image}
//             />
//             <View>
//                 <Text style={styles.title}>{item.name}</Text>
//             </View>
//         </TouchableOpacity>
//     );

//     if (loading) {
//         return (
//             <View style={styles.center}>
//                 <ActivityIndicator size="large" color="#00c6ff" />
//             </View>
//         );
//     }

//     if (error) {
//         return (
//             <View style={styles.center}>
//                 <Text style={styles.error}>{error}</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Địa điểm yêu thích</Text>
//             <FlatList
//                 data={filteredSpots}
//                 keyExtractor={(item) => item._id}
//                 renderItem={renderItem}
//                 ListEmptyComponent={
//                     <View style={styles.center}>
//                         <Text style={styles.emptyText}>
//                             Chưa có địa điểm nào trong mục yêu thích.
//                         </Text>
//                     </View>
//                 }
//                 contentContainerStyle={{ paddingBottom: 100 }}
//             />
//         </View>
//     );
// };

// export default FavouriteList;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingHorizontal: 16,
//         paddingTop: 20,
//     },
//     header: {
//         fontSize: 20,
//         fontWeight: '700',
//         marginBottom: 10,
//     },
//     card: {
//         backgroundColor: '#f9f9f9',
//         marginBottom: 12,
//         padding: 12,
//         borderRadius: 10,
//         flexDirection: 'row',
//         gap: 12,
//     },
//     image: {
//         width: 200,
//         height: 200,
//         borderRadius: 8,
//     },
//     title: {
//         fontWeight: '600',
//         fontSize: 16,
//     },
//     center: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     error: {
//         color: 'red',
//     },
//     emptyText: {
//         textAlign: 'center',
//         marginTop: 50,
//         color: '#666',
//         fontSize: 15,
//     },
// });



// import React, { useEffect } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     FlatList,
//     TouchableOpacity,
//     ActivityIndicator,
//     Image,
//     Alert,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../store';
// import {
//     fetchFavouritesByUser,
//     deleteFavourite
// } from '../../../store/slices/favouriteSlice';
// import { fetchSpots } from '../../../store/slices/spotSlice';
// import { useNavigation } from '@react-navigation/native';

// const FavouriteList = () => {
//     const dispatch = useDispatch();
//     const navigation = useNavigation();
//     const { userFavourite, loading, error } = useSelector((state: RootState) => state.favourites);
//     const { spots } = useSelector((state: RootState) => state.spots);
//     const userId = useSelector((state: RootState) => state.users.userInfo?._id);

//     useEffect(() => {
//         if (userId) {
//             dispatch(fetchFavouritesByUser(userId));
//         }
//         dispatch(fetchSpots());
//     }, [dispatch, userId]);

//     const filteredSpots = userFavourite
//         ? spots.filter((spot) => userFavourite.spotId.includes(spot._id?.toString()))
//         : [];

//     const handleDelete = (spotId: string, name: string) => {
//         Alert.alert(
//             'Xác nhận',
//             `Bạn có chắc muốn xoá "${name}" khỏi mục yêu thích?`,
//             [
//                 {
//                     text: 'Hủy',
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'Xóa',
//                     style: 'destructive',
//                     onPress: () => {
//                         dispatch(deleteFavourite({ userId, spotId }));
//                     },
//                 },
//             ]
//         );
//     };

//     const renderItem = ({ item }) => (
//         <View style={styles.card}>
//             <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() => handleDelete(item._id, item.name)}
//             >
//                 <Text style={styles.deleteText}>×</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 style={styles.cardContent}
//                 onPress={() =>
//                     navigation.navigate("description", {
//                         spotId: item._id,
//                         userId: userId,
//                     })
//                 }
//             >
//                 <Image
//                     source={{ uri: item.imageUrl?.[0] }}
//                     style={styles.image}
//                 />
//                 <View style={styles.info}>
//                     <Text style={styles.title}>{item.name}</Text>
//                 </View>
//             </TouchableOpacity>
//         </View>
//     );

//     if (loading) {
//         return (
//             <View style={styles.center}>
//                 <ActivityIndicator size="large" color="#00c6ff" />
//             </View>
//         );
//     }

//     if (error) {
//         return (
//             <View style={styles.center}>
//                 <Text style={styles.error}>{error}</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Địa điểm yêu thích</Text>
//             <FlatList
//                 data={filteredSpots}
//                 keyExtractor={(item) => item._id}
//                 renderItem={renderItem}
//                 ListEmptyComponent={
//                     <View style={styles.center}>
//                         <Text style={styles.emptyText}>
//                             Chưa có địa điểm nào trong mục yêu thích.
//                         </Text>
//                     </View>
//                 }
//                 contentContainerStyle={{ paddingBottom: 100 }}
//             />
//         </View>
//     );
// };

// export default FavouriteList;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingHorizontal: 16,
//         paddingTop: 20,
//     },
//     header: {
//         fontSize: 20,
//         fontWeight: '700',
//         marginBottom: 10,
//     },
//     card: {
//         backgroundColor: '#f9f9f9',
//         marginBottom: 12,
//         padding: 12,
//         borderRadius: 10,
//         position: 'relative',
//     },
//     deleteButton: {
//         position: 'absolute',
//         top: 6,
//         right: 6,
//         backgroundColor: '#ff4d4f',
//         width: 26,
//         height: 26,
//         borderRadius: 13,
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1,
//     },
//     deleteText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     cardContent: {
//         flexDirection: 'row',
//         gap: 12,
//     },
//     image: {
//         width: 120,
//         height: 120,
//         borderRadius: 8,
//     },
//     info: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     title: {
//         fontWeight: '600',
//         fontSize: 16,
//         color: '#333',
//     },
//     center: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     error: {
//         color: 'red',
//     },
//     emptyText: {
//         textAlign: 'center',
//         marginTop: 50,
//         color: '#666',
//         fontSize: 15,
//     },
// });


import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
    fetchFavouritesByUser,
    deleteFavourite,
} from '../../../store/slices/favouriteSlice';
import { fetchSpots } from '../../../store/slices/spotSlice';
import { useNavigation } from '@react-navigation/native';

const FavouriteList = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { userFavourite, loading, error } = useSelector((state: RootState) => state.favourites);
    const { spots } = useSelector((state: RootState) => state.spots);
    const userId = useSelector((state: RootState) => state.users.userInfo?._id);

    useEffect(() => {
        if (userId) {
            dispatch(fetchFavouritesByUser(userId));
        }
        dispatch(fetchSpots());
    }, [dispatch, userId]);

    const handleDelete = (spotId: string, name: string) => {
        Alert.alert(
            'Xác nhận',
            `Bạn có chắc muốn xoá "${name}" khỏi mục yêu thích?`,
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: async () => {
                        await dispatch(deleteFavourite({ userId, spotId }));
                        Alert.alert('Thành công', `"${name}" đã được xoá khỏi mục yêu thích.`);
                    },
                },
            ]
        );
    };

    const filteredSpots = userFavourite?.spotId?.length
        ? spots.filter((spot) => userFavourite.spotId.includes(spot._id?.toString()))
        : [];

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item._id, item.name)}
            >
                <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cardContent}
                onPress={() =>
                    navigation.navigate("description", {
                        spotId: item._id,
                        userId: userId,
                    })
                }
            >
                <Image
                    source={{ uri: item.imageUrl?.[0] }}
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#00c6ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Địa điểm yêu thích</Text>
            <FlatList
                data={filteredSpots}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.emptyText}>
                            Chưa có địa điểm nào trong mục yêu thích.
                        </Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    );
};

export default FavouriteList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#f9f9f9',
        marginBottom: 12,
        padding: 12,
        borderRadius: 10,
        position: 'relative',
    },
    deleteButton: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: '#ff4d4f',
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    deleteText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardContent: {
        flexDirection: 'row',
        gap: 12,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#666',
        fontSize: 15,
    },
});
