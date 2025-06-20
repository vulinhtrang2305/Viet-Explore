import React from 'react';
import { Image, StyleSheet, View, ImageStyle, ViewStyle } from 'react-native';

interface RoundedImageProps {
    uri: string;
    borderRadius?: number;
    width?: number;
    height?: number;
    imageStyle?: ImageStyle;
    containerStyle?: ViewStyle;
}

const RoundedImage: React.FC<RoundedImageProps> = ({
    uri,
    borderRadius = 12,
    width = 120,
    height = 120,
    imageStyle,
    containerStyle,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.wrapper, { borderRadius, width, height }]}>
                <Image
                    source={{ uri }}
                    style={[styles.image, imageStyle]}
                    resizeMode="cover"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        overflow: 'hidden',
        backgroundColor: '#eee',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default RoundedImage;
