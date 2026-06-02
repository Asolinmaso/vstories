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
          className={`flex items-center gap-2 px-4 py-1.5 rounded-[4px] text-[#2E2E2E] text-[14px] transition ${hasVoted === null ? 'hover:bg-[#F5F5F5] cursor-pointer' : hasVoted === 'yes' ? 'bg-[#F5F5F5] font-medium' : 'opacity-50 cursor-default'}`}
          style={{ border: "1px solid #2E2E2E" }}
        >
          <Image src="/images/icons/yes.png" alt="Yes" width={18} height={18} className="object-contain" />
          Yes ({yesCount})
        </button>
        <button
          onClick={() => handleVote("no")}
          disabled={hasVoted !== null}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-[4px] text-[#2E2E2E] text-[14px] transition ${hasVoted === null ? 'hover:bg-[#F5F5F5] cursor-pointer' : hasVoted === 'no' ? 'bg-[#F5F5F5] font-medium' : 'opacity-50 cursor-default'}`}
          style={{ border: "1px solid #2E2E2E" }}
        >
          <Image src="/images/icons/no.png" alt="No" width={18} height={18} className="object-contain" />
          No ({noCount < 10 ? `0${noCount}` : noCount})
        </button>
      </div>
    </div>
  );
}
