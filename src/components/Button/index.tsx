import { Button } from '@chakra-ui/react';

interface StandardButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

export function StandardButton({
    label,
    ...props
}: Readonly<StandardButtonProps> & { size?: 'sm' | 'md' | 'lg' | 'xs' }) {
    return <Button {...props}>{label}</Button>;
}
