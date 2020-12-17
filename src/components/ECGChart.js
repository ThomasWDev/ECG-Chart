import React, {
    Component,
} from 'react';
import {
    View,
} from 'react-native';
import {Svg, Circle, Defs, Rect, Ellipse, Path, Pattern, LinearGradient, Stop} from "react-native-svg";

const ECGChart = (props) => {
    return (
        <View style={{ marginTop: 40, backgroundColor: "#000" }}>
            <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
                <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
                <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
            </Svg>
        </View>
    );
}

export default ECGChart;
