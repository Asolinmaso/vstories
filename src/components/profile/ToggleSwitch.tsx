"use client";

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}

export default function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                checked ? "bg-[#1D3B29]" : "bg-[#1D3B29]/50"
            }`}
        >
            <span
                className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition-transform ${
                    checked ? "left-[23px]" : "left-[3px]"
                }`}
            />
        </button>
    );
}
