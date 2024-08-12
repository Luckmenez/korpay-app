import { Box } from '@chakra-ui/react';

interface ContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
    return (
        <Box bg={'primary.100'} textColor={'neutral.white'} px={'1rem'}>
            {children}
        </Box>
    );
}
