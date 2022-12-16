import { createContext, useContext, useRef, useState } from "react";
import { db } from "../firebase/config";
import {
  set,
  ref,
  onValue,
  push,
  query,
  orderByChild,
  equalTo,
  update,
  limitToFirst,
} from "firebase/database";
export const Context = createContext({});
const Provider = Context.Provider;

export const StoreProvider = (props) => {
  const roomRef = useRef(null);
  const [loading, setLoading] = useState(false);
  function onPlayerSubmit(name) {
    setLoading(true)
    console.log("in player submit");
    const room = ref(db, "/room");

    const waitingRoom = query(
      room,
      orderByChild("player2"),
      equalTo(""),
      limitToFirst(1)
    );

    onValue(
      waitingRoom,
      (a) => {
        const existingRoom = a.val();
        if (existingRoom) {
          const waitingRoomId = Object.keys(existingRoom)[0];
          roomRef.current = ref(db, `/room/${waitingRoomId}`);
          update(roomRef.current, { player2: name }).then(()=>{
            setLoading(false);
          })
        } else {
          roomRef.current = push(room);
          set(roomRef.current, {
            player1: name,
            player2: "",
          })
        }
      },
      {
        onlyOnce: true,
      }
    );

    return false;
  }

  return <Provider value={{ onPlayerSubmit,loading }}>{props.children}</Provider>;
};

export const useStore = () => useContext(Context);
