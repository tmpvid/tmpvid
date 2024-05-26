document.getElementById('uploadButton').addEventListener('click', uploadVideo);

function uploadVideo() {
    const fileInput = document.getElementById('videoUpload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64Content = event.target.result.split(',')[1];
            const repo = 'nombre-del-repo'; // Reemplaza con el nombre de tu repositorio
            const owner = 'tu-usuario'; // Reemplaza con tu usuario de GitHub
            const path = `videos/${file.name}`;
            const message = 'Upload video';
            const token = 'tu-token'; // Reemplaza con tu token de acceso personal de GitHub

            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
            const data = {
                message: message,
                content: base64Content
            };

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.content && data.content.download_url) {
                    displayVideo(data.content.download_url);
                } else {
                    alert('Error uploading the video');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a video first.');
    }
}

function displayVideo(url) {
    const videoElement = document.getElementById('uploadedVideo');
    videoElement.src = url;
}
