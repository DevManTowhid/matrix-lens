// InteractiveGrid.jsx
import { useState, useRef } from 'react';

const InteractiveGrid = ({ imageSrc }) => {
  const [rows, setRows] = useState(10); // m
  const [cols, setCols] = useState(10); // n
  const [hoverData, setHoverData] = useState(null);
  
  // Ref to access the HTML image element to read pixel data
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    // 1. Get mouse coordinates relative to the image
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 2. Calculate which "Matrix Cell" (i, j) we are in
    const cellW = rect.width / cols;
    const cellH = rect.height / rows;
    
    const colIndex = Math.floor(x / cellW); // j
    const rowIndex = Math.floor(y / cellH); // i

    // 3. Extract Pixel Data (The Math)
    // You would use a hidden <canvas> here to read the actual RGB values of that coordinate
    const pixelInfo = getAverageColor(imgRef.current, rowIndex, colIndex, rows, cols);

    setHoverData({ i: rowIndex, j: colIndex, ...pixelInfo });
  };

  return (
    <div className="relative inline-block shadow-2xl rounded-lg overflow-hidden border border-gray-700">
        {/* The Image */}
        <img 
            ref={imgRef} 
            src={imageSrc} 
            className="block max-w-full h-auto" 
            alt="Analysis Target" 
        />

        {/* The Grid Overlay */}
        <div 
            className="absolute inset-0 grid"
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoverData(null)}
        >
            {/* Generate Grid Cells */}
            {Array.from({ length: rows * cols }).map((_, idx) => (
                <div 
                    key={idx} 
                    className="border border-cyan-400/30 hover:bg-cyan-400/20 transition-colors duration-75"
                ></div>
            ))}
        </div>
    </div>
  );
};