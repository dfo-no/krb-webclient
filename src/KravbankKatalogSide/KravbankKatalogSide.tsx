import React,  { ReactElement, useEffect, useState } from "react";
import styles from './KravbankKatalogSide.module.scss'
import { Link, useHistory } from 'react-router-dom';
import data from '../data/katalog.json';
import { Katalog } from "../models/Katalog";
import { DragDropContext, Draggable, Droppable,  } from 'react-beautiful-dnd';
import { Kravbank } from "../models/Kravbank"; 

const renderKatalogItems = (katalogItems: Kravbank[]) => {
  return (
    katalogItems.map((kravbank, index) => 
      <Draggable
        key={kravbank.id}
        draggableId={kravbank.id}
        index={index}
      >
        {(provided) => (
          <div
            className={styles.katalogitem}
            key={kravbank.id}
            ref={provided.innerRef} 
            {...provided.draggableProps} 
            {...provided.dragHandleProps}
          >
            <p>{kravbank.tittel}</p>
            <Link to={"/edit/" + kravbank.id}>
              <button className={styles.editbutton} type="button">Rediger</button>
            </Link>
           </div>
        )} 
      </Draggable>
    )
  )
}


export default function KravbankKatalogSide (this: any): ReactElement {
    const [katalog, setKatalog] = useState<Katalog>({});
    const defaultkatalogitem = [{
      "id":"",
      "tittel": "",
      "beskrivelse": "",

    }]
    const [katalogitems, setKatalogItems] = useState<Kravbank[]>(defaultkatalogitem);

    const history = useHistory();
    const handleCreateNew = () => (event: any) => {
      history.push(`/kravbank/ny`);
    };
    const fetchKatalog=()=> {
      setKatalog(data as Katalog);
    }

    useEffect(()=>{
      if(Object.values(katalog).length === 0)
        fetchKatalog();
    })

    useEffect(() => {
      setKatalogItems(Object.values(katalog))
    }, [katalog])
   
    const handleOnDragEnd = (result:any) => {
      if (!result.destination) return;
      const items = katalogitems;
      console.log(items);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setKatalogItems(items);
    };
    
    return (
      <div className={styles.container}>
        <button className={styles.newkatalogbutton} type="button" onClick={handleCreateNew()}>Opprett Kravbank</button>
        <div className={styles.katalogcontainer}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="katalogitems">
          {(provided) => (
           <ul className="katalogitems" {...provided.droppableProps} ref={provided.innerRef}>
              {renderKatalogItems(katalogitems)}
              {provided.placeholder}
            </ul>
          
          )}
          </Droppable>
        </DragDropContext>
    
        </div>
      </div>
    );
}