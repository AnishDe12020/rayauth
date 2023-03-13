import WalletLayout from "@/components/layouts/WalletLayout";
import SignTransaction from "@/components/walletPage/SignTransaction";

const SignTransactionPage = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl p-6 mx-auto my-1 space-y-8 font-sans text-white border border-transparent rounded-lg shadow md:my-6">
      <SignTransaction />
    </div>
  );
};

SignTransactionPage.PageLayout = WalletLayout;

export default SignTransactionPage;
