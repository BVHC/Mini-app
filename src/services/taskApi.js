
const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const fetchTodos = async () => {
  const res = await fetch(`${BASE_URL}/todos?_limit=10`)
  const data = await res.json();
  return data;
}

