import { cva } from 'class-variance-authority'
import styles from './ContentContainer.module.css'

export const contentContainerVariants = cva(styles.wrapper, {
  variants: {
    variant: {
      startPage: styles.startPage,
      gamePage: styles.gamePage,
    },
  },
})
