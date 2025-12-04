import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const ButtonBack = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Intenta volver atrás en el historial, si no hay historial va al home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Button color="secondary" onClick={handleClick}>
      <i className="fa fa-arrow-left" /> Volver
    </Button>
  );
};

export default ButtonBack;
