import { useReducer } from 'react';

const REDUCER_ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset',
  CHANGE: 'change',
};

//On destructure ici notre objet, qui a pour param, action et values
const reducer = (state, { action, value = 1 }) => {
  switch (action) {
    case REDUCER_ACTIONS.INCREMENT:
      console.log('increment :', 'state', state, 'value', value);
      return state + value;

    case REDUCER_ACTIONS.DECREMENT:
      console.log('decrement :', 'state', state, 'value', value);
      return state - value;

    case REDUCER_ACTIONS.RESET:
      console.log('reset: state', state, ' value', value);
      console.log('state = 0', (state = 0));
      return 0;

    case REDUCER_ACTIONS.CHANGE:
      console.log('setInput : ', 'state', state, 'value', value);
      return value;

    default:
      throw new Error('Unexpected action');
  }
};

// Possibilite de passer par un custom hook de cette facon
// const useCounterReducer = () => {
//   const [count, dispatch] = useReducer(reducer, 0);
//   return [count, dispatch];
// };

// const Counter = () => {
//   const [count, dispatch] = useCounterReducer();

const Counter = () => {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <label>Tape un chiffre :</label>
      <input
        type="number"
        value={count}
        onChange={(e) => {
          dispatch({
            action: REDUCER_ACTIONS.CHANGE,
            value: Number(e.target.value),
          });
        }}
      ></input>
      <br></br>
      <button
        onClick={() => {
          dispatch({ action: REDUCER_ACTIONS.RESET, value: 0 });
        }}
      >
        reset
      </button>
      <br></br>
      <button
        onClick={() => {
          dispatch({ action: REDUCER_ACTIONS.DECREMENT, value: 5 });
        }}
      >
        -5
      </button>
      <button
        onClick={() => {
          dispatch({ action: REDUCER_ACTIONS.DECREMENT });
        }}
      >
        -
      </button>
      <button>{count}</button>
      <button
        onClick={() => {
          dispatch({ action: REDUCER_ACTIONS.INCREMENT });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch({ action: REDUCER_ACTIONS.INCREMENT, value: 5 });
        }}
      >
        +5
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};

export default App;
