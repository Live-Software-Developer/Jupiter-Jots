

export function formatDateWithTime(date?: Date, includeTime: boolean = false): string {
    if (!date) {
        return '-'
    }
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    };

    // Format date
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    if (includeTime) {
        // Format time
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            // second: '2-digit',
            hour12: false,
        };

        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

        return `${formattedDate}, ${formattedTime}`;
    }

    return formattedDate;
}

export const get2FirstCharacters = (title?: string) => {
    if (!title) {
        return "NA"
    }
    const chunks = title.split(" ")
    if (chunks.length < 3) {
        return chunks[0].substring(0, 1)
    } else {
        return chunks[0].substring(0, 1) + chunks[1].substring(0, 1)
    }
}

export function extractDescription(tweetTitle: string) {
    // Match the text of the tweet, excluding the URL and other artifacts
    const tweetRegex = /:(?:\s*)"(.*?)"(?:\s*)\/ X/;
    const match = tweetTitle.match(tweetRegex);

    if (match && match[1]) {
        return match[1].replace(/https?:\/\/\S+/g, '').trim(); // Remove URLs within the text
    }

    return ''; // Return empty string if parsing fails
}