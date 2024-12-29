import React, { useState } from 'react'

const MouseFollowingCircle = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isInside, setIsInside] = useState(false);

    const handleMouseMove = (e) => {
        const container = e.currentTarget.getBoundingClientRect();
        // getBoundingClientRect(): Returns an object with the dimensions and position of the element relative to the viewport. This includes:
        // left: The distance from the left edge of the viewport to the element's left edge.
        // top: The distance from the top edge of the viewport to the element's top edge.
        // Other properties like width, height, right, and bottom are also available.

        // e.clientX: The x-coordinate of the mouse cursor relative to the viewport (browser window).
        // e.clientY: The y-coordinate of the mouse cursor relative to the viewport.
        setMousePos({   
            x: e.clientX - container.left, // This gives the x-coordinate of the mouse relative to the left edge of the container.
            y: e.clientY - container.top // This gives the y-coordinate of the mouse relative to the top edge of the container.
        });
    };

    return (
        <div className="relative overflow-hidden w-full h-64 sm:w-96 sm:h-96 rounded shadow-xl bg-slate-100" onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsInside(true)} onMouseLeave={() => setIsInside(false)}>
            {isInside && (
                <div className="absolute rounded-full bg-radial-gray pointer-events-none w-10 h-10 transition-all duration-0 ease-linear"
                    style={{ left: `${mousePos.x - 20}px`, top: `${mousePos.y - 20}px` }} />
            )}
        </div>
    );
}

export default MouseFollowingCircle