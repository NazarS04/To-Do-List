import {MutableRefObject, useEffect} from "react";
import {TSetState} from "../types/TSetState";

type TUnitedTypes = string | number | boolean | object;

export function useLocalStorage<T extends TUnitedTypes>(key: string, setState: TSetState<T>, state: MutableRefObject<T>) {
  useEffect(() => {
    const str: string | null = localStorage.getItem(key);

    if (str && str !== "[]") {
      setState(JSON.parse(str));
    }

    window.addEventListener("beforeunload", function (e) {
      localStorage.setItem(key, JSON.stringify(state.current));
    })
  }, [])
}