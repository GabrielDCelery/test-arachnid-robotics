const rotateVector = ({ x, y, degrees }) => {
  const radian = (degrees * Math.PI) / 180;
  const cos = parseFloat(Math.cos(radian).toFixed(2));
  const sin = parseFloat(Math.sin(radian).toFixed(2));

  return {
    x: x * cos - y * sin,
    y: x * sin + y * cos
  };
};

console.log(
  rotateVector({
    x: 0,
    y: -1,
    degrees: 90
  })
);
