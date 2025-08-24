import { useAppDispatch, type RootState, useAppSelector } from "@/app/store/index";
import { decrement, increment } from "./testSlice";
import { Button } from "semantic-ui-react";

export default function Scratch() {
    const dispatch = useAppDispatch();
    const {value} = useAppSelector((state: RootState) => state.test);

  return (
    <div>
        <h1>Scratch Page</h1>
        <h3>Current Value: {value}</h3>
        <Button onClick={() => dispatch(increment())} content="Increment" color="green" />
        <Button onClick={() => dispatch(decrement())} content="Decrement" color="red" />
    </div>
  )
}