
function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            if (page === 'files') loadSCPs();
            if (page === 'search') loadSearch();
        });
}

function loadSCPs() {
    fetch('data/scps/scps.json')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('scp-list');
            list.innerHTML = '';
            data.forEach(entry => {
                const div = document.createElement('div');
                div.innerHTML = `<h3>${entry.id}: ${entry.title}</h3>
                    <img src='${entry.image}' alt='SCP Image' width='200'><p>${entry.description}</p>`;
                list.appendChild(div);
            });
        });
}

function loadSearch() {
    const list = document.getElementById('search-list');
    list.innerHTML = `<h2>Available Files</h2><ul>` +
        ["mp3", "mp4", "txt"].flatMap(type =>
            Array.from({length: type === 'txt' ? 5 : 15}, (_, i) => 
                `<li><a href="data/search/${type === 'txt' ? 'document' : type}_${i+1}.${type}" target="_blank">${type.toUpperCase()} File ${i+1}</a></li>`
            )
        ).join('') + "</ul>";
}

window.onload = () => loadPage('home');
