import { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

const CustomLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Увеличиваем значение progress каждые 50 миллисекунд
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 750);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ProgressBar animated variant="primary" now={progress} />
  );
};

export default CustomLoader;
