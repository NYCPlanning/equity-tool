import React, { useState, useEffect } from "react";

const useToggle = (initialState) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useEffect(
    () => setIsToggled(state => !state),
    [setIsToggled],
  );

  return [isToggled, toggle];
}
