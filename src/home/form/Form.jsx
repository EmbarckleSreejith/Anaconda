import React, { useState } from "react";
import { useStore } from "../../store/Store";
import "./styles.scss";



export const Form = () => {
  const [name, setName] = useState("");
  const {onPlayerSubmit,loading} = useStore();
  const handleSubmit = () => {
   if(name !== ''){
    onPlayerSubmit(name)
   }
  };

  console.log(loading);
  return (
    <div className="form">
      <div className="form-card">
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>{loading ? 'Loading...' :'Submit'}</button>
      </div>
    </div>
  );
};
