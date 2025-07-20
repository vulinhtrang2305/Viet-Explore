import React, { useState } from 'react';
import {
    View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { createReview } from '../../../../store/slices/reviewSlice';

export default function CreateReviewScreen() {
    const { spotId } = useRoute().params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.users.userInfo);

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('5');
    const [localImage, setLocalImage] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.status !== 'granted') {
            Alert.alert('Bạn cần cấp quyền truy cập ảnh');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
            const imageUri = result.assets[0].uri;
            setLocalImage(imageUri);
            await uploadToCloudinary(imageUri);
        }
    };

    const uploadToCloudinary = async (imageUri: string) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                name: 'upload.jpg',
                type: 'image/jpeg',
            } as any);
            formData.append('upload_preset', 'ml_default'); // ⚠️ phải là preset UNSIGNED
            formData.append('cloud_name', 'dd4qz2k1g');

            const res = await fetch('https://api.cloudinary.com/v1_1/dd4qz2k1g/image/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (data.secure_url) {
                setUploadedImageUrl(data.secure_url);
                console.log("✅ Uploaded:", data.secure_url);
            } else {
                throw new Error(data.error?.message || 'Upload failed');
            }
        } catch (err) {
            console.error("❌ Upload error:", err);
            Alert.alert('Lỗi upload ảnh', err.message || 'Không thể upload ảnh');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        if (!user?._id) return Alert.alert('Bạn cần đăng nhập');

        if (!comment.trim()) return Alert.alert('Nhập nội dung đánh giá');
        if (isNaN(Number(rating)) || Number(rating) < 1 || Number(rating) > 5)
            return Alert.alert('Chấm điểm phải từ 1 đến 5');

        try {
            const result = await dispatch(
                createReview({
                    userId: user._id,
                    spotId,
                    rating: parseFloat(rating),
                    comment: comment.trim(),
                    imageUrl: uploadedImageUrl ? [uploadedImageUrl] : [],
                })
            ).unwrap();

            Alert.alert('Thành công', 'Đánh giá đã được gửi');
            setComment('');
            setRating('5');
            setLocalImage(null);
            setUploadedImageUrl(null);
            navigation.goBack();
        } catch (err) {
            console.error("❌ Review error:", err);
            Alert.alert('Lỗi', 'Gửi đánh giá thất bại');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ảnh minh hoạ</Text>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {localImage ? (
                    <Image source={{ uri: localImage }} style={styles.imagePreview} />
                ) : (
                    <Text style={styles.imagePlaceholder}>Chọn ảnh từ máy</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.label}>Đánh giá của bạn</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập đánh giá..."
                value={comment}
                onChangeText={setComment}
                multiline
            />

            <Text style={styles.label}>Chấm điểm (1–5)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={rating}
                onChangeText={setRating}
            />

            <Button
                title={uploading ? 'Đang tải ảnh...' : 'Gửi đánh giá'}
                onPress={handleSubmit}
                disabled={uploading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    label: { fontWeight: 'bold', marginBottom: 8 },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 12,
        borderRadius: 6,
        marginBottom: 16,
    },
    imagePicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    imagePlaceholder: {
        fontSize: 14,
        color: '#777',
    },
});
