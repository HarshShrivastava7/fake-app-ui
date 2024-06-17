import React, { Component } from 'react';
import News from './News';
import Navbar from './Navbar';
import './App.css';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Text, Progress, FlexboxGrid, Input, InputGroup, Button } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const styles = {
  width: 300,
  marginBottom: 10
};

const style2 = {
  width: 120,
  display: 'inline-block',
  marginRight: 10
};

export default function Result() {
    const location = useLocation();
    const {state} = location;
  const handleChange = (e) => {
    setVal(e);
  };

  async function handleSubmit() {
    const data = { URL: val };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      const fetchResponse = await fetch('/', params);
      const data = await fetchResponse.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    console.log(val);
  }
  const [val, setVal] = React.useState('');

  async function submitFeedback(feedback) {
    const data = { feedback, URL: val };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      const fetchResponse = await fetch('/feedback', params);
      const data = await fetchResponse.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="w-full">
        <FlexboxGrid justify="center" style={{ margin: '20px' }}>
          <Text weight="semibold">Result</Text>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <div style={style2}>
            <Progress.Circle percent={( state.data.real_prob)} strokeColor="#4caf50" />
          </div>
        </FlexboxGrid>
        <FlexboxGrid justify="center" style={{ margin: '20px' }}>
          <Text weight="semibold">Give us some feedback if we predicted it wrong :)</Text>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <Button color="green" appearance="primary" onClick={submitFeedback('real')}>
            Real
          </Button>
          <Button color="red" appearance="primary" onClick={submitFeedback('fake')}>
            Fake
          </Button>
        </FlexboxGrid>
      </div>
    </>
  );
}
