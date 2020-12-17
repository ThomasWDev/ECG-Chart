import React, { useState, useRef, useEffect } from 'react';
import {View, Button} from "react-native";
import Canvas from 'react-native-canvas';
import {CanvasDrawer} from "./drawer";

const CanvasTest = (props) => {
    const [ecgData, setEcgData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0.08, 0.18, 0.08, 0, 0, 0, 0, 0, 0, -0.04,
        -0.08, 0.3, 0.7, 0.3, -0.17, 0.00, 0.04, 0.04,
        0.05, 0.05, 0.06, 0.07, 0.08, 0.10, 0.11, 0.11,
        0.10, 0.085, 0.06, 0.04, 0.03, 0.01, 0.01, 0.01,
        0.01, 0.02, 0.03, 0.05, 0.05, 0.05, 0.03, 0.02, 0, 0, 0]);
    let [ECGidx, setECGidx] = useState(0);
    let [lastData, setlastData] = useState(0);
    let ecg = useRef(null);

    const hysteresisRandom = () => {
        setlastData(lastData += (Math.floor((Math.random() * 5) + 1)-3)/50);
        if (Math.abs(lastData) >= 1) lastData = (lastData > 0) ? 1 : -1;
        return lastData;
    }

    const getECG = () => {
        if (ECGidx++ >= ecgData.length - 1) ECGidx=0;
        let output = [];
        output[0] = ecgData[ECGidx] + hysteresisRandom()/10;
        return output;
    }

    const handleCanvas = (canvas) => {
        // const ctx = canvas.getContext('2d');
        if (canvas === null) {
            return
        }
        ecg = new CanvasDrawer(canvas, getECG);
        ecg.speed = 2;
        ecg.scaleFactor = 0.8;
    }

    return (
        <View>
            <Canvas ref={handleCanvas}/>
            <Button
                title={
                    ecg.started ?
                        'Stop' :
                        'Start'
                }
            />
        </View>
    )
}

export default CanvasTest;
