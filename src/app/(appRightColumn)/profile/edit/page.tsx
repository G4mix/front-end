"use client";

import { useAuth } from "@/hooks/useAuth";
import { ProfileEdit } from "@/components/Profile/components/ProfileEdit";
import { SpinnerLoading } from "@/components/SpinnerLoading";

export default function ProfileEditPage() {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return <SpinnerLoading isPrimary />;
  }

  return <ProfileEdit profile={userProfile} />;
}

