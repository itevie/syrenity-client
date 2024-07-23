export const baseUrl = "http://localhost:3000";

export function getServerChannel(): { server: number | null, channel: number | null } {
    let url = window.location.href;
    let parts = url.match(/\/channels\/([0-9]+|@me)\/?([0-9]+)?/) as RegExpMatchArray;
    let server = parseInt(parts[1]);
    let channel = parseInt(parts[2]);

    return {
        server,
        channel
    };
}