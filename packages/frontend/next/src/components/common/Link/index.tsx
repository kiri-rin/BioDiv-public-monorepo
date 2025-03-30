import { useRouter } from "next/router";

export const CommonLink = ({ href, children }) => {
  const router = useRouter();
  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={(e) => {
        e.preventDefault();
        router.push(href);
      }}
    >
      {children}
    </div>
  );
};
