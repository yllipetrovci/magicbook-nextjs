
interface CompanionButtonProps {
    companion: {
        label: string;
        icon: string;
        color: string;
        text: string;
    };
    onAdd: (text: string) => void;
}

const CompanionButton: React.FC<CompanionButtonProps> = ({ companion, onAdd }) => {
    return (
        <button
            key={companion.label}
            type="button"
            onClick={() => onAdd(companion.text)}
            className="flex flex-col items-center gap-1 p-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all"
        >
            <i className={`fa-solid ${companion.icon} text-lg ${companion.color}`}></i>
            <span className="text-[10px] text-gray-400 font-bold">{companion.label}</span>
        </button>
    );
}

export default CompanionButton;