import {useState, useRef} from "react";

export const Card = () => {
   //states
    const [cardProps, setCardProps] = useState({fields: ["", "", "", ""], actual: 0 });
    // const [checkActive, setCheckActive] = useState(false);
   //refs
   const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
];

   //check the length of the input, set the values in state and handle the focus
 
   const focusHandler = (inputValue, key, fieldIndex) => {    

        // focus na predchozi
        // if (inputValue.length === 0 && key === "Backspace" && fieldIndex !== 0) {
        //     console.log("prev");
            // setCheckActive(true);
            // setCardProps({...cardProps, actual: field});
           // console.log("field", field);
        // }

        // focus na dalsi
        if (inputValue.length === 4 && fieldIndex !== 3) {            
            inputRefs[fieldIndex + 1].current.focus();            
        }

        setCardProps((prevCardProps) => { 
            const newFields = prevCardProps.fields.map((item, index) => {
                if (index === fieldIndex) {
                    return inputValue;
                }
                return item;
            })
            return { ...prevCardProps, fields: newFields }                   
        });
    };

    const handleKeyDown = (e, fieldIndex) => {
        if (e.key === "Backspace" && e.target.value.length === 0 && fieldIndex > 0) {
            inputRefs[fieldIndex - 1].current.focus();
        }
    };

    //handle clicking on the submit button - cleans the state values
    const handleSubmit = () => {
      console.log("Your card number was saved.");
      setCardProps({...cardProps, actual: 0, cardNumber: []});
      console.log("cardProps", cardProps); //for the control
    };

    return(
        <>
        <div style={{display: "flex"}}>             
             <input type="text" maxLength={4} id={cardProps.fields[0]} value={cardProps.fields[0]} onKeyDown={(e) => handleKeyDown(e, 0)} onChange={(e) => {focusHandler(e.target.value, e.key, 0)}} ref={inputRefs[0]}/>
             <input type="text" maxLength={4} id={cardProps.fields[1]} value={cardProps.fields[1]} onKeyDown={(e) => handleKeyDown(e, 1)} onChange={(e) => {focusHandler(e.target.value, e.key, 1)}} ref={inputRefs[1]}/>
             <input type="text" maxLength={4} id={cardProps.fields[2]} value={cardProps.fields[2]} onKeyDown={(e) => handleKeyDown(e, 2)} onChange={(e) => {focusHandler(e.target.value, e.key, 2)}} ref={inputRefs[2]}/>
             <input type="text" maxLength={4} id={cardProps.fields[3]} value={cardProps.fields[3]} onKeyDown={(e) => handleKeyDown(e, 3)} onChange={(e) => {focusHandler(e.target.value, e.key, 3)}} ref={inputRefs[3]}/>
             
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </>
    );
};