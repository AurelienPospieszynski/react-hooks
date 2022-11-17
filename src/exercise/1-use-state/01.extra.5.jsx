import { useState } from 'react';

//customHook pour le composant todo
const useToDo = () => {
  const [todos, setTodos] = useState(['Learn React', 'Learn React Hooks']);

  // fonction add toDo
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  // Syntaxe avec { }
  // Car on a nommé les proprietes
  // On les a nomme car mon hooks c'est useTodos,
  // il est fait pour des todos pas pour des historiques ou je sais pas
  return { todos, addTodo };
  // On utiliserait cette syntaxe :
  // return [todos, addTodo]
  // Dans un cas generique.
  // Quel est la différence de syntaxe ?

  // Quand tu retourne un tableau, tu laisses la personne libre de nommé comme elle veut, avec useState tu peux nommer tes variables comme tu veux !

  /* Par contre quand tu retourne un objet, tu définis un enemble de "clé" et ça te contraint à l'utiliser
  Même si avec un objet tu as moyen de custom ça comme ça : const { todos: listeafaire } = useTodos()*/
};

// permet de re-render que ce composant si modification dans le composant todo
// il etait avant dans app, mais cela fait re-render toute l'app meme si modif que dans le composant todo
// en faisant ca, on va venir re-render que le composant todo si modif dans todo
const ToDoList = () => {
  const { todos, addTodo } = useToDo();

  return (
    <div>
      <h2>TodoApp</h2>
      <Todos todos={todos} />
      <TodoForm addTodo={addTodo} />
    </div>
  );
};

const Todos = ({ todos }) => (
  <ul>
    {todos.map((todo, i) => (
      <li key={i}>{todo}</li>
    ))}
  </ul>
);

const TodoForm = ({ addTodo }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = e.target.todo.value;

    addTodo(todo);

    e.target.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="todo" />
      <button type="submit">Add</button>
    </form>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount((p) => p + 1)}>{count}</button>;
};

const Username = ({ username, setUsername }) => {
  return (
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  );
};

// 🦁 Il faudra ajouter les props "favoriteAnimal" et "setFavoriteAnimal" ici !
const FavoriteAnimal = ({ favoriteAnimal, setFavoriteAnimal }) => {
  return (
    <input
      type="text"
      value={favoriteAnimal}
      onChange={(e) => setFavoriteAnimal(e.target.value)}
    />
  );
};

const Greeting = ({ favoriteAnimal, username }) => {
  return (
    <p>
      <b>{username}</b>'s favorite animal is <b>{favoriteAnimal}</b>
    </p>
  );
};

// 🦁 Crée un nouveau composant nommé : "UserAnimalForm".
// Dedans tu vas avoir toute la logique par rapport à la phrase concernant
// le username et le favorite animal.
const UserAnimalForm = () => {
  // 🦁 Déplace ce state dans le composant "UserAnimalForm".
  const [username, setUsername] = useState('');
  const [favoriteAnimal, setFavoriteAnimal] = useState('Dog');

  return (
    <div className="vertical-stack">
      <h2>Animal !</h2>
      <div>
        <span>Favorite Animal</span>
        <FavoriteAnimal
          favoriteAnimal={favoriteAnimal}
          setFavoriteAnimal={setFavoriteAnimal}
        />
      </div>
      <div>
        <span>Username</span>
        <Username username={username} setUsername={setUsername} />
      </div>
      <Greeting username={username} favoriteAnimal={favoriteAnimal} />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ToDoList />
      <h2>Counter</h2>
      <Counter />
      {/* 🦁 Déplace toute cette partie dans "UserAnimalForm" */}
      <UserAnimalForm />
    </div>
  );
};

export default App;
