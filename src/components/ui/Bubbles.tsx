// Fixed (not random) so server and client markup match.
const BUBBLES = [
  { left: 6, size: 18, duration: 22, delay: 0 },
  { left: 14, size: 9, duration: 17, delay: 4 },
  { left: 22, size: 28, duration: 27, delay: 8 },
  { left: 31, size: 12, duration: 19, delay: 2 },
  { left: 39, size: 22, duration: 24, delay: 11 },
  { left: 47, size: 7, duration: 15, delay: 6 },
  { left: 55, size: 32, duration: 30, delay: 1 },
  { left: 62, size: 14, duration: 20, delay: 13 },
  { left: 70, size: 10, duration: 16, delay: 5 },
  { left: 77, size: 25, duration: 26, delay: 9 },
  { left: 85, size: 16, duration: 21, delay: 3 },
  { left: 93, size: 11, duration: 18, delay: 14 },
];

export function Bubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `-${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
