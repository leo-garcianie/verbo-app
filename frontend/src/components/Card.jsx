const Card = ({ label, value, subtitle, color = "blue" }) => {
  const color1 = {
    blue: "from-[#EFF6FF]",
    green: "from-green-50/60",
    pink: "from-pink-50/60",
    yellow: "from-yellow-50/60",
    gray: "from-slate-50",
    red: "from-red-50/80",
  };
  const color2 = {
    blue: "to-[#E6F1FF]",
    green: "to-green-100/60",
    pink: "to-pink-50/60",
    yellow: "to-yellow-100/60",
    gray: "to-slate-100",
    red: "to-red-50/80",
  };

  return (
    <div
      className={`w-full p-4 md:p-6 bg-gradient-to-t ${color1[color]} ${color2[color]} rounded-xl border border-slate-200 shadow-inner-2`}
    >
      <div className="flex flex-col items-start justify-between gap-2">
        <p className="text-base font-medium text-[#6A7282]">{label}</p>
        <p className="font-bold text-2xl md:text-3xl text-[#2A2C33]">{value}</p>
        {subtitle && (
          <p className="text-[#6A7282] text-sm font-light">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
