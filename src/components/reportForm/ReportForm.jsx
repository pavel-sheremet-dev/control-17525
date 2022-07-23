import React, { useState, useEffect } from 'react';
import { Formik, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { StyledForm } from './ReportForm.styled';

import InputField from 'components/forms/inputField/InputField';
import CustomSelect from 'components/forms/selectField/SelectField';

// import { IOption } from 'components/forms/selectField/SelectField';

const getValueFromLocalStorage = key => localStorage.getItem(key) ?? '';

const getInitialMonth = () => {
  const currentDate = new Date(Date.now());
  if (currentDate.getDate() <= 25) {
    currentDate.setMonth(currentDate.getMonth() - 1);
  }
  return currentDate.getMonth();
};

const getMonthSelectOptions = (nthOfLastMonth = 3) => {
  const actualReportMonth = getInitialMonth();
  const date = new Date(new Date().getFullYear(), actualReportMonth, 1);

  const array = [];
  for (let i = 0; i < nthOfLastMonth; i += 1) {
    date.setMonth(date.getMonth() - (i ? 1 : 0));

    const option = {
      value: date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      label: date.toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    };

    array.push(option);
  }

  // 'uk-UA'
  // 'en-US'
  // 'ru-RU'

  return array;
};

const options = getMonthSelectOptions();

const optionsGroup = [
  { value: '1', label: 'Group 1' },
  { value: '2', label: 'Group 2' },
  { value: '3', label: 'Group 3' },
  { value: '4', label: 'Group 4' },
  { value: '5', label: 'Group 5' },
  { value: '6', label: 'Group 6' },
];

const optionsName = [
  { value: 'id-0', label: 'Andrey' },
  { value: 'id-1', label: 'Sasha' },
  { value: 'id-2', label: 'Masha' },
  { value: 'id-3', label: 'Gosha' },
  { value: 'id-4', label: 'Lyosha' },
  { value: 'id-5', label: 'Dosya' },
];

const getOptionsProperties = (options, property) =>
  options.map(option => option[property]);

const monthValues = getOptionsProperties(options, 'value');

const groupsValues = getOptionsProperties(optionsGroup, 'value');

const namesValues = getOptionsProperties(optionsName, 'value');

const getInitialValues = () =>
  JSON.parse(sessionStorage.getItem('report-form')) ?? {
    month: '',
    group: getValueFromLocalStorage('group'),
    name: getValueFromLocalStorage('name'),
    hours: '',
    onlyMinutes: false,
    publication: '',
    videoShows: '',
    returnVisits: '',
    studying: '',
    notes: '',
  };

const FormState = () => {
  const { values } = useFormikContext();

  useEffect(() => {
    sessionStorage.setItem('report-form', JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    localStorage.setItem('name', values.name);
    localStorage.setItem('group', values.group);
  }, [values.group, values.name]);

  return null;
};

const CheckBoxField = ({ children, handleChange, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  useEffect(() => {
    if (field.name === 'onlyMinutes') {
      handleChange(field.checked);
    }
  }, [field.checked, field.name, handleChange]);

  return (
    <>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// And now we can use these
const ReportForm = () => {
  const [onlyMinutes, setOnlyMinutes] = useState(false);
  const [initialValues, setInitialValues] = useState(() => getInitialValues());

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        month: Yup.string()
          .oneOf(monthValues, 'Invalid Month')
          .required('Required'),

        group: Yup.string()
          .oneOf(groupsValues, 'Invalid group')
          .required('Required'),

        name: Yup.string()
          .oneOf(namesValues, 'Invalid name')
          .required('Required'),

        hours: Yup.number()
          .integer('Полное кол-во часов')
          .min(0)
          .max(100, 'Проверь часы')
          .required('Required'),

        onlyMinutes: Yup.boolean().required('Required'),

        publication: Yup.number()
          .integer('Должно быть целое число')
          .min(0)
          .required('Required'),

        videoShows: Yup.number()
          .integer('Должно быть целое число')
          .min(0)
          .required('Required'),

        returnVisits: Yup.number()
          .integer('Должно быть целое число')
          .min(0)
          .required('Required'),

        studying: Yup.number()
          .integer('Должно быть целое число')
          .min(0)
          .required('Required'),

        notes: Yup.string().max(120, 'Must be 120 characters or less'),
      })}
      onSubmit={(values, obj) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        obj.setSubmitting(false);
        sessionStorage.setItem('report-form', null);
        setInitialValues(getInitialValues());
        obj.resetForm();
      }}
      enableReinitialize
    >
      {({ setFieldValue }) => (
        <StyledForm>
          <CustomSelect
            name={'month'}
            label={'Month'}
            placeholder={'выберите месяц'}
            options={options}
            onChange={option => setFieldValue('month', option.value)}
            required
          />

          <CustomSelect
            name={'group'}
            label={'Group'}
            placeholder={'Выберите группу'}
            options={optionsGroup}
            onChange={option => setFieldValue('group', option.value)}
            required
          />

          <CustomSelect
            name={'name'}
            label={'Name'}
            placeholder={'Select name'}
            options={optionsName}
            onChange={option => setFieldValue('name', option.value)}
            required
          />

          <InputField
            label="Hours"
            name="hours"
            type="number"
            placeholder="Hours"
            required
          />
          <div>{onlyMinutes ? 'Минут' : 'Часов'}</div>
          <CheckBoxField name="onlyMinutes" handleChange={setOnlyMinutes}>
            Передать отчёт в минутах
          </CheckBoxField>

          <InputField
            label="Publication"
            name="publication"
            type="number"
            placeholder="Publication"
          />

          <InputField
            label="Video shows"
            name="videoShows"
            type="number"
            placeholder="Video shows"
          />

          <InputField
            label="Return visits"
            name="returnVisits"
            type="number"
            placeholder="Return visits"
          />

          <InputField
            label="Bible studying"
            name="studying"
            type="number"
            placeholder="Bible studying"
          />

          <InputField
            label="Notes"
            name="notes"
            type="textarea"
            placeholder="left your notes"
          />

          <button type="submit">Submit</button>
          <FormState />
        </StyledForm>
      )}
    </Formik>
  );
};

export default ReportForm;
