const WebTorrent = require("webtorrent");
const input = require("input");
const clipboard = require("clipboard");
const client = new WebTorrent();

function download(uri) {
  client.add(uri, {
    path: "downloads"
  }, torrent => {
    console.log(`Client is downloading: ${torrent.infoHash}, Files:`);
    console.log(torrent.files.map(file => file.name));

    const timer = setInterval(() => {
      const percent = Math.round(torrent.progress * 100 * 100) / 100;
      console.log(`Progress: ${percent}%`);
    }, 3000);

    torrent.on("done", () => {
      console.log("torrent download finished");
      clearInterval(timer);
    });
  });
}

(async() => {
  const uri = await input.text({
    placeholder: "magnet link",
    text: clipboard.text()
  });
  if (uri) {
    download(uri);
  }
})();