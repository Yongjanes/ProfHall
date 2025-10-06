function Cards({ children }) {
    return (
        <section className="w-full bg-background text-foreground flex flex-col items-center md:items-start justify-centertext-center md:text-left px-6 py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {children}
            </div>
        </section>
    )
}

export default Cards