import { signOut } from "@/actions/auth";
import { getCurrentUser } from "@/utils/user";
import { LogInIcon, LogOutIcon, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { MenuLink } from "../layout/menu-link";
import { Button } from "../ui/button";
import DialogLoginForm from "./dialog-login-form";

export default async function AuthButton() {
  const user = await getCurrentUser();

  return user ? (
    <form action={signOut}>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              className="flex h-10 w-10 items-center justify-center gap-3 rounded-md hover:bg-slate-100 hover:text-slate-900 @[180px]:w-full @[180px]:justify-start @[180px]:px-3 dark:hover:bg-slate-800 dark:hover:text-slate-50"
            >
              <LogOutIcon size={20} className="flex-shrink-0" />
              <p className="hidden max-w-36 overflow-hidden overflow-ellipsis @[180px]:block @[180px]:max-w-full">
                {user.email}
              </p>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12} className="">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  ) : (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <DialogLoginForm
          trigger={
            <a className="flex h-10 w-10 cursor-pointer items-center justify-center gap-3 rounded-md hover:bg-slate-100 hover:text-slate-900 @[180px]:w-full @[180px]:justify-start @[180px]:px-3 dark:hover:bg-slate-800 dark:hover:text-slate-50">
              <TooltipTrigger>
                <LogInIcon size={20} />
              </TooltipTrigger>

              <span className="hidden @[180px]:inline">Login</span>
            </a>
          }
        />
        <TooltipContent
          side="right"
          sideOffset={12}
          className="@[180px]:hidden"
        >
          <p>Login</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
