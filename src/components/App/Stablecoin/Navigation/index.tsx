import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  gap: 20px;
  margin-left: 10px;
`

const Item = styled.div<{
  selected: boolean
}>`
  font-size: 15px;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;

  &:hover {
    cursor: pointer;
  }
  ${props => props.selected ? `
    border-bottom: 1px solid white;
  ` : `
    color: rgba(255, 255, 255, 0.5);
  `}
`

export enum NavigationTypes {
  MINT = 'Mint',
  REDEEM = 'Redeem',
  ZAP = 'Zap',
  FARMS = 'Farms',
}

export default function Navigation({ 
  selected, 
  setSelected 
}: {
  selected: string
  setSelected: (value: string) => void
}) {
  return (
    <Wrapper>
      {(Object.keys(NavigationTypes) as Array<keyof typeof NavigationTypes>).map((key, index) => {
        const label = NavigationTypes[key]
        return (
          <Item
            selected={label == selected}
            onClick={() => setSelected(NavigationTypes[key])}
            key={index}
          >{label}</Item>
        )
      })}
    </Wrapper>
  )
}
