import { useState, useEffect } from "react";

interface MapConfig {
  map: any,
  projections: any,
  tools: any,
  version: string
};

export default function useMapConfig(mapName: string) {
  const [state, setState] = useState({error: false as boolean | {}, loading: false as boolean, data: {} as MapConfig | null});

  useEffect(() => {
    const fetchParameters = async () => {
      setState({...state, loading: true, error: false});
      try {
        const mapconfig = await fetch("http://localhost:3002/api/v1/config/"+mapName);
        const data = await mapconfig.json();
        setState({...state, loading: false, data: data})
      } catch (error: any) {
        if (error) {
          console.log('error: ', error);  
          setState({error: error.message, loading: false, data: null})
        }  
      }
    };

    fetchParameters();
  }, [mapName]);

  return state;
}
