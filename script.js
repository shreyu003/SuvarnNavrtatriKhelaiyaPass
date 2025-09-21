let uploadedImage = null;
document.getElementById('imageUpload').addEventListener('change', function (event) {
    const reader = new FileReader();
    reader.onload = function (e) {
        uploadedImage = new Image();
        uploadedImage.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

// Map each group to its background image
const backgrounds = {
    "Dholidassss": "./images/dholidassss.png",
    "Swarnim": "./images/swarnim.png",
    "We One": "./images/weone.png",
    "Mannat GROUP": "./images/mannat.png",
    "BEYOND (WEONE) Family": "./images/beyond_weone.png",
    "GOLD KHELAIYA GROUP": "./images/gold_khelaiya.png",
    "Black Berry Group": "./images/blackberry.png",
    "Dholidass(Raas Rhythm)": "./images/raas_rhythm.png",
    "Kevin's Thanganat Group": "./images/kevin.png",
    "WEONE GROUP Sponsor": "./images/weone_sponsor.png",
    "KeMo's GARBA GROOVES": "./images/kemo.png"
};

function generatePass() {
    const canvas = document.getElementById('passCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get selected passType
    const passType = document.getElementById('passType').value;

    // Load background image based on passType
    let backgroundImage = new Image();
    backgroundImage.src = backgrounds[passType];

    backgroundImage.onload = function () {
        drawCanvas(ctx, backgroundImage, passType);
    };
}

function drawCanvas(ctx, backgroundImage, passType) {
    const canvas = document.getElementById('passCanvas');

    // Draw the background
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Helper function to draw rounded image
    function drawRoundedImage(ctx, image, x, y, width, height, radius) {
        ctx.save(); // Save current state
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.clip(); // Clip to rounded rectangle

        ctx.drawImage(image, x, y, width, height);

        ctx.restore(); // Restore previous state
    }

    // Draw uploaded photo with border radius
    if (uploadedImage) {
        drawRoundedImage(ctx, uploadedImage, 74, 167, 248, 275, 10); 
        // last param = border radius (20px here)
    }

    // Get input values
    const name = document.getElementById('name').value;
    const id = document.getElementById('passId').value;
    const mobile = document.getElementById('mobile').value;

    // Font setup
    ctx.font = '600 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000'; // Text color

    // Only values (no labels)
    ctx.fillText(name, 90, 519);
    ctx.fillText(id, 90, 550);
    ctx.fillText(mobile, 90, 581);
}

function downloadPass() {
    const canvas = document.getElementById('passCanvas');
    const link = document.createElement('a');
    link.download = 'khelaiya_pass.png';
    link.href = canvas.toDataURL();
    link.click();
}