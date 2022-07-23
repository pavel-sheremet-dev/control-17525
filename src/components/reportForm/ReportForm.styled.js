// import { InputStyled } from 'components/forms/inputField/InputField.styled';
import { Form } from 'formik';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 340px;
`;

export const SelectStyled = styled.select`
  display: block;
  margin-top: 8px;
  margin-bottom: 3px;
  padding: 5px 8px;
  width: 100%;
  height: 42px;
  outline: none;
  font-weight: 400;
  font-size: 12pt;
  line-height: 1.21;
  color: inherit;
  background-color: ${({ theme }) => theme.colors.google};
  ${({ isError, theme }) =>
    isError ? ` outline: 1px solid ${theme.colors.required};` : ''};

  border: none;

  & option {
    color: ${({ theme }) => theme.colors.black};
    padding-top: 10px;
    background: grey;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.inputPlaceholder};
  }
`;
