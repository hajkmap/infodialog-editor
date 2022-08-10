import * as React from "react";
import { Box } from "@mui/system";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { amountAdded, incremented } from "../../features/counter/counter-slice";
import { useFetchBreedsQuery } from "../../features/dogs/dogs-api-slice";
import {
  Button,
  Divider,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const DemoView = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const [numDogs, setNumDogs] = React.useState(10);
  const { data: dogsData = [], isFetching } = useFetchBreedsQuery(numDogs);

  const handleClick = () => {
    dispatch(incremented());
    // dispatch(amountAdded(5));
  };

  const handleClick5 = () => {
    dispatch(amountAdded(5));
  };
  return (
    <>
      {isFetching && <LinearProgress />}
      <Typography>Current count: {count}</Typography>
      <Button onClick={handleClick}>+1</Button>
      <Button onClick={handleClick5}>+5</Button>

      <Divider />

      <Select
        value={numDogs}
        onChange={(e) => setNumDogs(Number(e.target.value))}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>

      <div>Number of dogs fetched: {dogsData.length}</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {dogsData.map((breed) => (
            <tr key={breed.id}>
              <td>{breed.name}</td>
              <td>
                <img src={breed.image.url} alt={breed.name} height={250} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DemoView;
