import './login-modal.scss';

import React from 'react';
import { ValidatedField } from 'react-jhipster';
import { Alert, Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { type FieldError, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSignInAlt, faExclamationTriangle, faKey, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
  handleClose: () => void;
}

const LoginModal = (props: ILoginModalProps) => {
  const login = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const { loginError, handleClose } = props;

  const handleLoginSubmit = e => {
    handleSubmit(login)(e);
  };

  return (
    <Modal
      isOpen={props.showModal}
      toggle={handleClose}
      backdrop="static"
      id="login-page"
      autoFocus={false}
      className="login-modal-modern"
      size="md"
    >
      <Form onSubmit={handleLoginSubmit}>
        <ModalHeader id="login-title" data-cy="loginTitle" toggle={handleClose} className="login-modal-header">
          <div className="login-header-content">
            <div className="login-icon">
              <FontAwesomeIcon icon={faSignInAlt} />
            </div>
            <div>
              <h3>Iniciar Sesión</h3>
              <p>Accede a tu cuenta</p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="login-modal-body">
          {loginError ? (
            <Alert color="danger" className="login-error-alert" data-cy="loginError">
              <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
              <div>
                <strong>Error al iniciar sesión</strong>
                <p className="mb-0">Por favor verifica tus credenciales e intenta nuevamente.</p>
              </div>
            </Alert>
          ) : null}

          <div className="login-form-fields">
            <div className="form-group-modern">
              <label htmlFor="username" className="form-label-modern">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Usuario
              </label>
              <ValidatedField
                name="username"
                placeholder="Ingresa tu usuario"
                required
                autoFocus
                data-cy="username"
                validate={{ required: 'El usuario es requerido' }}
                register={register}
                error={errors.username as FieldError}
                isTouched={touchedFields.username}
                className="input-modern"
              />
            </div>

            <div className="form-group-modern">
              <label htmlFor="password" className="form-label-modern">
                <FontAwesomeIcon icon={faLock} className="me-2" />
                Contraseña
              </label>
              <ValidatedField
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                required
                data-cy="password"
                validate={{ required: 'La contraseña es requerida' }}
                register={register}
                error={errors.password as FieldError}
                isTouched={touchedFields.password}
                className="input-modern"
              />
            </div>

            <div className="form-check-modern">
              <ValidatedField name="rememberMe" type="checkbox" check label="Recordarme" value={true} register={register} />
            </div>
          </div>

          <div className="login-links">
            <Link to="/account/reset/request" data-cy="forgetYourPasswordSelector" className="login-link">
              <FontAwesomeIcon icon={faKey} className="me-2" />
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div className="login-register-link">
            <span>¿No tienes cuenta?</span>
            <Link to="/account/register" className="register-link">
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Regístrate ahora
            </Link>
          </div>
        </ModalBody>
        <ModalFooter className="login-modal-footer">
          <Button color="secondary" onClick={handleClose} tabIndex={1} className="btn-cancel">
            Cancelar
          </Button>
          <Button color="primary" type="submit" data-cy="submit" className="btn-login">
            <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
            Iniciar Sesión
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default LoginModal;
