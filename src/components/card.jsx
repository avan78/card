import {useEffect, useState, useRef} from "react";

export const Card = () => {
   //const fields = [0,1,2,3];
  // const [cardField, setCardField] = useState(0);//useState([0,1,2,3]);
   const [cardProps, setCardProps] = useState({fields: [0,1,2,3], actual: 0 })
   const activeRef = useRef();

    const focusHandler = (inputValue, index) => {

        if (inputValue.length === 4) {
            setCardProps({ ...cardProps, actual: cardProps.actual + 1 })

            if (cardProps.fields[index] === cardProps.actual) {
                console.log("activeRef.current", activeRef.current);
                console.log("activeRef.current", cardProps.fields.indexOf(cardProps.actual));
              //  cardProps.fields[index].current.focus();
              //   activeRef.current.focus(); // nefunkční
            }
        }};

   useEffect((index) => {
      // console.log("indexof(actual)", cardProps.fields.indexOf(cardProps.actual));
      // console.log("actual", cardProps.actual);
        if (cardProps.fields.indexOf(cardProps.actual) === cardProps.actual) {
            activeRef.current.focus();
        }
    }, [cardProps.actual]);

    const handleSubmit = () => {
      console.log("Your card number was saved.");
      setCardProps({...cardProps, actual: 0});
    };

    return(
        <>
        <div style={{display: "flex"}}>
            { cardProps.fields.map((field, index) => (
                <input type="text" id={index.toString()} key={field} onChange={(e) => {focusHandler(e.target.value, index)}} ref={activeRef}/>
                ))
            }
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </>
    );
};