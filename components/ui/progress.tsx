import * as React from "react";

export const Progress = ({ value = 0 }: { value: number }) => {
  return (
    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-space-rose to-space-gold transition-all duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
