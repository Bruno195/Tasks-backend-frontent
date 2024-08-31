import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectPage';
import TasksPage from './pages/TasksPage';
import NewProjectPage from './pages/NewProjectPage';
import RegisterPage from './pages/Register';
import EditPage from './pages/EditPage';
function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/new" element={<NewProjectPage />} />
        <Route path="/projects/:projectId/tasks" element={<TasksPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/projects/edit/:projectId' element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default App;