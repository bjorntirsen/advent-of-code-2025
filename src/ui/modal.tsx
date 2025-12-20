import { useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 m-auto max-w-[95%] rounded-lg shadow-xl backdrop:bg-black/80 sm:max-w-4xl"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl leading-none hover:opacity-70"
        aria-label="Close"
      >
        ×
      </button>
      <div className="p-8 pt-16">{children}</div>
    </dialog>
  )
}
