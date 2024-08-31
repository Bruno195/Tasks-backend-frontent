import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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

const SubmitButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

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

const ProjectEdit = ({ projectId }) => {
  const [projectName, setProjectName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      console.log(projectId)
      const response = await api.get(`/projects/${projectId}`);
      setProjectName(response.data.name);
    };

    fetchProject();
  }, [projectId]);

  const handleInputChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/projects/${projectId}`, { name: projectName });
    navigate(`/projects`);
  };

  return (
    <Container>
      <h3>Edit Project</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Project Name"
          value={projectName}
          onChange={handleInputChange}
          required
        />
        <SubmitButton type="submit">Save Changes</SubmitButton>
      </Form>
      <BackLink to={`/projects/`}>Back</BackLink>
    </Container>
  );
};

export default ProjectEdit;
