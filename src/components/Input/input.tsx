import cn from 'classnames'
import styles from './input.module.css'
import { forwardRef } from 'react'
import type { InputProps } from './input.props'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, isValid = true, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={cn(className, styles['input'], {
          [styles['invalid']]: isValid,
        })}
      />
    )
  },
)


export default Input
