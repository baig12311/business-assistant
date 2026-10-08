export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()

    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        )
    }

    const time = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })

    if (isSameDay(date, today)) {
        return `Today, ${time}`
    }

    if (isSameDay(date, yesterday)) {
        return `Yesterday, ${time}`
    }

    const formattedDate = date.toLocaleDateString('en-GB', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    return `${formattedDate}, ${time}`
    
}