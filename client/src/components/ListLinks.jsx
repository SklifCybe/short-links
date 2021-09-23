import React from 'react';
import { Link } from 'react-router-dom';

export const ListLinks = ({ links }) => {
  if (!links) {
    return <h5 style={{ display: 'flex', justifyContent: 'center' }}>No links</h5>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Original</th>
          <th>Short</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, id) => (
          <tr key={link._id}>
            <td>{id}</td>
            <td>
              <a href={link.from} target="_blank" rel="noreferrer">
                {link.from}
              </a>
            </td>
            <td>
              <a href={link.to} target="_blank" rel="noreferrer">
                {link.to}
              </a>
            </td>
            <td>
              <Link to={`/detail/${link._id}`}>Open</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
