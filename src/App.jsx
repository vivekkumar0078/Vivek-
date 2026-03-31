import React from 'react';

const VayuSynth = () => {
    const [oscType, setOscType] = React.useState('sine');
    const [gain, setGain] = React.useState(0.5);
    const [frequency, setFrequency] = React.useState(440);

    const playSound = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = oscType;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gainNode.gain.setValueAtTime(gain, audioContext.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
    };

    return (
        <div>
            <h1>Vayu Music Synthesizer</h1>
            <label>
                Oscillator Type:
                <select value={oscType} onChange={(e) => setOscType(e.target.value)}>
                    <option value="sine">Sine</option>
                    <option value="square">Square</option>
                    <option value="sawtooth">Sawtooth</option>
                    <option value="triangle">Triangle</option>
                </select>
            </label>
            <br />
            <label>
                Frequency:
                <input 
                    type="number" 
                    value={frequency} 
                    onChange={(e) => setFrequency(e.target.value)} 
                /> Hz
            </label>
            <br />
            <label>
                Gain:
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={gain} 
                    onChange={(e) => setGain(e.target.value)} 
                />
            </label>
            <br />
            <button onClick={playSound}>Play Sound</button>
        </div>
    );
};

export default VayuSynth;
