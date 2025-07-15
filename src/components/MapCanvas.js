import React, { useEffect, useRef } from 'react';

const MapCanvas = ({ path }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!path || path.length < 2) return;

    let animationFrameId;
    let segmentIndex = 0;
    let progress = 0;
    const speed = 2; // Pixels per frame

    function drawNextSegment() {
      const from = path[segmentIndex];
      const to = path[segmentIndex + 1];
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const distance = Math.hypot(dx, dy);

      progress += speed;
      const t = Math.min(progress / distance, 1);
      const currentX = from.x + dx * t;
      const currentY = from.y + dy * t;

      // Draw line up to current point
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(currentX, currentY);
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw circles for path points
      path.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'lightblue';
        ctx.fill();
        ctx.strokeStyle = 'darkblue';
        ctx.stroke();
      });

      if (t < 1) {
        animationFrameId = requestAnimationFrame(drawNextSegment);
      } else if (segmentIndex < path.length - 2) {
        segmentIndex++;
        progress = 0;
        animationFrameId = requestAnimationFrame(drawNextSegment);
      }
    }

    drawNextSegment();

    return () => cancelAnimationFrame(animationFrameId);
  }, [path]);

  return (
    <canvas
      ref={canvasRef}
      width="680"
      height="300"
      style={{ border: '2px solid #ddd', borderRadius: '8px' }}
    />
  );
};

export default MapCanvas;
