import { useReducer,useState } from 'react';

function ageReducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }

  }
  throw Error('Unknown action: ' + action.type);
}

const initialState = { name: '', age: 18 };

export default function Form() {
  const [age2, setAge2] = useState(0)  
  const [state, dispatch] = useReducer(ageReducer, initialState);

  function handleButtonClick() {
    dispatch(
        { 
            type: 'incremented_age' 
        }
    );
  }

  function handleChangeName(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    }); 
  }

  return (
    <>
      <input
        value={state.name}
        onChange={handleChangeName}
      />
      <button onClick={handleButtonClick}>
        Increment age
      </button>
      <p>Hello, {state.name}. You are {state.age}.</p>
      <p>Hello, this is age2 from normal use State hook: {age2}.</p>
    </>
  );
}
