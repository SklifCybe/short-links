import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const CreatePage = () => {
  const [link, setLink] = React.useState('');
  const history = useHistory();
  const { token } = useSelector(({ auth }) => auth);

  const linkEnterHandler = async (event) => {
    if (event.code === 'Enter') {
      try {
        const { data } = await axios.post(
          '/api/link/generate',
          { from: link },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        history.push(`/detail/${data.link._id}`);
      } catch (err) {
        console.error(err);
      }
    }
    return;
  };

  const linkChangeHandler = (event) => {
    setLink(event.target.value);
  };

  return (
    <div className="row">
      <div className="col s10 offset-s1" style={{ marginTop: '1rem' }}>
        <div className="input-field">
          <input
            id="link"
            type="text"
            value={link}
            onKeyPress={linkEnterHandler}
            onChange={linkChangeHandler}
          />
          <label htmlFor="link">Link</label>
        </div>
      </div>
    </div>
  );
};
