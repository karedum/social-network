import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../Redux/UserReducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../Redux/users-selector";
import style from "./UsersSearchForm.module.css";
import {Button} from "@material-ui/core";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type FriendsFormType = 'null' | 'true' | 'false'
type FormFilterType = {
    term: string
    friend: FriendsFormType
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: FormFilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter);
        setSubmitting(false)
    }

    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendsFormType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select" className={style.field_friends}>
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <Button size="large" variant="contained" color="primary" disabled={isSubmitting} type="submit">
                        Найти
                    </Button>

                </Form>
            )}
        </Formik>
    </div>
})