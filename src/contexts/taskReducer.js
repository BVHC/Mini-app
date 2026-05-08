
export const initialTaskState = {
  tasks: [], 
}
export const taskReducer = (state, action) => {
  switch (action.type){
    case 'ADD':
      return {...state, tasks: [action.payload, ...state.tasks]}
    case 'UPDATE':
      return {...state, tasks: state.tasks.map(t => t.id === action.payload.id ? {...t, status: action.payload.status} : t)}
    case 'DELETE':
      return {...state, tasks: state.tasks.filter(t => t.id !== action.payload.id)}
    default: 
      return state
  }
}
