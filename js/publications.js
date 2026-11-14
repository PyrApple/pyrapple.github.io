async function fetchHalPublications() {

    // define hal api related fields
    const halId = 'david-poirier-quinot';
    const apiUrl = `https://api.archives-ouvertes.fr/search/?q=authIdHal_s:${halId}&rows=1000&fl=docid,label_s,docType_s,producedDateY_i,uri_s&wt=json&sort=producedDate_tdate desc`;

    try
    {
        // get handle to html element
        const list = document.getElementById('hal-publications');

        // request publication list
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HAL returned HTTP ${response.status}`);
        const data = await response.json();
        const pubs = data.response.docs;
        list.innerHTML = '';

        // define categories and order in which they should appear
        const publicationTypes = ['ART', 'COMM', 'THESE', 'REPORT', 'COUV', 'PROCEEDINGS', 'SOFTWARE', 'Other'];
        const publicationHeaders = {
            ART: 'Journals',
            COMM: 'Conferences',
            THESE: 'Theses',
            REPORT: 'Reports',
            COUV: 'Books',
            PROCEEDINGS: 'Proceedings',
            SOFTWARE: 'Software',
            Other: 'Others',
        };

        // define publications to ignore
        const pubToIgnore = ['1192598']; // 1192598: is second entry of these by STAR (I don't have ownership of that one)

        // Group by type
        const grouped = {};

        pubs.forEach(pub => {

            // ignored publications
            if( pubToIgnore.includes(String(pub.docid)) ){ return; }

            // get type (default to "Other")
            var type = pub.docType_s || 'Other';

            // type yet undefined
            if(!publicationTypes.includes(type))
            {
                console.log('Unsupported type ' + type + ' for publication: \n' + pub.label_s + '\n-> moved to Others');
                type = 'Other';
            }

            // create new entry if required
            if (!grouped[type]) grouped[type] = [];

            // save to locals
            grouped[type].push(pub);
        });


        // Sort by year within each group
        Object.keys(grouped).forEach(type => {
            grouped[type].sort((a, b) => (b.producedDateY_i || 0) - (a.producedDateY_i || 0));
        });

        // loop over groups of publications
        publicationTypes.forEach(type => {

            if (grouped[type]) {

                // add section header
                const header = document.createElement('h3');
                header.textContent = publicationHeaders[type] || type;
                list.appendChild(header);

                // create list of publications
                const ul = document.createElement('ul');

                // loop over publications
                grouped[type].forEach(pub => {

                    // create entry
                    const li = document.createElement('li');
                    li.classList.add('li-publication');

                    // shape publication text
                    const cleanLabel = pub.label_s;
                    li.innerHTML = `${cleanLabel} <a href="${pub.uri_s}" target="_blank"> <i class="far fa-file-alt"></i> </a>`;

                    // add publication to list entry
                    ul.appendChild(li);

                });

                // add entry to list
                list.appendChild(ul);

            }
        });

        // display num. of entries vs. num of total publications
        const paragraph = document.createElement('p');
        paragraph.innerHTML = `<i>${data.response.numFound}/${pubs.length}</i>`;
        paragraph.style.textAlign = "right";
        list.appendChild(paragraph);

    }
    catch (error)
    {
        document.getElementById('hal-publications').textContent = `Error loading publications: ${error.message}`;
    }
}

fetchHalPublications();
