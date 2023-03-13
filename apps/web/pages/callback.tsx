import { NextPage } from "next";
import { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";

import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import MainLayout from "@/components/layouts/MainLayout";
import Spinner from "@/components/common/Spinner";
import FormGroup from "@/components/common/FormGroup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/common/Button";
import { BACKEND_URL } from "@/lib/constants";

const RecoveryKeySchema = yup.object().shape({
  key: yup.string().required("Recovery key is required"),
});

const CallbackPage: NextPage = () => {
  const { handleCallback, needsRecovery, loading, jwt, handleNewDeviceShare } =
    useAuth();

  const [recovering, setRecovering] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    handleCallback(router);
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RecoveryKeySchema) });

  const handleRecovery = handleSubmit(async (data) => {
    setRecovering(true);
    const {
      data: { key },
    } = await axios.post(
      `${BACKEND_URL}/user/device-share`,
      {
        key: data.key,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    handleNewDeviceShare(key, router);

    setRecovering(false);
  });

  return (
    <MainLayout>
      <div className="flex flex-col items-center mt-16">
        {loading ? (
          <Spinner />
        ) : needsRecovery ? (
          <>
            <form
              className="flex flex-col items-center space-y-4"
              onSubmit={handleRecovery}
            >
              <FormGroup
                register={register}
                errors={errors}
                name="key"
                label="Recovery key"
                placeholder="12341234jkl1234j1234...."
                textarea
              />
              <Button processing={recovering} type="submit">
                Recover Wallet
              </Button>
            </form>
          </>
        ) : (
          <p>Redirecting...</p>
        )}
      </div>
    </MainLayout>
  );
};

export default CallbackPage;
