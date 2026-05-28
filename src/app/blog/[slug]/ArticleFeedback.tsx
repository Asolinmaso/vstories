"use client";

import { useState } from "react";
import Image from "next/image";

export default function ArticleFeedback() {
  const [yesCount, setYesCount] = useState(24);
  const [noCount, setNoCount] = useState(2);
  const [hasVoted, setHasVoted] = useState<"yes" | "no" | null>(null);

  const handleVote = (type: "yes" | "no") => {
    if (hasVoted) return; // Prevent multiple votes

    if (type === "yes") {
      setYesCount((prev) => prev + 1);
      setHasVoted("yes");
    } else {
      setNoCount((prev) => prev + 1);
      setHasVoted("no");
    }
  };

  return (
    <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-4">
      <span className="text-[#2E2E2E] font-medium text-sm">Was This Article Helpful?</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleVote("yes")}
          disabled={hasVoted !== null}
          className={`flex items-center gap-2 px-4 py-2 rounded-[8px] border border-[#767676] text-[#4B4B4B] text-sm transition ${hasVoted === null ? 'hover:bg-[#f0ece1] cursor-pointer' : hasVoted === 'yes' ? 'bg-[#f0ece1] font-medium border-[#2E2E2E] text-[#2E2E2E]' : 'opacity-50 cursor-default'}`}
        >
          <Image src="/images/icons/yes.png" alt="Yes" width={16} height={16} className="object-contain" />
          Yes ({yesCount})
        </button>
        <button
          onClick={() => handleVote("no")}
          disabled={hasVoted !== null}
          className={`flex items-center gap-2 px-4 py-2 rounded-[8px] border border-[#767676] text-[#4B4B4B] text-sm transition ${hasVoted === null ? 'hover:bg-[#f0ece1] cursor-pointer' : hasVoted === 'no' ? 'bg-[#f0ece1] font-medium border-[#2E2E2E] text-[#2E2E2E]' : 'opacity-50 cursor-default'}`}
        >
          <Image src="/images/icons/no.png" alt="No" width={16} height={16} className="object-contain" />
          No ({noCount < 10 ? `0${noCount}` : noCount})
        </button>
      </div>
    </div>
  );
}
