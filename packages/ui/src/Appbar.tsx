import Button from "./button";

interface AppbarProps {
  user? :{
    name?: string | null;
  },
  onSignin: any,
  onSignout : any
}

export const Appbar = ({user, onSignin, onSignout}: AppbarProps) => {
  return (
    <div className='flex justify-between border-b border-slate-400 px-4'>
      <div className="text-lg font-bold flex flex-col justify-center">PayTM Wallet</div>
      <div  className="flex flex-col justify-center pt-2">
        <Button onClick={() => user? onSignout() : onSignin()} >
          {user? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
}