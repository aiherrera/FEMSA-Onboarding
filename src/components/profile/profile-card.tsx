import GlobantForm from '@/components/profile/globant-form'

const ProfileCard = () => {
  return (
    <div className="mt-10 flex justify-center gap-x-10">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Globant Information</h2>
        {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use this section to input Globant information.</p> */}
      </div>
      <GlobantForm />
    </div>
  )
}

export default ProfileCard
