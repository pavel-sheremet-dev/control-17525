import { useEffect, useState } from 'react';
import {
  AngleLine1,
  AngleLine2,
  HorizontalLine,
} from './BackgoundElements.styled';

const BackgoundElements = () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(0.9);
  }, []);

  return (
    <>
      <AngleLine1 opacity={opacity} />
      <HorizontalLine opacity={opacity} delay={100} />
      <AngleLine2 opacity={opacity} delay={200} />
    </>
  );
};

export default BackgoundElements;
