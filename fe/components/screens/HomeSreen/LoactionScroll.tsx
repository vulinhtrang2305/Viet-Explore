import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchSpots } from "../../../store/slices/spotSlice";
import { RootState } from "../../../store";

const LocationScroll = (props: any) => {
    const dispatch = useDispatch();
    const { spots, loading, error } = useAppSelector((state) => state.spots);
    const userId = useSelector((state: RootState) => state.users.userInfo?._id);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Điểm đến phổ biến</Text>
                <TouchableOpacity onPress={() => navigation.navigate("list-details")}>
                    <Text style={styles.viewAll}>Tất cả</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={spots.slice(0, 10)}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 12 }}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("description", {
                                    spotId: item._id,
                                    userId: userId, 
                                })
                            }
                        >
                            <Image source={{ uri: item.imageUrl[0] }} style={styles.image} />
                        </TouchableOpacity>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default LocationScroll;

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        paddingHorizontal: 16,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    viewAll: {
        color: "#0080FF",
        fontSize: 14,
    },
    item: {
        marginRight: 16,
        alignItems: "center",
    },
    image: {
        width: 120,
        height: 140,
        borderRadius: 12,
        marginBottom: 8,
    },
    name: {
        fontSize: 14,
        color: "#333",
    },
});