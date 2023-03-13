import DemoPage from "@/components/demo";
import MainLayout from "@/components/layouts/MainLayout";

import withCommonEffects from "../components/authGuard/RouteGuard";

const Demo = () => {
  return (
    <>
      <DemoPage />
    </>
  );
};

Demo.PageLayout = MainLayout;

export default withCommonEffects(Demo, {
  isAuthRequired: true,
});
