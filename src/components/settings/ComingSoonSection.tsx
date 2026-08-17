type Props = {
  icon: string;
  title: string;
  description: string;
};

export default function ComingSoonSection({ icon, title, description }: Props) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg opacity-60">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold">
          {icon} {title}
        </h2>

        <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-1 rounded-full">
          Bientôt
        </span>
      </div>

      <p className="text-zinc-500">{description}</p>
    </div>
  );
}