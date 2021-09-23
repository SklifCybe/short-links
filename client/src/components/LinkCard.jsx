import React from 'react';

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>
        From:{' '}
        <a href={link.from} target="_blank" rel="noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        To:{' '}
        <a href={link.to} target="_blank" rel="noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Click: <b>{link.clicks}</b>
      </p>
      <p>Date of create: {new Date(link.date).toLocaleDateString()}</p>
    </>
  );
};
