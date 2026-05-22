import Link from "next/link";
import { Headphones } from "lucide-react";

export default function NeedHelpCard() {
    return (
        <div className="rounded-[24px] bg-[#F9F6F1] px-6 py-6 text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center">
                <Headphones className="h-10 w-10 text-[#1D3B29]" strokeWidth={1.5} />
            </div>
            <h3 className="font-inter text-xl lg:text-2xl font-semibold text-[#1D3B29]">
                Need Help?
            </h3>
            <p className="mt-2 font-inter text-base text-[#2E2E2E]">
                We&apos;re here to help you.
            </p>
            <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-[8px] bg-[#1D3B29] px-6 py-3 font-inter text-base font-medium text-[#F7EDE2] transition-colors hover:bg-[#2A4F38]"
            >
                Contact Us
            </Link>
        </div>
    );
}
