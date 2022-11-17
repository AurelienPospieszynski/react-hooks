import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const useDebounce = (callback, time) => {
  const timeoutRef = useRef(null);

  // La fonction onDebounce est appele a chaque fois que le user fait qqch
  // Chaque fois qu'il va taper sur son clavier, onDebounce sera appele
  const onDebounce = (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, time);
  };

  return onDebounce;
};

const fetchAgeByName = (name) => {
  return fetch(`https://api.agify.io/?name=${name}`).then((res) => res.json());
};

const useRenderCount = () => {
  const counterRef = useRef(0);

  useEffect(() => {
    counterRef.current += 1;
  });

  // return counterRef permet de pouvoir utiliser le
  // useRenderCount dans notre composant
  // voir son utilisation au point "ABCD"
  return counterRef;
};

const App = () => {
  const [result, setResult] = useState(null);
  // En passant ce ref, on stock la reference de l'input, et on aura acces
  // a la valeur partout dans l'app
  const inputRef = useRef(null);

  // "ABCD"
  const counterRef = useRenderCount();

  const onSearch = useDebounce((inputRef) => {
    fetchAgeByName(inputRef).then((data) => {
      setResult(data);
    });
  }, 2000);

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        placeholder="Type your name"
        // on change nous passe la reference de input
        onChange={() => {
          onSearch();
        }}
      />
      {result ? (
        <div style={{ padding: 16 }}>
          The age for <b>{result.name}</b> is <b>{result.age}</b> and there is{' '}
          <b>{result.count}</b> people with this name.
        </div>
      ) : null}
      <p> Render modifié {counterRef.current} fois </p>
    </div>
  );
};

export default App;
