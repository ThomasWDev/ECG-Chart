import React, {
    Component,
} from 'react';
import {
    View,
} from 'react-native';

import {AnimatedSVGPath} from 'react-native-svg-animations';

const HISVG = (props) => {
    return (
        <View style={{ marginTop: 40 }}>
            <AnimatedSVGPath
                strokeColor={"green"}
                duration={1600}
                strokeWidth={3}
                height={200}
                width={200}
                scale={1.0}
                delay={0}
                d='M17.902,114.475h26.949c2.296,0,12.876-10.182,20.063-10.182c7.186,0,10.83,10.182,12.576,10.182h18.266l7.187,10.779l7.485-100.91l5.091,114.984l6.887-24.554h24.41c3.239,0,14.816-16.769,20.206-16.769s11.08,16.47,13.475,16.47c2.845,0,26.665,0,26.365,0'
            />
        </View>
    );
}

export default HISVG;
