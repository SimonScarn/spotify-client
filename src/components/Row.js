import { Wrapper, Section, Row, ContentGrid } from "../styles/Global.styled.js";
import SearchResult from "./SearchResult";
import ItemRow from "./ItemRow";
import {motion} from 'framer-motion'
import { useEffect, useRef, useState } from "react";



function RowItems({items, view, double}) {
    const [pointerEvent, setPointerEvent] = useState(true);
    const [width, setWidth] = useState(0);
    const carousel = useRef();

    useEffect(() => {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, [])


  return (
    <Row as={motion.div} double={double} ref={carousel} whileTap={{cursor: 'grabbing'}}>
    <motion.div drag="x" dragConstraints={{right: 0, left: -width}} style={{display: "flex"}} onDragStart={() => setPointerEvent(false)} onDragEnd={() => setPointerEvent(true)}>
      {items?.map((item) => {
          if (double) {
              return  <ItemRow key={item.id} item={item} as={motion.div} events={pointerEvent}/>
          }
          return  <SearchResult key={item.id} item={item} view={view} as={motion.div} events={pointerEvent}/>
       
      })}
    </motion.div>
  </Row>
  )
}

export default RowItems