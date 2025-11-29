import { ChatScreen } from "@/components/Chat/";
import { Suspense } from "react";
import { SpinnerLoading } from "@/components/SpinnerLoading";

export default function ChatPage() {
  return (
    <Suspense fallback={<SpinnerLoading isPrimary />}>
      <ChatScreen />
    </Suspense>
  );
}
