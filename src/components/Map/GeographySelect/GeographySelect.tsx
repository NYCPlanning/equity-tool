import { useRouter } from 'next/router'
import { Button, ButtonGroup } from '@chakra-ui/react';

// Docs on BoxProps?
export const GeographySelect = (props: any) => {
  const router = useRouter()

  const {
    geography, 
    ...boxProps
  } = props;

  return (
    <ButtonGroup
      isAttached
      {...boxProps}
    >
      <Button
        onClick={() => router.push('/census')}
        isActive={geography === 'census'}
      >
        Census Area 
      </Button>
      <Button
        onClick={() => router.push('/nta')}
        isActive={geography === 'borough'}
      >
        Borough
      </Button>
      <Button
        onClick={() => router.push('/citywide')}
        isActive={geography === 'citywide'}
      >
        Citywide
      </Button>
    </ButtonGroup>
  )
}