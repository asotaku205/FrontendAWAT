type CardProps = {
  title: string;
  description: string;
  status?: string;
  className?: string;
  descriptionClassName?: string;
};

const Card = ({
  title,
  description,
  status,
  className = "",
  descriptionClassName = "",
}: CardProps) => (
  <article className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
    <div className="flex items-start justify-between gap-3">
      <h2 className="text-sm font-medium text-gray-600">{title}</h2>
      {status && (
        <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-800">
          {status}
        </span>
      )}
    </div>
    <p className={`mt-3 text-2xl font-semibold text-gray-900 ${descriptionClassName}`}>
      {description}
    </p>
  </article>
);

export default Card;
