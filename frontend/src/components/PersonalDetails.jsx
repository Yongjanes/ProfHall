function PersonalDetails() {
  const user = {
    avatar: "https://via.placeholder.com/150", // replace later with real avatar URL
    name: "Aarav Mehta",
    bio: "Frontend developer passionate about clean design and smooth user experiences.",
    email: "aarav.mehta@example.com",
  };

  return (
    <section className="w-full flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-8 px-6 py-10 bg-background text-foreground">
      {/* Left side (Avatar) */}
      <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-1/3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary shadow-md"
        />
      </div>

      {/* Right side (Text) */}
      <div className="text-center md:text-left md:w-2/3">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">{user.name}</h2>
        <p className="mt-3 text-base text-gray-400 max-w-md mx-auto md:mx-0">
          {user.bio}
        </p>
        <a
          href={`mailto:${user.email}`}
          className="block mt-3 text-sm text-primary hover:underline"
        >
          {user.email}
        </a>
      </div>
    </section>
  );
}

export default PersonalDetails