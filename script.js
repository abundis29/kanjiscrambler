const kanjiElement = document.getElementById('kanji');
const meaningsElement = document.getElementById('meanings');
const gradeElement = document.getElementById('grade');
const strokeCountElement = document.getElementById('stroke-count');
const kunReadingsElement = document.getElementById('kun-readings');
const onReadingsElement = document.getElementById('on-readings');
const nameReadingsElement = document.getElementById('name-readings');
const jlptElement = document.getElementById('jlpt');
const unicodeElement = document.getElementById('unicode');
const heisigElement = document.getElementById('heisig');
const gradeSelect = document.getElementById('grade-select');

function getRandomKanji(grade) {
  const apiUrl = `https://kanjiapi.dev/v1/kanji/${grade}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
    });
}

function fetchKanjiData(kanji) {
  const apiUrl = `https://kanjiapi.dev/v1/kanji/${encodeURIComponent(kanji)}`;

  return fetch(apiUrl)
    .then(response => response.json());
}

function updateKanjiDisplay(grade) {
  getRandomKanji(grade)
    .then(kanjiData => {
      const kanji = kanjiData;

      kanjiElement.textContent = kanji;
      fetchKanjiData(kanji)
        .then(data => {
          meaningsElement.textContent = data.meanings.join(', ');
          gradeElement.textContent = data.grade;
          strokeCountElement.textContent = data.stroke_count;
          kunReadingsElement.textContent = data.kun_readings.join(', ');
          onReadingsElement.textContent = data.on_readings.join(', ');
          nameReadingsElement.textContent = data.name_readings.join(', ');
          jlptElement.textContent = data.jlpt;
          unicodeElement.textContent = data.unicode;
          heisigElement.textContent = data.heisig_en;
        })
        .catch(error => {
          console.error('Error fetching Kanji data:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching Kanji data:', error);
    });
}

gradeSelect.addEventListener('change', () => {
  const selectedGrade = gradeSelect.value;
  updateKanjiDisplay(selectedGrade);
});

updateKanjiDisplay('joyo'); // Start with Jōyō kanji
setInterval(() => updateKanjiDisplay('joyo'), 10000); // Update every 10 minutes
