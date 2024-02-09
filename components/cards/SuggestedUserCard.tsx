"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  threadsCount: number;
  accountType: string;
}

const SuggestedUserCard = ({ id, name, threadsCount, accountType }: Props) => {
  const router = useRouter();
  const routeName = accountType === "Community" ? "communities" : "profile";
  return (
    <li className="text-light-1 mb-3 flex justify-between">
      <p>
        name: {name} <br />
        threads count: {threadsCount}
      </p>

      <Button
        className="user-card_btn"
        onClick={() => router.push(`/${routeName}/${id}`)}
      >
        View
      </Button>
    </li>
  );
};

export default SuggestedUserCard;
