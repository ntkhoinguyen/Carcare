import React, { useRef } from 'react';
import { GestureResponderEvent, TouchableOpacity, type TouchableOpacityProps } from 'react-native';

export type SinglePressTouchableType = {
    delay?: number;
} & TouchableOpacityProps;

export const SinglePressTouchable = ({ delay = 500, onPress, children, ...props }: SinglePressTouchableType) => {


    const lastPress = useRef(0);

    const handlePress = (e: GestureResponderEvent) => {
        const now = Date.now();
        if (now - lastPress.current < delay) {
            return;
        }
        lastPress.current = now;
        if (onPress) {
            onPress(e);
        }
    };

    return (
        <TouchableOpacity {...props} onPress={handlePress}>
            {children}
        </TouchableOpacity>
    );
};
