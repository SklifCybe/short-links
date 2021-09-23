import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Preloader, LinkCard } from '../components';

export const DetailPage = () => {
  const token = useSelector(({ auth }) => auth.token);
  const [loading, setLoading] = React.useState(false);
  const [link, setLink] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      setLoading(true);

      const { data } = await axios.get(`/api/link/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      setLink(data);
      setLoading(false);
    })();
  }, [id, token]);

  if (loading) {
    return <Preloader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};
