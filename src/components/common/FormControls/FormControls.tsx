import style from "./FormControls.module.css";
import React from 'react';
import {Redirect} from "react-router-dom";
import {FieldValidatorType, required} from "../../../utils/validators/validators";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

// export const Textarea = ({input, meta, ...props}) => {
//     const hasError = meta.error && meta.touched;
//     return (
//         <div className={hasError && style.formControl + " " + style.error}>
//         <div><textarea {...input} {...props}/></div>
//             {hasError && <span>{meta.error}</span>}
//     </div>
//     )
// }
//
// export const input = ({input, meta, ...props}) => {
//     const hasError = meta.error && meta.touched;
//     return (
//         <div className={hasError && style.formControl + " " + style.error}>
//             <div><input {...input} {...props}/></div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }

export const ElementInput = (Element: React.FC | string):React.FC<WrappedFieldProps> => ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={style.formControl + " " + (hasError ? style.error : "")}>
            <Element {...input} {...props} />
            {hasError && <span> {error} </span>}
        </div>
    );
};

export const ElementCheckbox = (Element: React.FC | string):React.FC<WrappedFieldProps> => ({input, meta: {touched, error}, ...props}) => {
    return (<div>
            <Element {...input} {...props} />
        </div>
    );
};

export function createField<FormKeysType extends string>(placeholder: string | null,
                            name: FormKeysType,
                            component: React.FC<WrappedFieldProps> | 'input' | 'textarea',
                            validators: Array<FieldValidatorType>,
                            props = {},
                            text = '')
{
    return (
        <div>
            <Field placeholder={placeholder} name={name} component={component} validate={validators} {...props}/>{text}
        </div>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string>