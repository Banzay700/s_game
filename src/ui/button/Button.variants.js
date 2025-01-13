import { cva } from 'class-variance-authority'
import styles from './Button.module.css'

export const btnVariant = cva(styles.button, {
  variants: {
    size: {
      medium: styles.btnMedium,
      large: styles.btnLarge,
    },
  },
})

export const containerVariant = cva(styles.container, {
  variants: {
    size: {
      medium: styles.containerMedium,
      large: styles.containerLarge,
    },
  },
})
