import defaultLogo from "../assets/Logos/default.svg";

export default function LinkCard({ title, url, description }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between w-full max-w-md p-4 rounded-xl bg-white hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm group"
    >
      {/* Left: Logo + Info */}
      <div className="flex items-center gap-4">
        <img
          src={defaultLogo}
          alt="default logo"
          className="w-10 h-10 rounded-md object-contain"
        />

        <div className="flex flex-col">
          <h3 className="text-gray-900 font-medium text-base leading-tight">
            {title}
          </h3>
          { description && <p className="text-gray-600 text-sm truncate max-w-[200px]">
              {description}
          </p> }
          
        </div>
      </div>

      {/* Right: External link icon */}
      <div className="text-gray-500 group-hover:text-gray-700 transition-colors">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            d="M10 5H8.2C7.08 5 6.52 5 6.09 5.22C5.72 5.41 5.41 5.72 5.22 6.09C5 6.52 5 7.08 5 8.2V15.8C5 16.92 5 17.48 5.22 17.91C5.41 18.28 5.72 18.59 6.09 18.78C6.52 19 7.08 19 8.2 19H15.8C16.92 19 17.48 19 17.91 18.78C18.28 18.59 18.59 18.28 18.78 17.91C19 17.48 19 16.92 19 15.8V14M20 9V4M20 4H15M20 4L13 11"
            stroke="#111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  );
}
