import { FieldHookConfig, useField } from 'formik';
import {
  ClassAttributes,
  InputHTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { LabelStyled, InputStyled } from './InputField.styled';
import ReactTooltip from 'react-tooltip';
import { ThemeContext } from 'styled-components';
import { ThemeTitle } from 'styles/types';

interface OtherProps {
  label: string;
}

type InputFieldType = InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string> &
  OtherProps;

const InputField = ({ label, required, ...props }: InputFieldType) => {
  const [field, meta] = useField(props);
  const [id] = useState(String(Math.random() * 1000));
  const [tooltip, setShowTooltip] = useState(true);
  const theme = useContext(ThemeContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleShow = (): void => {
    setShowTooltip(true);
    ReactTooltip.show(inputRef.current as Element);
  };

  useEffect(() => {
    if (meta.touched && meta.error) {
      handleShow();
    }
  }, [meta.error, meta.touched]);

  return (
    <>
      <LabelStyled>
        {label}
        {required && meta.touched && meta.error ? (
          <span className="required">{'\u00A0'}*</span>
        ) : null}

        <InputStyled
          isError={meta.touched && Boolean(meta.error)}
          data-for={id}
          ref={inputRef}
          data-tip
          {...field}
          {...props}
        />
        {tooltip && meta.touched && meta.error ? (
          <ReactTooltip
            offset={{ left: -50, top: 0 }}
            id={id}
            type={theme.themeTitle === ThemeTitle.light ? 'dark' : 'light'}
            effect={'solid'}
            scrollHide={true}
            resizeHide={false}
          >
            {meta.error}
          </ReactTooltip>
        ) : null}
      </LabelStyled>
    </>
  );
};

export default InputField;
