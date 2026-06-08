import cn from 'classnames'
import { forwardRef } from 'react'
import styles from './Search.module.css'
import type { SearchProps } from './Search.props'

const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ className, isValid = true, ...props }, ref) => {
    return (
      <div className={styles['input-wrapper']}>
        <img
          src="./search-icon.svg"
          alt=""
          className={styles['icon']}
        />
        <input
          {...props}
          ref={ref}
          className={cn(className, styles['input'], {
            [styles['invalid']]: isValid,
          })}
        />
      </div>
    )
  },
)

export default Search
