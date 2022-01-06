import { useRouter } from 'next/router'
import { Button, ButtonGroup, BoxProps } from '@chakra-ui/react';

// Docs on BoxProps?
export const GeographySelect = (props) => {
  const router = useRouter()

  const {
    geography,
    ...boxProps
  } = props

  return (
    <ButtonGroup
      isAttached
      {...boxProps}
    >
      <Button
        onClick={() => router.push({pathname: `/map/census`, query: {
          showPanel: 'true',
        }})}
        isActive={geography === 'census'}
      >
        Census Area 
      </Button>
      <Button
        onClick={() => router.push({pathname: `/map/borough`, query: {
          showPanel: 'true',
        }})}
        isActive={geography === 'borough'}
      >
        Borough
      </Button>
      <Button
        onClick={() => router.push({pathname: `/map/citywide`, query: {
          showPanel: 'true',
        }})}
        isActive={geography === 'citywide'}
      >
        Citywide
      </Button>
    </ButtonGroup>
  )
}