"use client";

import { useUser } from "@clerk/nextjs";

export default function ClerkProfile() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return <div>Please sign in</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.emailAddresses[0].emailAddress}</p>
      {/* <img src={user.imageUrl} alt="Profile Image" /> */}
    </div>
  );
}
