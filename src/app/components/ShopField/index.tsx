import { InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { Controller, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface Cyper8InputFieldProps {
  placeholder?: string;
  name: any;
  form: any;
  type?: string;
  errorText?: boolean;
  onGetText?: (data) => void;
  isMultiline?: boolean;
  dataDefault?: any;
  disable?: boolean;
  value?: any;
  displayErrorText?: boolean;
  min?: number;
  id?: string;
  accept?: string;
}

export function ShopField(props: Cyper8InputFieldProps) {
  const { control } = props.form;
  const {
    formState: { errors },
  } = props.form;
  const hasError = errors[props.name];

  return (
    <>
      <Controller
        name={props.name}
        control={control}
        defaultValue={props.dataDefault}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            onChange={e => {
              field.onChange(e.target.value);
              if (props.onGetText) {
                props.onGetText(e);
              }
            }}
            sx={{
              '.MuiFormHelperText-root.Mui-error': {
                animation: 'example 0.4s ease',

                '@keyframes example': {
                  from: { transform: 'translateY(-8px)' },
                  to: { transform: 'translateY(0)' },
                },
              },
              width: '100%',
              '>div': {
                bgcolor: 'white',
              },
            }}
            onFocus={e => e.target.select()}
            autoComplete="off"
            error={Boolean(error?.message)}
            helperText={props.errorText ? hasError?.message : ''}
            placeholder={props.placeholder}
            variant="outlined"
            disabled={props.disable ? props.disable : false}
            type={props.type}
            multiline={props.isMultiline ? true : false}
            rows={props.isMultiline ? 3 : 0}
            value={props.value === 0 ? '' : props.value}
            id={props.id}
            inputProps={{ accept: props.accept }}
          />
        )}
      />
    </>
  );
}
