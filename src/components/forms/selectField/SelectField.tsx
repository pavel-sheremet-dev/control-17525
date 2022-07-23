import { FieldHookConfig, useField } from 'formik';
import { useContext } from 'react';

import Select from 'react-select';

import { ThemeContext } from 'styled-components';
import { SelectWrapper } from './SelectField.styled';
import { getCustomStyles, getSelectTheme } from './styles';

interface IObjectOption {
  label: string;
  value: string;
}

export type IOption = string | IObjectOption;

interface IProps {
  name: string;
  label: string;
  placeholder?: string;
  onChange: (option: unknown) => void;
  options: IOption[];
  className: string;
  required?: boolean;
}

const CustomSelect = ({
  required,
  name,
  label,
  placeholder,
  onChange,
  options,
  className,
}: IProps & FieldHookConfig<string>) => {
  const [field, meta] = useField({ name });
  const theme = useContext(ThemeContext);

  const customStyles = getCustomStyles(theme);

  const defVal = (options: IOption[]): IOption => {
    const option = options.find(option => {
      if (typeof option === 'string') {
        return option === field.value;
      } else {
        return option.value === field.value;
      }
    });
    return option ? option : '';
  };

  return (
    <SelectWrapper
      className={className}
      isError={meta.touched && Boolean(meta.error)}
    >
      <span className="label">
        {label}
        {required && meta.touched && meta.error ? (
          <span className="required">{'\u00A0'}*</span>
        ) : null}
      </span>

      <Select
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        isSearchable={false}
        value={defVal(options)}
        className="wrapper"
        styles={customStyles}
        theme={selectTheme => getSelectTheme(selectTheme, theme)}
      />
    </SelectWrapper>
  );
};

export default CustomSelect;

// export const InputStyled = styled.input<ISelectProps>`
//   display: block;
//   margin-top: 8px;
//   margin-bottom: 3px;
//   padding: 5px 8px;
//   width: 100%;
//   height: 42px;
//   outline: none;
//   font-weight: 400;
//   font-size: 12pt;
//   line-height: 1.21;
//   color: inherit;
//   background-color: ${({ theme }) => theme.colors.google};
//   ${({ isError, theme }) =>
//     isError ? ` outline: 1px solid ${theme.colors.required};` : ''};

//   border: none;

//   &::placeholder {
//     color: ${({ theme }) => theme.colors.inputPlaceholder};
//   }

//   &[type='password'] {
//     font-family: Verdana;
//     letter-spacing: 0.125em;
//   }

//   &[type='password']::placeholder {
//     font-family: initial;
//     letter-spacing: initial;
//   }

//   &[type='number']::-webkit-outer-spin-button,
//   &[type='number']::-webkit-inner-spin-button {
//     -webkit-appearance: none;
//     margin: 0;
//   }

//   &[type='number'] {
//     -moz-appearance: textfield;
//   }
// `;
