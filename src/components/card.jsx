import {useState, useRef} from "react";

export const Card = () => {
   //states
    const [cardProps, setCardProps] = useState({fields: ["", "", "", ""] });
   //refs
   const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
];

   //check the length of the input, set the values in state and handle the focus on the next field
   const stepForward = (cardNumber, fieldIndex) => {
        // focus on the next field
        if (cardNumber.length === 4 && fieldIndex !== 3) {
            inputRefs[fieldIndex + 1].current.focus();            
        }
        //save the new card number in focused field
        setCardProps((prevCardProps) => { 
            const newFields = prevCardProps.fields.map((item, index) => {
                if (index === fieldIndex) {
                    return cardNumber;
                }
                return item;
            })
            return { ...prevCardProps, fields: newFields }                   
        });
    };

        //if you erase the numbers, it focused you to the previous field
    const stepBack = (e, fieldIndex) => {
        if (e.key === "Backspace" && e.target.value.length === 0 && fieldIndex > 0) {
            inputRefs[fieldIndex - 1].current.focus();
        }
    };

    //handle clicking on the submit button - cleans the state values
    const handleSubmit = () => {
      console.log("Your card number was saved.");
      setCardProps({...cardProps, fields: ["", "", "", ""]});
      console.log("cardProps", cardProps); //for the control
    };

    return(
        <>
        <div style={{display: "flex"}}>
             <input type="text" id={cardProps.fields[0]} onKeyDown={(e) => stepBack(e, 0)} onChange={(e) => {stepForward(e.target.value, 0)}} value={cardProps.fields[0]} maxLength={4} ref={inputRefs[0]}/>
             <input type="text" id={cardProps.fields[1]} onKeyDown={(e) => stepBack(e, 1)} onChange={(e) => {stepForward(e.target.value, 1)}} value={cardProps.fields[0]} maxLength={4} ref={inputRefs[1]}/>
             <input type="text" id={cardProps.fields[2]} onKeyDown={(e) => stepBack(e, 2)} onChange={(e) => {stepForward(e.target.value, 2)}} value={cardProps.fields[0]} maxLength={4} ref={inputRefs[2]}/>
             <input type="text" id={cardProps.fields[3]} onKeyDown={(e) => stepBack(e, 3)} onChange={(e) => {stepForward(e.target.value, 3)}} value={cardProps.fields[0]} maxLength={4} ref={inputRefs[3]}/>
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </>
    );
};