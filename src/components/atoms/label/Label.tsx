import './label.scss';

export const Label = ({ text }: { text: string }) => {
  return (
    <div className="category_label">
      <span>{text}</span>
    </div>
  );
};
