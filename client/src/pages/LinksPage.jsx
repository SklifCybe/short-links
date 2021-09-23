import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

import { ListLinks } from '../components';

export const LinksPage = () => {
  const token = useSelector(({ auth }) => auth.token);
  const [links, setLinks] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);

      const { data } = await axios.get(`/api/link`, {
        headers: { authorization: `Bearer ${token}` },
      });

      setLinks(data);
      setLoading(false);
    })();
  }, [token]);

  return <>{!loading && links && <ListLinks links={links} />}</>;
};
