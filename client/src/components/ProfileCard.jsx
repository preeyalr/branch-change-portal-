// components/ProfileCard.jsx

function ProfileCard({ user }) {
  return (
    <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-xl border border-white/20 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">

      {/* Header */}
      <h2 className="text-xl font-semibold mb-5 text-white flex items-center gap-2">
         Profile
      </h2>

      {/* Content */}
      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold shadow-md">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="space-y-1">

          <p className="text-white font-medium text-lg">
            {user.name}
          </p>

          <p className="text-white/70 text-sm">
            {user.email}
          </p>

          <p className="text-white/60 text-xs">
            Enrollment: {user.enrollmentNo}
          </p>

        </div>

      </div>

      {/* Divider */}
      <div className="my-4 border-t border-white/20"></div>

      {/* Extra Info (optional future use) */}
      <div className="text-sm text-white/60">
        Student Account
      </div>

    </div>
  );
}

export default ProfileCard;