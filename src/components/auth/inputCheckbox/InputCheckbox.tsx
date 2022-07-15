import { FieldHookConfig, useField } from 'formik';
import { ClassAttributes, InputHTMLAttributes } from 'react';
import { LabelStyled } from './InputCheckbox.styled';
import { BsCheck2 } from 'react-icons/bs';

interface OtherProps {
  children: React.ReactNode;
}

type InputFieldType = InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string> &
  OtherProps;

const InputCheckbox = ({ children, required, ...props }: InputFieldType) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <>
      <LabelStyled isError={meta.touched && Boolean(meta.error)}>
        <input type={'checkbox'} className="isHidden" {...field} {...props} />
        <div className="checkbox">
          <BsCheck2 size={20} />
        </div>
        {children}
      </LabelStyled>
    </>
  );
};

export default InputCheckbox;
