import * as React from "react";
import { Input } from "./input";
import { Minus, Plus } from "lucide-react";
import { Button } from "./button";
import { ControllerRenderProps } from "react-hook-form";

export interface NumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    field: ControllerRenderProps<any, any>;
  };

const NumberInput = ({ field, ...props }: NumberInputProps) => {

    const handleDecrement = () => {
      const currentValue = Number(field.value);
      field.onChange(Math.max(currentValue - 1, 0).toString()); // Prevents going below 0
    };

    const handleIncrement = () => {
      const currentValue = Number(field.value);
      field.onChange((currentValue + 1).toString());
    };

    return (
      <div className="grid grid-cols-[minmax(0,60px)_minmax(0,1fr)_minmax(0,60px)] gap-1">
        <Button type="button" variant="secondary" onClick={handleDecrement}>
          <Minus />
        </Button>
        <Input
          type="number"
          {...props}
          {...field}
        />
        <Button type="button" variant="secondary" onClick={handleIncrement}>
          <Plus />
        </Button>
      </div>
    );
  };

NumberInput.displayName = "NumberInput";

export { NumberInput };
