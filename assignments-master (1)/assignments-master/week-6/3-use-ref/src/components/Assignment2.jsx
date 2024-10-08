import React, { useState, useCallback, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    let times=useRef(0)
    const [forceRender, setForceRender] = useState(0);

    const handleReRender = () => {
        // Update state to force re-render
        setForceRender(forceRender+1);
    };

    times.current=times.current + 1;
   return (
        <div>
            <p>This component has rendered {times.current} times.</p>
            <button 
            // ref={times}
            onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};