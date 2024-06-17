import React, { Component } from 'react';
import './App.css';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Text, Progress, FlexboxGrid, Input, InputGroup, Button } from 'rsuite';
import NewsItem from './NewsItem';

const style2 = {
  width: 120,
  display: 'inline-block',
  marginRight: 10
};

export default function Result(props) {
  const location = useLocation();
  const { state } = location;

  async function submitFeedback(feedback) {
    const data = { feedback, URL: state.url };
    const params = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      const fetchResponse = await fetch('http://127.0.0.1:5000/feedback', params);
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
          <Text weight="semibold" style={{color: "#ffffff"}}>{state.data.result.toUpperCase()}</Text>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <div style={style2}>
            {parseInt(Number(state.data.real_prob * 100), 10) >= '50' ? (
              <Progress.Circle
                percent={parseInt(state.data.real_prob * 100, 10)}
                strokeColor="#4caf50"
              />
            ) : (
              <Progress.Circle
                percent={parseInt(Number(state.data.real_prob * 100), 10)}
                strokeColor="#f44336"
              />
            )}
          </div>
        </FlexboxGrid>
        <FlexboxGrid justify="center" style={{ margin: '20px' }}>
          <Text weight="semibold" style={{color: "#ffffff"}}>Give us some feedback if we predicted it wrong :)</Text>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <Button color="green" appearance="primary" onClick={submitFeedback('real')}>
            Real
          </Button>
          <Button color="red" appearance="primary" onClick={submitFeedback('fake')}>
            Fake
          </Button>
        </FlexboxGrid>
        <NewsItem
            apiTitle={state.data.title}
            excerpt={state.data.content}
            media={
              state.data.image
                ? state.data.image
                : 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'
            }
            published_date={state.data.date}
            url={state.data.url}
            result={"ok"}
          />
      </div>
    </>
  );
}
