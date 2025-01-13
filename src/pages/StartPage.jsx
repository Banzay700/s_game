import { useNavigate } from 'react-router-dom'
import { Logo, Heading, Text, Button, ContentContainer } from '@/ui'

function StartPage() {
  const navigate = useNavigate()

  return (
    <ContentContainer variant="startPage">
      <div>
        <Logo mb="120px" />
        <Heading uppercase mb="38px">
          Let the game begin!
        </Heading>
        <Text variant="body48r" color="gray" textAlign="center" mb="20px">
          Watch the balls drop, make your best guess, and get a shot at winning
          an Amazon voucher!
        </Text>
        <Text variant="body56m" color="accent" mb="120px">
          Ready? Set. Go!
        </Text>
        <Button size="large" onClick={() => navigate('/game')}>
          Start
        </Button>
      </div>
    </ContentContainer>
  )
}

export default StartPage
