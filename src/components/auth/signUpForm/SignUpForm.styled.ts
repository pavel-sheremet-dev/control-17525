import { Form } from 'formik';
import styled from 'styled-components';

export const FormStyled = styled(Form)`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakPoints.desktop}) {
    max-width: 370px;
  }

  & label {
    margin-bottom: 20px;
  }

  & button[type='submit'] {
    width: 100%;
  }
`;
