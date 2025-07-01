import React from 'react';

interface ScoreBarProps {
  score: number;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score }) => {
  const scoreInt = Math.max(0, Math.min(score, 100));
  const markerPos = `${scoreInt}%`;

  return (
    <div>
        <div className='flex justify-between py-1'>
            <span>Ihre Chance</span>
            <span>{score}%</span>
        </div>
        <div className="relative w-full h-2 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-teal-500 shadow-inner">
            <div className="absolute top-1/2 w-3 h-3 rounded-full  bg-transparent border-2" style={{ left: markerPos, transform: 'translate(-50%, -50%)' }}/>
        </div>        
    </div>

  );
};

export default ScoreBar;