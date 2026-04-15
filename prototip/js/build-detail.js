// Autor: Aleksandar Cvetković
const buildState = {
    buildId: 1,
    liked: false,
    disliked: false,
    likeCount: 42,
    dislikeCount: 3,
};


document.addEventListener('DOMContentLoaded', function() {
    setupLikeDislikeFunctionality();
    setupEditMode();
    loadBuildData();
});

// Like/Dislike Functionality
function setupLikeDislikeFunctionality() {
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');

    likeBtn.addEventListener('click', handleLike);
    dislikeBtn.addEventListener('click', handleDislike);
}

function handleLike() {
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const likeCount = document.getElementById('likeCount');

    if (buildState.liked) {

        buildState.liked = false;
        buildState.likeCount--;
        likeBtn.classList.remove('liked');
    } else {

        if (buildState.disliked) {
            buildState.disliked = false;
            buildState.dislikeCount--;
            dislikeBtn.classList.remove('disliked');
            document.getElementById('dislikeCount').textContent = buildState.dislikeCount;
        }

        buildState.liked = true;
        buildState.likeCount++;
        likeBtn.classList.add('liked');
    }

    likeCount.textContent = buildState.likeCount;
    console.log('Like action:', buildState);
}

function handleDislike() {
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const dislikeCount = document.getElementById('dislikeCount');

    if (buildState.disliked) {

        buildState.disliked = false;
        buildState.dislikeCount--;
        dislikeBtn.classList.remove('disliked');
    } else {

        if (buildState.liked) {
            buildState.liked = false;
            buildState.likeCount--;
            likeBtn.classList.remove('liked');
            document.getElementById('likeCount').textContent = buildState.likeCount;
        }

        buildState.disliked = true;
        buildState.dislikeCount++;
        dislikeBtn.classList.add('disliked');
    }

    dislikeCount.textContent = buildState.dislikeCount;
    console.log('Dislike action:', buildState);
}

// Edit Mode
function setupEditMode() {
    const editBtn = document.getElementById('editBtn');
    const editForm = document.getElementById('editForm');



    editBtn.addEventListener('click', openEditModal);
    editForm.addEventListener('submit', handleEditSubmit);
}

function openEditModal() {
    const modal = document.getElementById('editModal');
    const titleInput = document.getElementById('editTitle');
    const descriptionInput = document.getElementById('editDescription');
    const buildTitle = document.getElementById('buildTitle').textContent;
    const buildDescription = document.getElementById('buildDescription').textContent;

    titleInput.value = buildTitle;
    descriptionInput.value = buildDescription;

    modal.classList.add('show');
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.classList.remove('show');
}

function handleEditSubmit(e) {
    e.preventDefault();

    const titleInput = document.getElementById('editTitle');
    const descriptionInput = document.getElementById('editDescription');
    const newTitle = titleInput.value.trim();
    const newDescription = descriptionInput.value.trim();

    if (!newTitle || !newDescription) {
        alert('Molimo popunite sva polja');
        return;
    }

    // Update the display
    document.getElementById('buildTitle').textContent = newTitle;
    document.getElementById('buildDescription').textContent = newDescription;

    console.log('Build updated:', { title: newTitle, description: newDescription });

    alert('Izmene su uspešno sačuvane!');
    closeEditModal();
}

// Change Main Image
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // Update main image
    const imgSrc = thumbnail.querySelector('img').src;
    mainImage.src = imgSrc.replace('w=150', 'w=800');

    // Update active thumbnail
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
}

// Remove Thumbnail Image
function removeThumbnail(event) {
    event.stopPropagation();
    const thumbnail = event.currentTarget.closest('.thumbnail');
    const thumbnailsContainer = document.querySelector('.thumbnails-container');
    const mainImage = document.getElementById('mainImage');
    
    thumbnail.remove();
    
    // If removed thumbnail was active, set first remaining as active
    const remainingThumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
    if (remainingThumbnails.length > 0) {
        const firstThumbnail = remainingThumbnails[0];
        firstThumbnail.classList.add('active');
        const imgSrc = firstThumbnail.querySelector('img').src;
        mainImage.src = imgSrc.replace('w=150', 'w=800');
    }
}

// Load Build Data (placeholder for real data loading)
function loadBuildData() {
    console.log('Loading build data for ID:', buildState.buildId);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
});

// Keyboard shortcut to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeEditModal();
    }
});

