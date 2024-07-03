const notionForm = document.getElementById('notionForm');

notionForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const task = document.getElementById('task').value;

    // Call the backend script to save data to Notion
    await saveToNotion(name, task);
});

async function saveToNotion(name, task) {
    const url = 'https://your-project-name.vercel.app/submit-to-notion'; // Update with your deployed server URL

    await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, task })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save data to Notion.');
    });
}
