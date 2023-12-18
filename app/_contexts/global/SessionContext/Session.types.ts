export type SessionContextProps = {
  session: Session | null;
  update: (newData: Session) => void;
  setUnauthenticated: () => void;
};

export type Session = {
  username?: string;
  icon?: string;
};
