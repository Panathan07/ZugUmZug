export async function getIP() {
    function json(url) {
        return fetch(url).then(res => res.json());
    }

    let apiKey = 'b93fdb8f871791ef3fe808c601ea48d954d56ed88e68caba6bdb0492'; // Finn : 82d198a8042827ea2beea895fa2e8a7401e047d9a9319100a9788727 Jonthan : b93fdb8f871791ef3fe808c601ea48d954d56ed88e68caba6bdb0492
    let IP = json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
        return data.ip;

    });
    console.log(IP,"IP")
    return IP;
}