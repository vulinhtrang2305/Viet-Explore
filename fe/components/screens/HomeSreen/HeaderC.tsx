import React, { useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppContext from '../../../provider/Context';
import { useNavigation } from '@react-navigation/native';

const iconMap: Record<string, { icon: string; color: string }> = {
    "Thiên nhiên": { icon: "leaf-outline", color: "#5EC58F" },
    "Văn hoá": { icon: "book-outline", color: "#B59CFF" },
    "Lịch sử": { icon: "time-outline", color: "#FF7B7B" },
    "Biển": { icon: "water-outline", color: "#4DA6FF" },
    "Núi": { icon: "trail-sign-outline", color: "#61D3D3" },
    "Di tích": { icon: "business-outline", color: "#FFC25C" },
};

export default function HeaderC() {
    const { category } = useContext(AppContext);
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerTop}>
                <Text style={styles.title}>Danh lam thắng cảnh Việt Nam</Text>
                <Ionicons name="search" size={24} color="#333" />
            </View>

            <Text style={styles.subtitle}>
                Tìm kiếm danh lam thắng cảnh cùng chúng tôi
            </Text>

            <View style={styles.searchBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm điểm đến, ví dụ: Côn Đảo"
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.menuGrid}>
                {Array.isArray(category) &&
                    category.map((item, index) => {
                        const info = iconMap[item.name] || {
                            icon: 'help-outline',
                            color: '#ccc',
                        };

                        return (
                            <View key={index} style={styles.menuItem}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('catgory-location', {
                                            categoryId: item._id,
                                        })
                                    }
                                >
                                    <View style={[styles.iconCircle, { backgroundColor: info.color }]}>
                                        <Ionicons name={info.icon as any} size={20} color="#fff" />
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.menuLabel}>{item.name}</Text>
                            </View>
                        );
                    })}
            </View>

            <TouchableOpacity style={styles.planButton}>
                <Text style={styles.planButtonText}>Lên lịch trình</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 16,
        flex: 1,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
    },
    subtitle: {
        marginTop: 8,
        fontSize: 14,
        color: '#555',
    },
    searchBox: {
        marginTop: 16,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    input: {
        fontSize: 16,
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    menuItem: {
        width: '28%',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    menuLabel: {
        fontSize: 13,
        color: '#333',
        textAlign: 'center',
    },
    planButton: {
        backgroundColor: '#18C0C0',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 16,
    },
    planButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
