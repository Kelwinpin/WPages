import React from "react";
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

// Pegamos só as chaves que são componentes de ícone válidos
export type IconName = {
  [K in keyof typeof Icons]: (typeof Icons)[K] extends React.ComponentType<any> ? K : never;
}[keyof typeof Icons];

type LucideIconProps = {
  name: IconName;
  className?: string;
  size?: number | string;
};

const LucideIcon: React.FC<LucideIconProps> = ({ name, className, size }) => {
  const IconComponent = Icons[name] as React.ComponentType<LucideProps>;

  return <IconComponent className={className} size={size} />;
};

export default LucideIcon;
