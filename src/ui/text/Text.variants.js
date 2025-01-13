import { cva } from 'class-variance-authority'
import styles from './Text.module.css'

export const textVariants = cva(styles.text, {
  variants: {
    variant: {
      body24r: styles.body24r,
      body48r: styles.body48r,
      body48m: styles.body48m,
      body56m: styles.body56m,
      buttonSmall: styles.buttonSmall,
      button: styles.button,
    },
    color: {
      white: styles.white,
      gray: styles.gray,
      accent: styles.accent,
      button: styles.button,
    },
  },
  defaultVariants: {
    variant: 'body24r',
    color: 'white',
  },
})
