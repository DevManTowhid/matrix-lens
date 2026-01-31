import { useState } from 'react';
import InteractiveGrid from './components/InteractiveGrid';
import { Settings, Upload, Move } from 'lucide-react'; // Icons

function App() {
  // State for the Grid
  const [image, setImage] = useState("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"); // Default image
  const [rows, setRows] = useState(8);
  const [cols, setCols] = useState(8);
  const [hoverInfo, setHoverInfo] = useState(null);

  // Handle Image Upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-lab-dark flex flex-col items-center p-8 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <header className="mb-8 z-10 text-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          MATRIX LENS
        </h1>
        <p className="text-slate-400 mt-2">Visual Linear Algebra Inspector</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl z-10">
        
        {/* LEFT PANEL: Controls */}
        <div className="glass-panel p-6 w-full lg:w-80 h-fit space-y-6">
          <div className="flex items-center gap-2 text-lab-accent mb-4">
            <Settings size={20} />
            <h2 className="font-semibold text-lg">Configuration</h2>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 flex justify-between">
                <span>Rows (m)</span> <span className="text-lab-accent font-mono">{rows}</span>
              </label>
              <input 
                type="range" min="2" max="64" value={rows} 
                onChange={(e) => setRows(Number(e.target.value))}
                className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer mt-2"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 flex justify-between">
                <span>Columns (n)</span> <span className="text-lab-accent font-mono">{cols}</span>
              </label>
              <input 
                type="range" min="2" max="64" value={cols} 
                onChange={(e) => setCols(Number(e.target.value))}
                className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer mt-2"
              />
            </div>
          </div>

          {/* Upload Button */}
          <div className="pt-4 border-t border-slate-700">
             <label className="flex items-center justify-center gap-2 w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer transition-all">
                <Upload size={18} />
                <span>Upload New Image</span>
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
             </label>
          </div>
        </div>

        {/* CENTER STAGE: The Grid */}
        <div className="flex-1 flex justify-center items-start min-h-[500px]">
           <InteractiveGrid 
              imageSrc={image} 
              rows={rows} 
              cols={cols} 
              setHoverInfo={setHoverInfo}
           />
        </div>

        {/* RIGHT PANEL: Inspector */}
        <div className="w-full lg:w-64">
           {hoverInfo ? (
             <div className="glass-panel p-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lab-accent font-mono text-xl mb-4">Matrix[{hoverInfo.i}][{hoverInfo.j}]</h3>
                <div className="space-y-3 text-sm text-slate-300">
                   <div className="flex justify-between">
                      <span>Row Index (i):</span>
                      <span className="font-mono text-white">{hoverInfo.i}</span>
                   </div>
                   <div className="flex justify-between">
                      <span>Col Index (j):</span>
                      <span className="font-mono text-white">{hoverInfo.j}</span>
                   </div>
                   <div className="h-px bg-slate-700 my-2"></div>
                   <p className="text-xs text-slate-500">
                      Pixel data analysis will appear here after backend connection.
                   </p>
                </div>
             </div>
           ) : (
             <div className="glass-panel p-6 text-center text-slate-500">
                <Move className="mx-auto mb-2 opacity-50" />
                <p>Hover over the grid to inspect cells</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}

export default App;