import { icons, LucideProps } from 'lucide-react-native';

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

const Icon = ({ name, color, size, ...rest }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} {...rest} />;
};

export default Icon;
