import React from 'react';
import ProjectEdit  from "../components/ProjectEdit"
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;



const ProjectPage = () => {
  const { projectId } = useParams(); 
  
  return (
    <Container>
      <ProjectEdit projectId={projectId} />
    </Container>
  );
};

export default ProjectPage;
