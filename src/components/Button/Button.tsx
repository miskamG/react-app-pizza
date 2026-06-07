import styles from './Button.module.css'
import type { ButtonProps } from './Button.props'
import cn from 'classnames'

function Button({
  children,
  className,
  appearance = 'small',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles.accent, className, [
        styles[appearance],
      ])}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
