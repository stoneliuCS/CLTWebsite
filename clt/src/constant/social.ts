interface ISocialLink {
    url : string 
    href : string 
    caption : string
}

const socials : ISocialLink[] = [
    {
        url : "https://instagram.com",
        href : "https://www.instagram.com/neu_clt/",
        caption : "Our Instagram!"
    },
    {
        url : "https://slack.com",
        href : "neuclt.slack.com",
        caption : "Our Slack!"
    },
    {
        url : "https://www.spotify.com/",
        href : "https://open.spotify.com/playlist/6WrYjhEIMZaI17Nz1bV2PA?si=3a9c03074681423b&utm_medium=share&utm_source=linktree",
        caption : "Our Spotify Playlist!"
    },
    {
        url : "https://www.facebook.com/",
        href : "https://www.facebook.com/neuchanguagetable/",
        caption : "Our Facebook! "
    },
    {
        url : "https://gmail.com",
        href : "https://gmail.us3.list-manage.com/subscribe?u=ff59e60d727298a57e28a4e6f&id=3bc42e4945",
        caption : "Join Our Mailing List!"
    },
    {
        url : "https://linktr.ee/",
        href : "https://linktr.ee/neuclt",
        caption : "Our LinkTree!"
    }
]

export default socials