import React, { useState, useEffect } from 'react';
import { getMergeSortAnimations } from '../mergeSort';
import { selectionSort } from '../selectionSort';

const SECONDARY_COLOR = 'red';

const ANIMATION_SPEED_MS = 7;

const Graph = () => {
    const [array, setArray] = useState([]);
    const [fillColor, setFillColor] = useState('#8884d8');
    // const [ isFirst, setIsFirst ] = useState(true);

    useEffect(() => {
        generateArray();
    }, []);

    // useEffect(() => {
    //     setArray(array);
    // }, [array]);

    const generateArray = () => {
        let newArray = [];
        for (let i = 0; i <= 50; i++) {
            newArray.push(Math.floor(Math.random() * (500 - 5) + 5));
        }
        setArray(newArray);
    };

    const mergeSort = () => {
        const animations = getMergeSortAnimations(array);
        console.log('animations', animations);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : fillColor;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    };

    const selectionSort = arr => {
        // [2,5,4, 3, 1]
        const arrayBars = document.getElementsByClassName('array-bar');
        var minIdx,
            temp,
            firstColor,
            secondColor,
            len = arr.length;
        for (var i = 0; i < len; i++) {
            minIdx = i;

            for (var j = i + 1; j < len; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            const firstBar = arrayBars[i].style;
            const sencondBar = arrayBars[minIdx].style;
            temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;

            firstBar.height = `${arr[i]}px`;
            sencondBar.height = `${arr[minIdx]}px`;
        }
    };

    return (
        <React.Fragment>
            <div
                style={{
                    maxWidth: '1000px',
                    height: '60vh',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        style={{
                            width: '7px',
                            display: 'inline-block',
                            margin: '0 1px',
                            backgroundColor: fillColor,
                            height: `${value}px`,
                        }}
                        key={idx}></div>
                ))}
            </div>
            <button style={{ marginTop: '20px', marginBottom: '20px' }} onClick={generateArray}>
                Generate New Array
            </button>
            <button style={{ marginTop: '20px', marginBottom: '20px' }} onClick={mergeSort}>
                Merge Sort
            </button>
            <button style={{ marginTop: '20px', marginBottom: '20px' }} onClick={() => selectionSort(array)}>
                Selection Sort
            </button>
        </React.Fragment>
    );
};

export default Graph;
