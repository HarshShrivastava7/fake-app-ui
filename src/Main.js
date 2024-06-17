import React, { Component } from 'react';
import News from './News';
import Navbar from './Navbar';
import './App.css';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function Main(props, {navigation}) {
  const navigate = useNavigate();

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
      const fetchResponse = await fetch('http://127.0.0.1:5000/', params);
      const data = await fetchResponse.json();
      console.log(data);
      navigation.navigate('/result', {
        state: {
            data: data
        }
      });
    //   navigate('/result');
    } catch (error) {
    //   navigate('/result');
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
        <h1 className="text-3xl text-center font-bold mb-8">Check if news is real or fake!</h1>

        <FlexboxGrid justify="center">
          <InputGroup style={styles}>
            <Input value={val} onChange={handleChange} />
            <InputGroup.Button onClick={handleSubmit}>
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
        </FlexboxGrid>
        <News key={props.genre} genre={props.genre} />
      </div>
    </>
  );
}
