import React, { Component } from 'react';
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import { Text, FlexboxGrid, IconButton, ButtonToolbar } from 'rsuite';

export default function NewsItem(props) {
  let { apiTitle, excerpt, media, published_date, url, publisher } = props;
  async function submitFeedback(feedback) {
    const data = { feedback, URL: url };
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
    <div
      style={{
        flex: '30%',
        margin: '0.2em',
        padding: '1em',
        minWidth: '219px'
      }}>
      <div>
        <div className="card col-md-12">
          <img src={media} className="card-img-top" alt="..." />
          <div className="card-body" style={{ border: '3px solid #7E7D89', marginTop: '3px' }}>
            <h5 className="card-title">{apiTitle}</h5>
            <p className="card-text">
              {excerpt == null ? '' : excerpt.length < 200 ? excerpt : excerpt.slice(0, 200)}
            </p>
            <h6 className="card-text">
              <small className="text-muted" style={{ fontSize: '1.2em' }}>
                Last Updated On {published_date.slice(0, 10)}
              </small>
            </h6>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
              Read More
            </a>
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ right: '-50px' }}>
              {publisher}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
          <Text weight="semibold" style={{ textAlign: 'center' }}>
            Give us some feedback if we predicted it wrong :)
          </Text>
          <FlexboxGrid justify="center">
            <IconButton
              circle
              color="green"
              appearance="primary"
              icon={<CheckRoundIcon />}
              onClick={() => submitFeedback('real')}
            />
            <IconButton
              circle
              color="red"
              appearance="primary"
              icon={<WarningRoundIcon />}
              onClick={() => submitFeedback('fake')}
            />
          </FlexboxGrid>
        </div>

        {/* {console.log(this.month)} */}
      </div>
    </div>
  );
}
