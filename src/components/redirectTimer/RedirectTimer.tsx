import { useState, useEffect, useRef } from 'react';

interface IProps {
  startRedirect(bool: boolean): void;
  time: number;
}

const RedirectTimer = ({ startRedirect, time = 5 }: IProps) => {
  const [timer, setTimer] = useState(time);
  const intervalId = useRef<null | NodeJS.Timer>(null);

  useEffect(() => {
    setTimer(time);
  }, [time]);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
    return () => clearInterval(Number(intervalId.current));
  }, []);

  useEffect(() => {
    if (timer) return;
    clearInterval(Number(intervalId.current));
    startRedirect(true);
  }, [startRedirect, timer]);

  return timer ? (
    <div>
      You will be automatically redirected after
      <b
        style={{
          display: 'inline-flex',
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50px',
          height: '30px',
          backgroundColor: 'grey',
        }}
      >
        {timer}
      </b>
      sec.
    </div>
  ) : (
    <div>Redirection...</div>
  );
};

export default RedirectTimer;
