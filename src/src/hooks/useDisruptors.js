import { useEffect, useState } from "react";

export const useDisruptors = () => {
  const [disruptors, setDisruptors] = useState([]);

  useEffect(() => {
    // TEMP DATA (replace with API later)
    setDisruptors([
      {
        id: 1,
        name: "Sample Disruptor",
        price: 90000,
      },
    ]);
  }, []);

  return { disruptors, loading: false };
};