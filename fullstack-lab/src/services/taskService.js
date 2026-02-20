import supabase from '../supabase-tasks';

// Add a new task
export const addTask = async (title, period) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, completed: false, period }])
    .select();
  
  if (error) throw error;
  return data[0];
};

// Fetch all tasks
export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Update a task
export const updateTask = async (taskId, updates) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', taskId)
    .select();
  
  if (error) throw error;
  return data[0];
};

// Delete a task
export const deleteTask = async (taskId) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);
  
  if (error) throw error;
};