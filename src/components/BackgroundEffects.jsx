import React, { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create stars, hearts, and dust particles
    const starCount = Math.min(80, Math.floor(width / 18));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));

    const heartCount = Math.min(18, Math.floor(width / 70));
    const hearts = Array.from({ length: heartCount }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 200,
      size: Math.random() * 12 + 8,
      speed: Math.random() * 0.6 + 0.3,
      drift: Math.sin(Math.random() * Math.PI * 2),
      alpha: Math.random() * 0.4 + 0.2,
      hue: Math.random() > 0.4 ? 'rgba(251, 113, 133, ' : 'rgba(192, 132, 252, ',
    }));

    const drawHeart = (cx, cy, size, color) => {
      ctx.save();
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(cx, cy + topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(
        cx, cy, 
        cx - size / 2, cy, 
        cx - size / 2, cy + topCurveHeight
      );
      // bottom left curve
      ctx.bezierCurveTo(
        cx - size / 2, cy + (size + topCurveHeight) / 2, 
        cx, cy + (size + topCurveHeight) / 1.4, 
        cx, cy + size
      );
      // bottom right curve
      ctx.bezierCurveTo(
        cx, cy + (size + topCurveHeight) / 1.4, 
        cx + size / 2, cy + (size + topCurveHeight) / 2, 
        cx + size / 2, cy + topCurveHeight
      );
      // top right curve
      ctx.bezierCurveTo(
        cx + size / 2, cy, 
        cx, cy, 
        cx, cy + topCurveHeight
      );
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += s.speed * s.direction;
        if (s.alpha > 0.95) {
          s.alpha = 0.95;
          s.direction = -1;
        } else if (s.alpha < 0.15) {
          s.alpha = 0.15;
          s.direction = 1;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254, 240, 138, ${s.alpha * 0.8})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(253, 224, 71, 0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Render floating hearts
      for (let j = 0; j < hearts.length; j++) {
        const h = hearts[j];
        h.y -= h.speed;
        h.x += Math.sin(time + j) * 0.4;

        if (h.y < -50) {
          h.y = height + 40;
          h.x = Math.random() * width;
        }

        drawHeart(h.x, h.y, h.size, `${h.hue}${h.alpha})`);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Soft atmospheric gradient orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-rose-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[28rem] h-[28rem] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
    </div>
  );
}
