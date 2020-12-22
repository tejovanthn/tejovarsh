import React from 'react';
import { Loading } from 'types';

interface Width extends Loading {
  width: number;
}

const initialState: Width = {
  width: 0,
  loading: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        loading: false,
        width: action.ref.current.clientWidth
      };
    default:
      return { ...state };
  }
};

export const useWidth = (ref?: React.MutableRefObject<HTMLDivElement>): Width => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({ type: 'load', ref });
  }, [ref]);
  return state;
};
