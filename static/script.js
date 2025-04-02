// Fetch random cat picture
function fetchCatPicture() {
    fetch('https://cat-api-ydk9.onrender.com/getCatPicture')
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('No cat pictures available');
        })
        .then(blob => {
            const imgURL = URL.createObjectURL(blob);
            document.getElementById('cat-image').src = imgURL;
        })
        .catch(error => {
            console.error('Error fetching cat picture:', error);
            document.getElementById('cat-image').alt = '❌ No cat pictures found!';
        });
}

// Upload cat picture
function uploadCatPicture() {
    const formData = new FormData();
    const fileInput = document.getElementById('fileInput');
    
    if (fileInput.files.length === 0) {
        document.getElementById('uploadResult').innerText = '❌ No file selected!';
        return;
    }

    formData.append('file', fileInput.files[0]);

    fetch('https://cat-api-ydk9.onrender.com/uploadCatPicture', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('uploadResult').innerText = `❌ ${data.error}`;
        } else {
            document.getElementById('uploadResult').innerText = `✅ ${data.message}`;
        }
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        document.getElementById('uploadResult').innerText = '❌ Error uploading cat picture!';
    });
}