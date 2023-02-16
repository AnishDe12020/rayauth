import { NextPage } from 'next';
import { useRouter } from 'next/router';

const CallbackPage: NextPage = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Items page</h1>
      <p>{query.share}</p>
      <p>{query.name}</p>
    </div>
  );
};

export default CallbackPage;
