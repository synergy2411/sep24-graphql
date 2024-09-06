import { Outlet } from "react-router-dom";
import MainNavigation from "../../Components/MainNavigation";

function RootLayoutPage() {
  return (
    <>
      <MainNavigation />
      <h1>The Blog App</h1>
      <Outlet />
    </>
  );
}

export default RootLayoutPage;
