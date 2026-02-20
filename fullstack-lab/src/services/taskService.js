import supabase from '../supabase-tasks';

// Add a new task (without user_id for now)
export const addTask = async (title, period) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, completed: false, period }])
    .select();
  
  if (error) throw error;
  return data[0];
};
console.log("ADD FUNCTION TRIGGERED");
// Fetch all tasks
export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// ...rest of functions...