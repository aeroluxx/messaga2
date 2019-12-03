import React, {useRef, useReducer, useEffect, useState} from 'react';
import t from 'tcomb-form-native';
import {AppContainer, Card, Button, Space, TextLink} from '../../components';
import {structJob, options} from '../Authenticator/Form';
import {goBack, PINK} from '../../constants';
import {createJob, updateJob, deleteJob} from '../../graphql/mutations';
import {useMutation} from 'aws-amplify-react-hooks';
import {initialState, reducer} from './helper';

const Form = t.form.Form; // eslint-disable-line

const JobAdd = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = item => dispatch({type: 'SET_INPUT', item});
  const [check, setOwner] = useState(false);
  useEffect(() => {
    const obj = navigation.state.params;
    typeof obj !== 'undefined' && setOwner(true);
    dispatch({type: 'CREATE', obj});
    // FIXME
  }, [navigation.state.params]);

  const {input} = state;
  const [create, update, del, {loading, error}] = useMutation(input);
  const onCreate = () => create(createJob) && goBack(navigation)();
  const onUpdate = () => update(updateJob) && goBack(navigation)();
  const onDelete = () => del(deleteJob) && goBack(navigation)();

  const registerForm = useRef('');
  return (
    <AppContainer
      message={error}
      loading={loading}
      title="Add"
      onPress={goBack(navigation)}>
      <Card>
        <Form
          ref={registerForm}
          type={structJob}
          options={options}
          value={input}
          onChange={text => onChange(text)}
        />
        <Space height={40} />
        <Button
          title="DONE"
          onPress={() => (check ? onUpdate() : onCreate())}
        />
        <TextLink title="or" />
        <Space height={10} />
        <Button title="DELETE" color={PINK} onPress={onDelete} />
        <Space />
      </Card>
    </AppContainer>
  );
};

export {JobAdd};
