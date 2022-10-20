import { ButtonHTMLAttributes, ReactNode } from 'react';

// html의 button이 받을 수 있는 속성에서 확장한다.
interface Props extends ButtonHTMLAttributes<HTMLElement> {
  left: ReactNode;
}

export function SelectItem({ children, left, ...props }: Props) {
  // children이 아이콘이 될 수 있지 않을까?
  return (
    <div {...props}>
      {left}
      {children}
    </div>
  );
}
