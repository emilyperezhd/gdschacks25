import React from "react";

const TerminalOverlay = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="relative bg-cyber-terminal-bg backdrop-blur-lg border border-border rounded-lg p-3 overflow-hidden font-mono">
        {/* Status bar */}
        <div className="flex items-center justify-between mb-2 border-b border-border pb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <p className="text-xs text-red-500">CRITICAL ALERT</p>
          </div>
          <p className="text-xs text-white">SPECIES: Ailurus fulgens</p>
        </div>

        {/* Header */}
        <p className="text-sm text-white mb-2 tracking-tight">
          <span className="text-red-500">/</span> RED PANDA STATUS: <strong className="text-white">ENDANGERED</strong>
        </p>

        {/* Facts list */}
        <div className="space-y-1.5 text-xs text-white">
          <div className="flex items-center">
            <div className="text-red-500 mr-2">01</div>
            <span>Fewer than <strong>10,000</strong> red pandas remain in the wild.</span>
          </div>
          <div className="flex items-center">
            <div className="text-red-500 mr-2">02</div>
            <span>Over <strong>70%</strong> of their bamboo forest habitat has been cleared.</span>
          </div>
          <div className="flex items-center">
            <div className="text-red-500 mr-2">03</div>
            <span>Poaching and road collisions kill <strong>hundreds</strong> every year.</span>
          </div>
          <div className="flex items-center">
            <div className="text-red-500 mr-2">04</div>
            <span>Predictions warn of mass starvation if bamboo forests disappear.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalOverlay;
