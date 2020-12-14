import React,  { ReactElement, useEffect, useState } from "react";
import styles from './KravbankKatalogSide.module.scss'
import { Link, useHistory } from 'react-router-dom';
import { Kravbank } from "../models/Kravbank";
import data from '../data/kravbank1.json';

export default function KravbankKatalogSide (this: any): ReactElement {
    const [katalog, setKatalog] = useState<Kravbank[]>([]);
    const katalogitems = katalog.map((kravbank) =>
      <div className= {styles.katalogitem} key={kravbank.id}>
        <p>{kravbank.navn}</p>
        <Link to={"/edit/" + kravbank.id}>
          <button className={styles.editbutton} type="button">Rediger</button>
        </Link>
      </div>
    )

    const history = useHistory();
    const handleCreateNew = () => (event: any) => {
      history.push(`/kravbank/ny`);
    };
    const fetchKatalog=()=> {
      const newKravbank: Kravbank = {
        navn: data.navn,
        id: data.id
      }
      setKatalog([newKravbank]);
        
    }
    useEffect(()=>{
      if(katalog.length === 0)
        fetchKatalog();
    })
   
    return (
      <div className={styles.container}>
        <button className={styles.newkatalogbutton} type="button" onClick={handleCreateNew()}>Opprett Kravbank</button>
        <div className={styles.katalogcontainer}>
          {katalogitems}
        </div>
      </div>
    );
}