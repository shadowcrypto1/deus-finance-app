import React from 'react'
import styled from 'styled-components'
import { AlertTriangle } from 'react-feather'

import useWeb3React from 'hooks/useWeb3'
import useAddTokenToMetaMask from 'hooks/useAddTokenToMetaMask'

import { IToken } from 'utils/token'
import { ExplorerDataType } from 'utils/explorers'

import { Modal, ModalHeader } from 'components/Modal'
import { ConfirmationAnimation, CheckMark } from 'components/Icons'
import { PrimaryButton } from 'components/Button'
import { ExplorerLink } from 'components/Link'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
`

const PendingWrapper = styled(Wrapper)`
  align-items: center;
  text-align: center;
  & > * {
    margin-bottom: 15px;
    &:last-child {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 15px;
    }
  }
`

const ErrorWrapper = styled(Wrapper)`
  gap: 20px;
  align-items: center;
  text-align: center;
  margin: 20px;
  font-size: 0.9rem;

  & > * {
    &:nth-child(2) {
      color: red;
    }
  }
`

const SuccessWrapper = styled(Wrapper)`
  gap: 20px;
  align-items: center;
  text-align: center;
  margin: 20px;
  font-size: 1.2rem;

  & > * {
    &:nth-child(2) {
      font-weight: bold;
    }
    &:nth-child(3) {
      color: blue;
      font-size: 1rem;
    }
  }
`

// The tx confirmation modal, relies on ConfirmationContent embedded as `content`
export default function TransactionConfirmationModal({
  isOpen,
  onDismiss,
  attemptingTxn,
  hash,
  summary,
  tokenToAdd,
  content,
}: {
  isOpen: boolean
  onDismiss: () => void
  attemptingTxn: boolean
  hash?: string
  summary: string
  tokenToAdd?: IToken | null
  content: React.ReactNode
}) {
  const { chainId } = useWeb3React()
  if (!chainId) return null

  return (
    <Modal isOpen={isOpen} onBackgroundClick={onDismiss} onEscapeKeydown={onDismiss}>
      {attemptingTxn ? (
        <ConfirmationPendingContent onDismiss={onDismiss} summary={summary} />
      ) : hash ? (
        <TransactionSubmittedContent chainId={chainId} hash={hash} onDismiss={onDismiss} tokenToAdd={tokenToAdd} />
      ) : (
        content
      )}
    </Modal>
  )
}

/**
 * Content to display in the TransactionConfirmationModal
 * @param title title for the ModalHeader
 * @param mainContent Any of the components within the TransactionConfirmationModal directory
 * @param bottomContent Callback button of some sort
 */
export function ConfirmationContent({
  title,
  onDismiss,
  mainContent,
  bottomContent,
}: {
  title: string
  onDismiss: () => void
  mainContent?: (() => React.ReactNode) | React.ReactNode
  bottomContent?: (() => React.ReactNode) | React.ReactNode
}) {
  return (
    <Wrapper>
      <ModalHeader title={title} headerSize="20px" onClose={onDismiss} />
      {typeof mainContent === 'function' ? mainContent() : mainContent}
      {typeof bottomContent === 'function' ? bottomContent() : bottomContent}
    </Wrapper>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div>
      <ModalHeader title="Error" headerSize="15px" onClose={onDismiss} />
      <ErrorWrapper>
        <AlertTriangle size="80px" color="red" />
        <div>{message}</div>
        <PrimaryButton onClick={onDismiss}>Dismiss</PrimaryButton>
      </ErrorWrapper>
    </div>
  )
}

// User needs to confirm the transaction in their wallet
function ConfirmationPendingContent({ onDismiss, summary }: { onDismiss: () => void; summary: string }) {
  return (
    <div>
      <ModalHeader title=" " headerSize="15px" onClose={onDismiss} border={false} />
      <PendingWrapper>
        <ConfirmationAnimation size="80px" />
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Waiting for Confirmation</div>
        <div>{summary}</div>
        <div>Confirm this transaction in your wallet</div>
      </PendingWrapper>
    </div>
  )
}

// Transaction is submitted by the user
function TransactionSubmittedContent({
  chainId,
  hash,
  onDismiss,
  tokenToAdd,
}: {
  chainId: number
  hash: string
  onDismiss: () => void
  tokenToAdd?: IToken | null
}) {
  const { library } = useWeb3React()
  const { addToken, success } = useAddTokenToMetaMask(tokenToAdd)

  return (
    <div>
      <ModalHeader title=" " headerSize="15px" onClose={onDismiss} border={false} />
      <SuccessWrapper>
        <CheckMark size={80} />
        <div>Transaction Submitted</div>
        <ExplorerLink chainId={chainId} type={ExplorerDataType.TRANSACTION} value={hash}>
          View on Explorer
        </ExplorerLink>
        {tokenToAdd && library?.provider?.isMetaMask && (
          <PrimaryButton onClick={!success ? addToken : onDismiss}>Add {tokenToAdd.symbol} to Metamask</PrimaryButton>
        )}
      </SuccessWrapper>
    </div>
  )
}
