import { useRouter } from 'next/router'
import { Button, ButtonGroup, BoxProps } from '@chakra-ui/react';

// Docs on BoxProps?
export const GeographySelect = (boxProps: BoxProps) => {
  const router = useRouter()

  const { geography } = router.query;

  return (
    <ButtonGroup
      isAttached
      {...boxProps}
    >
      <Button
        onClick={() => router.push({ query: {geography: 'census'}})}
        isActive={geography === 'census'}
      >
        Census Area 
      </Button>
      <Button
        onClick={() => router.push({ query: {geography: 'borough'}})}
        isActive={geography === 'borough'}
      >
        Borough
      </Button>
      <Button
        onClick={() => router.push({ query: {geography: 'citywide'}})}
        isActive={geography === 'citywide'}
      >
        Citywide
      </Button>
    </ButtonGroup>
  )
}