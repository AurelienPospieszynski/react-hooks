import { useState } from 'react';

// Separation de la logique metier, ou on met ici que la logique du add et delete history
const useStateHistory = () => {
  const [history, setHistory] = useState([]);

  const addHistory = (value = '') => {
    setHistory((current) => [...current, value]);
  };

  const deleteHistory = (index) => {
    if (!index) return;
    setHistory((current) => {
      return current.filter((_, i) => i !== index);
    });
  };

  return { history, addHistory, deleteHistory };
};

//Custom Hook pour gestion du nom.
// Si ajout de hook sur le nom pourra ajouter la logique dans cette constante
const useStateName = () => {
  const [name, setName] = useState('');

  const setNameValue = (value) => {
    setName(value);
  };

  const reverseName = (value) => {
    return 'Name Reversed :' + value.split('').reverse().join('');
  };

  return { name, setNameValue, reverseName };
};

const useStateChecked = () => {
  const [isChecked, setChecked] = useState(false);

  return { isChecked, setChecked };
};

const App = () => {
  const { name, setNameValue, reverseName } = useStateName();
  //const [name, setName] = useState('');
  //const [isChecked, setChecked] = useState(false);
  const { isChecked, setChecked } = useStateChecked();
  const { history, addHistory, deleteHistory } = useStateHistory();

  const handleChange = (event) => {
    setNameValue(event.target.value);
    addHistory(event.target.value);
  };

  const Name = ({ name, isChecked }) => {
    if (!name) {
      return <p>Write your name</p>;
    }
    return <p>{isChecked ? reverseName(name) : 'Hello ' + name}</p>;
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        checked={isChecked}
        onChange={(event) => {
          setChecked(event.target.checked);
        }}
        type="checkbox"
      />
      <Name name={name} isChecked={isChecked}></Name>
      <ul style={{ textAlign: 'left' }}>
        {history.map((name, index) => (
          <li onClick={() => deleteHistory(index)} key={index}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
