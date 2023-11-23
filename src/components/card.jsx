import {useState, useRef} from "react";

export const Card = () => {
   //states
    const [cardProps, setCardProps] = useState({fields: [0,1,2,3], actual: 0, cardNumber: [] })
   //refs
   const oneRef = useRef();
   const twoRef = useRef();
   const threeRef = useRef();
   const fourRef = useRef();

   //check the length of the input, set the values in state and handle the focus
    const focusHandler = (inputValue) => {

        if (inputValue.length === 4) {
            setCardProps({ ...cardProps, actual: cardProps.actual + 1, cardNumber: [...cardProps.cardNumber, inputValue]})
           // console.log("cardProps", cardProps); //for the control

           //focus handling according to the number of actual field
            switch(cardProps.actual) {
                case 0:
                    twoRef.current.focus();
                    break;
                case 1:
                    threeRef.current.focus();
                    break;
                case 2:
                    fourRef.current.focus();
                    break;
                case 3:
                    oneRef.current.focus();
                    break;
                default:
                    oneRef.current.focus();
                    break;
            }
        }};

    //handle clicking on the submit button - cleans the state values
    const handleSubmit = () => {
      console.log("Your card number was saved.");
      setCardProps({...cardProps, actual: 0, cardNumber: []});
    //  console.log("cardProps", cardProps); //for the control
    };

    return(
        <>
        <div style={{display: "flex"}}>
            {/* cardProps.fields.map((field, index) => (
                <input type="text" id={index.toString()} key={field} onChange={(e) => {focusHandler(e.target.value, index)}} ref={activeRef}/>
                ))
            */}
             <input type="text" id={cardProps.fields[0]} onChange={(e) => {focusHandler(e.target.value, cardProps.fields[0])}} ref={oneRef}/>
             <input type="text" id={cardProps.fields[1]} onChange={(e) => {focusHandler(e.target.value, cardProps.fields[1])}} ref={twoRef}/>
             <input type="text" id={cardProps.fields[2]} onChange={(e) => {focusHandler(e.target.value, cardProps.fields[2])}} ref={threeRef}/>
             <input type="text" id={cardProps.fields[3]} onChange={(e) => {focusHandler(e.target.value, cardProps.fields[3])}} ref={fourRef}/>
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </>
    );
};