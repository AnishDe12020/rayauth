import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";
import { idbConfig } from "lib/indexeddbConfig";
import { useCookies } from "react-cookie";
import useAuth from "hooks/useAuth";

const CallbackPage: NextPage = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { query } = useRouter();
  const { add, getByID } = useIndexedDBStore("keyshare");
  // const [cookies] = useCookies(['jwt-rayauth']);

  const { handleCallback } = useAuth();

  useEffect(() => {
    // console.log('cookie: ', cookies['jwt-rayauth']);
    // async function setUpKey() {
    //   if (await getByID(1)) {
    //     return;
    //   }
    //   setupIndexedDB(idbConfig)
    //     .then(() => console.log('success'))
    //     .catch(e => console.error('error / unsupported', e));
    //   add({ key: query.share }).then(console.log);
    // }
    // setUpKey();
    // setLoading(false);
    // setData(query);

    handleCallback();
  }, []);

  return (
    <div>
      <h1>{loading ? "loading" : "done"}</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default CallbackPage;
