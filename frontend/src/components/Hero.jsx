import { Link } from "react-router"

function Hero() {
    return (
        <section className="w-full bg-background text-foreground flex flex-col items-center md:items-start justify-centertext-center md:text-left px-6 py-20">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight mb-4">
                Professional presence <br /> meets elegant design
            </h1>

            <p className="text-lg sm:text-xl font-sans text-secondary mb-8 max-w-2xl text-center sm:text-left">
                Transform your online identity into a stunning showcase with ProfHall's beautifully crafted link in bio pages.
            </p>

            <Link 
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
                Get Started
            </Link>
        </section>
    )
}

export default Hero