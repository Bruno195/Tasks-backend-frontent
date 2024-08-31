import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
  }

  h4 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 5px 0;
    color: #666;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  margin: 5px 0;
  padding: 10px 15px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 25px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

export const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.get(`/tasks/${projectId}`);
      setTasks(response.data);
    };

    fetchTasks();
  }, [projectId]);

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleStatusChange = async (id, status) => {
    await api.patch(`/tasks/${id}/status`, { status });
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post(`/tasks`, { ...newTask, projectId });
    setTasks([...tasks, response.data]);
    setNewTask({ title: '', description: '', dueDate: '', status: 'Pending' });
  };

  return (
    <Container>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <div>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Status: {task.status}</p>
            </div>
            <ButtonGroup>
              <Button onClick={() => handleStatusChange(task.id, 'InProgress')}>In Progress</Button>
              <Button onClick={() => handleStatusChange(task.id, 'Completed')}>Complete</Button>
              <Button onClick={() => handleDelete(task.id)}>Delete</Button>
            </ButtonGroup>
          </ListItem>
        ))}
      </List>

      <h3>Add New Task</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <Input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
          required
        />
        <SubmitButton type="submit">Add Task</SubmitButton>
      </Form>
      <BackLink to={`/projects/`}>Back</BackLink>
    </Container>
  );
};

export default TaskList;
