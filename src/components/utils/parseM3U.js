export default function parseM3U(playlist) {
    const lines = playlist.split('\n');
    const channels = [];

    lines.forEach((line, index) => {
        if (line.startsWith('#EXTINF:')) {
            const channelInfo = line.slice(8); // Strip off '#EXTINF:'
            const nextLine = lines[index + 1]?.trim(); // URL of the channel

            // Extracting details using a regular expression
            const regex = /tvg-id="([^"]+)" tvg-logo="([^"]+)" group-title="([^"]+)",(.+)/;
            const match = channelInfo.match(regex);

            if (match) {
                const channel = {
                    tvgId: match[1],
                    tvgLogo: match[2],
                    groupTitle: match[3],
                    title: match[4],
                    url: nextLine
                };
                channels.push(channel);
            }
        }
    });

    return channels;
};