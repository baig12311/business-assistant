import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
//import MaterialDesignIcons from 'react-native-vector-icons/MaterialDesignIcons';
import {
    FontAwesome,
    FontAwesome5, Fontisto,
    Ionicons,
    MaterialCommunityIcons,
    Entypo,
    Feather,
    AntDesign,
    EvilIcons,
    FontAwesome6,
    Octicons,
    SimpleLineIcons,
    Foundation,

} from '@expo/vector-icons';
interface IconProps {
    name: string;
    size: number;
    color: string;
    type: string;
}
const Icon: React.FC<IconProps> = ({ name, size, color, type }) => {
    return (
        <View>
            {
                type === 'MaterialIcons' ? (
                    <MaterialIcons name={name as any} size={size} color={color} />
                )
                    : type === 'FontAwesome' ? (
                        <FontAwesome name={name as any} size={size} color={color} />
                    )
                        : type === 'FontAwesome5' ? (
                            <FontAwesome5 name={name as any} size={size} color={color} />
                        ) :
                            type === 'Fontisto' ? (
                                <Fontisto name={name as any} size={size} color={color} />
                            ) :
                                type === 'Ionicons' ? (
                                    <Ionicons name={name as any} size={size} color={color} />
                                ) :
                                    type === 'Entypo' ? (
                                        <Entypo name={name as any} size={size} color={color} />
                                    ) :
                                        type === 'Feather' ? (
                                            <Feather name={name as any} size={size} color={color} />

                                        ) :
                                            type === 'AntDesign' ? (
                                                <AntDesign name={name as any} size={size} color={color} />
                                            ) :
                                                type === 'EvilIcons' ? (
                                                    <EvilIcons name={name as any} size={size} color={color} />

                                                ) :
                                                    type === 'FontAwesome6' ? (
                                                        <FontAwesome6 name={name as any} size={size} color={color} />
                                                    ) :
                                                        type === 'Octicons' ? (
                                                            <Octicons name={name as any} size={size} color={color} />
                  
                                                        ) :
                                                            type === 'SimpleLineIcons' ? (
                                                                <SimpleLineIcons name={name as any} size={size} color={color} />
                                                            ) :
                                                                type === 'Foundation' ? (
                                                                    <Foundation name={name as any} size={size} color={color} />
                                                                ) :

                                                                    (
                                                                        <MaterialCommunityIcons name={name as any} size={size} color={color} />
                                                                    )}
        </View>
    );
}
export default Icon;