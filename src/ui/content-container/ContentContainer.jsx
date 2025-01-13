import PropTypes from 'prop-types'
import s from './ContentContainer.module.css'
import { contentContainerVariants } from './ContentContainer.variants'

const ContentContainer = ({ variant = 'startPage', children }) => {
  return (
    <div className={s.inner}>
      <div className={contentContainerVariants({ variant })}>{children}</div>
      <img src="/src/assets/bg.png" alt="bg" className={s.background} />
    </div>
  )
}

ContentContainer.propTypes = {
  variant: PropTypes.oneOf(['startPage', 'gamePage']),
  children: PropTypes.node.isRequired,
}

export default ContentContainer
