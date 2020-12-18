import React, { ReactElement, useEffect, useState } from 'react';
import styles from './KravbankKatalogSide.module.scss';
import { useHistory } from 'react-router-dom';
import data from '../data/katalog.json';
import { Katalog } from '../models/Katalog';
import { Kravbank } from '../models/Kravbank';
import SearchBar from '../SearchBar/SearchBar';

export default function KravbankKatalogSide(this: any): ReactElement {
  const [katalog, setKatalog] = useState<Katalog>({});
  const [loading, setLoading] = useState<boolean>(true);
  const defaultkatalogitem = [
    {
      id: 'default',
      tittel: '',
      beskrivelse: ''
    }
  ];
  const [katalogitems, setKatalogItems] = useState<Kravbank[]>(
    defaultkatalogitem
  );

  const history = useHistory();
  const handleCreateNew = () => (event: any) => {
    history.push(`/kravbank/ny`);
  };
  const fetchKatalog = () => {
    setKatalog(data as Katalog);
    setLoading(false);
  };

  useEffect(() => {
    if (Object.values(katalog).length === 0) {
      fetchKatalog();
    }
  });

  useEffect(() => {
    setKatalogItems(Object.values(katalog));
  }, [katalog]);

  return (
    <div className={styles.container}>
      <button
        className={styles.newkatalogbutton}
        type="button"
        onClick={handleCreateNew()}
      >
        Opprett Kravbank
      </button>
      <div className={styles.katalogcontainer}></div>
      {SearchBar(katalogitems)}
    </div>
  );
}
