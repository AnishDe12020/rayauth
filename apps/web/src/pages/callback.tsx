import { useRouter } from 'next/router';

//this should handle callback
export default function Items() {
  const { query } = useRouter();

  return (
    <div>
      <h1>Items page</h1>
      <p>{query.share}</p>
      <p>{query.name}</p>
    </div>
  );
}
