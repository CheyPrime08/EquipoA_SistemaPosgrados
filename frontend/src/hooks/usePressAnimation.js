import { useState } from "react";

export function usePressAnimation() {
  const [pulsado, setPulsado] = useState(null);

  const handlePress = (id = true) => {
    setPulsado(id);
    setTimeout(() => setPulsado(null), 400);
  };

  const isPressed = (id = true) => pulsado === id;

  return { handlePress, isPressed };
}
