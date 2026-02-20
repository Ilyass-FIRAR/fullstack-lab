# 📝 FullStack Todo App

A modern, premium-looking todo application built with React, Tailwind CSS, and Supabase backend.

## ✨ Features

- **Multi-Period Objectives**: Organize tasks by Daily, Weekly, and Monthly goals
- **Complete CRUD Operations**: Add, Read, Update, and Delete tasks
- **Real-time Database**: All tasks synced with Supabase backend
- **Task Completion Toggle**: Mark tasks as done/undone with visual feedback
- **Progress Tracking**: View completion stats for each objective period
- **Premium UI**: Beautiful glassmorphism design with Tailwind CSS
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Hooks

## 📋 Project Structure

```
fullstack-lab/
├── src/
│   ├── assets/
│   │   └── TodoList.jsx          # Main todo component
│   ├── services/
│   │   ├── taskService.js        # Database CRUD functions
│   │   ├── authService.js        # Authentication functions
│   │   └── debugSupabase.js      # Testing utilities
│   ├── supabase-tasks.jsx        # Supabase client
│   ├── index.css                 # Tailwind styles
│   ├── App.jsx
│   └── main.jsx
├── .env.local                    # Environment variables (not committed)
├── .gitignore                    # Git ignore rules
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Supabase account with project created

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ilyass-FIRAR/fullstack-lab.git
cd fullstack-lab
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_publishable_key
```

Get these keys from your Supabase project:
- Settings → API → Publishable Key & URL

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:5173
```

## 📦 Supabase Setup

### Create Tables

**tasks table:**
```sql
CREATE TABLE tasks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  period TEXT DEFAULT 'daily', -- daily, weekly, monthly
  user_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**users table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Enable Row-Level Security (Optional)

For multi-user support, enable RLS policies to secure data access.

## 🎯 Usage

### Add a Task
1. Type task title in the input field
2. Select period (Daily, Weekly, or Monthly)
3. Click "Add" button
4. Task appears in the corresponding section

### Complete a Task
- Click the "Complete" button to mark as done
- Completed tasks show with a strikethrough
- Click "Undo" to revert

### Edit a Task
- Click "Update" button on a task
- Modify the title
- Click "Save" or "Cancel"

### Delete a Task
- Click "Delete" button to remove task
- Deletion is permanent

## 🔐 Security

- API keys are stored in `.env.local` (not committed to Git)
- `.gitignore` prevents environment files from being exposed
- Use Row-Level Security in Supabase for multi-user apps
- Rotate API keys if exposed

## 📊 API Functions

### Task Service (`src/services/taskService.js`)

```javascript
// Fetch all tasks
fetchTasks()

// Add new task
addTask(title, period)

// Update task
updateTask(taskId, updates)

// Delete task
deleteTask(taskId)
```

### Auth Service (`src/services/authService.js`)

```javascript
// Sign up
signUp(email, password, name)

// Sign in
signIn(email, password)

// Sign out
signOut()

// Get current user
getCurrentUser()
```

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🎨 Customization

### Change Theme Colors

Edit `src/index.css` and update Tailwind classes in components.

### Modify Task Periods

Update `selectedPeriod` options in `src/assets/TodoList.jsx`:
```javascript
<select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
  <option value="daily">Daily</option>
  <option value="weekly">Weekly</option>
  <option value="monthly">Monthly</option>
  {/* Add more periods */}
</select>
```

## 📱 Future Enhancements

- [ ] User authentication & login page
- [ ] Recurring tasks
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Task priority levels
- [ ] Dark mode toggle
- [ ] Export tasks to PDF/CSV
- [ ] Collaborative tasks
- [ ] Mobile app (React Native)


### "Invalid API key" error
- Verify `.env.local` has correct Supabase keys
- Restart dev server: `npm run dev`
- Hard refresh browser: `Ctrl+Shift+R`

### Tasks not appearing in Supabase
- Check Row-Level Security policies
- Verify `tasks` table exists in Supabase
- Use browser DevTools Console to debug



## 📄 License

MIT License - feel free to use this project for personal or commercial use.
(3iich HHHHH)

---

**Happy coding!** 🎉