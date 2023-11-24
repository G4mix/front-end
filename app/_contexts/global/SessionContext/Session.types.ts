export type SessionContextProps = {
  session: Session | null;
  status: "unauthenticated" | "authenticated" | "loading";
  update: () => void;
  setUnauthenticated: () => void;
};

export type Session = {
  accessToken: string | null;
  username: string | null;
  email: string | null;
  icon: string | null;
};
