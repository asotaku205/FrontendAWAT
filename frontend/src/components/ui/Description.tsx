type DescriptionProps = {
  title: string;
  description: string;
  className?: string;
};

const Description = ({ title, description, className = "" }: DescriptionProps) => (
  <div className={`space-y-1 ${className}`}>
    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
    <p className="text-sm leading-6 text-gray-600">{description}</p>
  </div>
);

export default Description;
