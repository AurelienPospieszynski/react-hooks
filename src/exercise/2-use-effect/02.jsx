import { useState, useEffect } from 'react';

const NAME_KEY = 'name';

const getInitialName = (key, defaultValue) => {
  const storedItem = localStorage.getItem(key);

  if (!storedItem) {
    return defaultValue;
  }

  try {
    // le if precedent permet de check que storedItem n'est pas undefined
    // si pas undefined, on vient parser la valeur
    return JSON.parse(storedItem);
  } catch (e) {
    // dans le cas où il y'a une erreur qu'est survenu, on supprime l'item pour que
    // l'erreur ne revienne pas la prochaine fois
    localStorage.removeItem(key);
    return defaultValue;
  }
};

// custom hook
// Qui est d'autant plus utile car il peut permetter de garder en memoire un autre state
const useStickyState = (key, defaultValue) => {
  // Utiliser la syntaxe d'arrow function dans le useState uniquement quand il y a qqch
  // de lourd qui est appele dans le useState
  // ici venir recuperer la valeur du localStorage c'est lourd
  // Cela permet d'eviter d'appeler la fonction a chaque update
  const [name, setName] = useState(() => getInitialName(key, defaultValue));

  // [] -> Ajout d'un tableau de dependance :
  // C'est un tableau qui sont des states
  // Par exemple le name de const[name, setName]
  // Qui a chaque fois qu'elles sont modifiees, vont relancer le useEffect()
  // Ajouter cette dependance va permettre d'appeler le useEffect que qd 'name' change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(name));
  }, [key, name]);
  4;

  /*Quand tu retourne un tableau, tu laisses la personne libre de nommé 
  comme elle veut, avec useState tu peux nommer tes variables comme tu veux ! 
  Par contre quand tu retourne un objet, tu définis un enemble de "clé" 
  et ça te contraint à l'utiliser */
  return [name, setName];
};

const NameInput = ({ defaultValue }) => {
  const [name, setName] = useStickyState(NAME_KEY, defaultValue);
  return (
    <label className="textfield">
      Name
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </label>
  );
};

const Counter = () => {
  // on pourrait du coup par exemple utiliser notre customHook useStickyState
  // Pour le counter a la place du useState et faire
  // const [counter, setCounter] = useStickyState('counter', 0);
  const [counter, setCounter] = useState(0);
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    if (checkbox) {
      const handleResize = () => {
        setCounter((current) => current + 1);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [checkbox]);
  return (
    <div>
      <button onClick={() => setCounter(0)}>{counter}</button>
      <input
        type="checkbox"
        checked={checkbox}
        onChange={(e) => {
          setCheckbox(e.target.checked);
        }}
      ></input>
    </div>
  );
};

const App = () => {
  return (
    <div className="vertical-stack">
      <Counter />
      <NameInput defaultValue="" />
    </div>
  );
};

export default App;
