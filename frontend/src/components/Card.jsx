function Card({ title, description, icon}) {
    return (
        <div className="bg-background border border-primary rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center">
                    {icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>
            <p className="text-sm text-accent">{description}</p>
        </div>
    )
}

export default Card