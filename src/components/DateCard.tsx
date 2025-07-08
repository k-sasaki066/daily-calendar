const DateCard = () => {
    const now = new Date();
    const month = now.toLocaleString("ja-JP", { month: "long" });
    const day = now.getDate();
    const weekday = now.toLocaleString("ja-JP", { weekday: "long" });

    return (
        <div className="flex justify-between gap-5">
            <p className="text-8xl font-bold">{month}</p>
            <p className="text-8xl font-bold">{day}日</p>
            <p className="text-8xl font-bold">{weekday}</p>
        </div>
    )
}

export default DateCard