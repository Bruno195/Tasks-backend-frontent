import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f4f4f4;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
  font-size: 28px;
`;

const CreateLink = styled(Link)`
  padding: 12px 25px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogoutLink = styled(Link)`
  padding: 12px 25px;
  background-color: #dc3545;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }

  &:focus {
    outline: none;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  transition: transform 0.3s ease, background-color 0.3s ease;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #f1f1f1;
    transform: translateY(-3px);
  }

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  div {
    display: flex;
    gap: 10px;
  }
`;

const Button = styled.button`
  padding: 8px 15px;
  font-size: 14px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const EditLink = styled(Link)`
  padding: 8px 15px;
  background-color: #ffc107;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0a800;
  }
`;

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await api.get('/projects');
      setProjects(response.data);
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/projects/${id}`);
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <Container>
      <Header>
        <Title>Projects</Title>
        <CreateLink to="/projects/new">Create New Project</CreateLink>
        <LogoutLink to="/" onClick={() => localStorage.clear()}>Logout</LogoutLink>
      </Header>
      <List>
        {projects.map((project) => (
          <ListItem key={project.id}>
            <Link to={`/projects/${project.id}/tasks?name=${project.name}`}>{project.name}</Link>
            <div>
              <EditLink to={`/projects/edit/${project.id}`}>Edit</EditLink>
              <Button onClick={() => handleDelete(project.id)}>Delete</Button>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProjectList;
