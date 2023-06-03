import ProfileCard from '@/components/profile/profile-card'
import ProfileHeader from '@/components/profile/profile-header'

export const metadata = {
  title: 'Glober | Profile',
  description: 'Glober information section',
}

const Profile = () => {
  return (
    <main className="">
      <ProfileHeader />
      <ProfileCard />
    </main>
  )
}

export default Profile
