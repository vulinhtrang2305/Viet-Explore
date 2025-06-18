import React from 'react';
import { View, ScrollView } from 'react-native';
// import { RootStackParamList } from '../../../navigation/AppNavigation';
import HeaderC from './HeaderC';
import BannerC from './BannerC';
import LocationScroll from './LoactionScroll';
import SuggestC from '../SuggestLocation/SuggestC';

// type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function MainHomeC() {
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={{ flex: 1 }}>
                <HeaderC />
                <BannerC
                    uri="https://ik.imagekit.io/tvlk/blog/2023/09/lang-tu-duc-11.jpg"
                    borderRadius={16}
                    width={600}
                    height={120}
                />
                <LocationScroll />
                <SuggestC />
            </View>
        </ScrollView>
    );
}