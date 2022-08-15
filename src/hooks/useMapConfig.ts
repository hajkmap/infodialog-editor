import { useState, useEffect } from "react";
import { MapConfig } from "../types/types";

export default function useMapConfig(mapName: string) {
  const [state, setState] = useState({
    error: false as boolean | {},
    loading: false as boolean,
    data: {} as MapConfig | null,
  });
  console.warn("Obsolete code, this message shouldn't show!");

  useEffect(() => {
    const fetchParameters = async () => {
      // Don't fetch anything unless we have value
      if (!mapName || mapName.trim().length === 0) return;

      // Set initial loading state
      setState({ ...state, loading: true, error: false });

      try {
        const mapconfig = await fetch(
          "http://localhost:3002/api/v1/config/" + mapName
        );
        const data = await mapconfig.json();

        // Reset state
        setState({ ...state, loading: false, data: data });
      } catch (error: any) {
        if (error) {
          console.log("error: ", error);

          // Ensure to reset state
          setState({ error: error.message, loading: false, data: null });
        }
      }
    };

    fetchParameters();
  }, [mapName]);

  return state;
}
