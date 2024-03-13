import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export const MissingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      The Joke Tax Chronicles
    </h1>
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      "After all," he said, "everyone enjoys a good joke, so it's only fair
      that they should pay for the privilege."
    </blockquote>

    <Button onClick={() => {
        navigate("/");
    }}>Go Back</Button>
  </div>
  );
};