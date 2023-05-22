import { View, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react'

const ViewType = ({ onSelect }) => {

    const data = [{
        'value': 'List',
        'icon': 'list-outline',
        'iconSelected': 'list',
        'size': 30
    },
    {
        'value': 'Grid',
        'icon': 'grid-outline',
        'iconSelected': 'grid',
        'size': 25
    }
    ]
    const [view, setView] = useState('List')

    const selectHandler = (value) => {
        onSelect(value);
        setView(value)
    }
    return (
        <View className="flex-row bg-white rounded-lg items-center px-2 m-2">
            {data.map((item) => {
                return <Pressable key={item.value} onPress={() => selectHandler(item.value)} className={`${item.value==view ? 'bg-white shadow-xl w-9 h-9 rounded-md' : 'bg-slate-100 shadow-lg w-8 h-8 rounded-sm'}  shadow-lg shadow-black justify-center items-center`}>
                    <Ionicons name={`${item.value==view ? item.iconSelected : item.icon}`} color='#252626' size={item.size} />
                </Pressable>
            })}
        </View>
    )
}

export default ViewType