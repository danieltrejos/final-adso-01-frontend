'use client'

import { useRouter } from 'next/navigation'
import Link, { type LinkProps } from 'next/link'
import React from 'react'

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
}

export function TransitionLink({ 
  children, 
  className,
  href,
  ...props 
}: TransitionLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (!document.startViewTransition) {
      router.push(href.toString())
      return
    }

    document.startViewTransition(() => {
      router.push(href.toString())
    })
  }

  return (
    <Link 
      href={href} 
      onClick={handleClick} 
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
}