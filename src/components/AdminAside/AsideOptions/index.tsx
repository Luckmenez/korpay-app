import { Button } from '@chakra-ui/button';

interface AsideOptionsProps {
    label: string;
    onClick: () => void;
}

export function AsideOptions({ label, onClick }: AsideOptionsProps) {
    return (
        <Button
            _hover={{ bg: 'transparent' }}
            color={'white'}
            bg={'transparent'}
            w={'100%'}
            onClick={onClick}
        >
            {label}
        </Button>
    );
}
