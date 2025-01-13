import { cva } from 'class-variance-authority'
import styles from './Heading.module.css'

export const headingVariants = cva(styles.heading, {
  variants: {
    variant: {
      h1: styles.h1,
      h2: styles.h2,
      h3: styles.h3,
      numbers: styles.numbers,
    },
    color: {
      white: styles.white,
      gray: styles.gray,
      accent: styles.accent,
    },
    uppercase: {
      true: styles.uppercase,
      false: null,
    },
  },
  defaultVariants: {
    variant: 'h1',
    color: 'white',
  },
})
