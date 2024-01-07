import { Plus } from "lucide-react";
import { Button } from "./button";
import React from "react";

export interface AddButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  title: string;
}

const AddButton = React.forwardRef<HTMLButtonElement, AddButtonProps>(
  ({ title, ...props }, ref) => {
    return (
      <Button ref={ref} className="flex gap-1 rounded-full px-2 sm:rounded-md" {...props}>
        <Plus />
        <span className="hidden sm:inline">{title}</span>
      </Button>
    );
  }
);

AddButton.displayName = 'AddButton';

export default AddButton;
