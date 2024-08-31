import React from 'react';
import TaskList from '../components/TaskList';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const TasksPage = () => {
  const { projectId } = useParams(); // Obtém o ID do projeto a partir dos parâmetros da URL
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const name =  queryParams.get('name')

  
  return (
    <Container>
      <Title>Tasks for Project {name}</Title>
      <TaskList projectId={projectId} />
    </Container>
  );
};

export default TasksPage;
