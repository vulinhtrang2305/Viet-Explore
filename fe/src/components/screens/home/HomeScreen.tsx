import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigation';
import HeaderC from './HeaderC';
import BannerC from './BannerC';
import LocationScroll from './LoactionScroll';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    return (
        <ScrollView>
            <View style={{ flex: 1, }}>
                <HeaderC />
                <BannerC
                    uri="https://ik.imagekit.io/tvlk/blog/2023/09/lang-tu-duc-11.jpg"
                    borderRadius={16}
                    width={600}
                    height={120}
                />
               <LocationScroll/>
            </View>
        </ScrollView>
    );
}