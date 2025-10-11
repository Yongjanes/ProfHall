import { useState } from "react";
import { Link } from "react-router"

function Signup() {
    const [formData, setFormData] = useState({
        avatar: null,
        username: "",
        fullname: "",
        email: "",
        bio: "",
    });
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar" && files[0]) {
        const file = files[0];
        setFormData((prev) => ({ ...prev, avatar: file }));
        setPreview(URL.createObjectURL(file));
        } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup data:", formData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background text-foreground px-4">
            <div className="w-full max-w-md bg-muted/10 border border-muted rounded-2xl p-6 shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-6 text-primary">
                Create Your ProfHall ID
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center">
                        <label
                        htmlFor="avatar"
                        className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary cursor-pointer hover:opacity-80 transition"
                        >
                        {preview ? (
                            <img
                            src={preview}
                            alt="Avatar preview"
                            className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted/20 text-sm text-muted-foreground">
                            Upload
                            </div>
                        )}
                        <input
                            id="avatar"
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                            required
                        />
                        </label>
                        <p className="text-xs text-muted-foreground mt-2">
                        Tap to upload avatar
                        </p>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">
                        Username <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="e.g. johndoe"
                        className="w-full border border-muted rounded-lg p-2 bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                        />
                    </div>

                    {/* Full name */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">
                        Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full border border-muted rounded-lg p-2 bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">
                        Email <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                        className="w-full border border-muted rounded-lg p-2 bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">Bio</label>
                        <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us a bit about yourself (optional)"
                        className="w-full border border-muted rounded-lg p-2 bg-background text-sm resize-none focus:ring-2 focus:ring-primary focus:outline-none"
                        rows="3"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
            <p className="text-sm text-gray-400 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    );
}

export default Signup